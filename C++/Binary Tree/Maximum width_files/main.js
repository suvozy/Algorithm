//AJAX POST MESSAGE
function ajaxMsg() {
	if ($('contact_form')) {
		$('contact_form').addEvent('submit', function(e) {
			e = new Event(e).stop();
			this.set('send', {url: this.action, method: 'post',
				onRequest:function() {
					$('cPostStatus').addClass('ajax-loading');
				},				    
				onSuccess:function(responseText, responseXML) {
					$('cPostStatus').removeClass('ajax-loading');
					$('msgStatus').setStyle('color', '#ffffff');
					var msg = $('msgStatus').set('html', responseText);
					var msgFx = new Fx.Tween(msg, {duration:1500});
					
					if (responseText == "Thank you for your message. I will get back to you shortly.") {
						msgFx.start('color', '#28ab3b');		
					} else {
						msgFx.start('color', '#ff3333');		
					}
					(function(){$('msgStatus').fade('out');}).delay(3000);
				},					
				onFailure: function(instance) {
					$('cPostStatus').removeClass('ajax-loading');
					var msg = $('msgStatus').set('html', 'A server error has occurred.');
					var msgFx = new Fx.Tween(msg, {duration:1500});		
					msgFx.start('color', '#ff3333');
					(function(){$('msgStatus').fade('out');}).delay(3000);
				}

			});
			
			this.send();
			
		});
		
	}
}

//AJAX LINKS
function ajaxLinks(id, container) {	
		
	$$(id).each(function(ele) {		
	
		ele.addEvent('click', function(e) {
			e = new Event(e).stop();
			var alink = ele.getProperty('href');
			var url = "";
			var isComment = false;
			
			if (alink.indexOf('#comments') != -1) {
				url = alink.substring(0, alink.indexOf('#comments'));	
				isComment = true;
			} else { 
				url = alink;
			}
			
			if (alink.indexOf('?') != -1) {
				url += "&ajax=y";
			} else {
				url += "?ajax=y";
			}			

			if (isComment) {
				url += "#comments";	
				var comments = $('comments').getCoordinates();
			}
			
			var wrapper = $('wrapper').getCoordinates();
			var dbody = $(document.body).getCoordinates();
			var content = $('content').getCoordinates();					
			var el = ele.getCoordinates();				

			var ajaxLink = new Request.HTML({				
				onRequest: function() {										
					$('ajaxSpinner').setStyles({
						'top': el.top - el.height,
						'left': content.left + content.width/2
					});
					
					$('ajaxSpinner').addClass('ajax-loading');					
					$(container).fade('0.2');					
				},																			 

				onSuccess: function() {	
					$('ajaxSpinner').setStyles({
						'top': 0
					});						
					
					$('ajaxSpinner').removeClass('ajax-loading');								
					
					if (id == '.page-navi a'){			
						new Fx.Scroll(document.body, {'duration': 'long'}).start(0, 0);
						ajaxLinks('.page-navi a', 'post');
					} else {					
						new Fx.Scroll(document.body, {'duration': 'long'}).start(0, comments.top);
						ajaxLinks('.list span a', 'comments');
					}
					$(container).fade('in');
				}, 
				
				onFailure: function() {
					$('ajaxSpinner').removeClass('ajax-loading');
					$(container).fade('in');				
				},
				update: $(container)
			}).get(url);											
		});		    
	});
}

//AJAX COMMENTS
function ajaxComment() {
	if ($('commentform')) {
		$('commentform').addEvent('submit', function(e) {
			e = new Event(e).stop();
			
			if ($('comment_parent')) {
				if ($('comment_parent').value != 0) {
					var comment_pid = "comment-" + $('comment_parent').value;
				}
			}
								
			var comment = $('comment').getCoordinates();			
			
			 this.set('send', {url: this.action, method: 'post',
					onRequest:function() {
						$('postStatus').addClass('ajax-loading');						
						$('comment').fade('0.2');
						$('commentStatus').setStyle('color', '#ffffff');
					},				    

				onSuccess:function(responseText, responseXML) {
					cancelReply();
					$('postStatus').removeClass('ajax-loading');					
					$('comment').fade('in');
					
					var temp = new Element('div', {'html': responseText});

					if (!$(comment_pid)) {
						var num_comments = 0;
						
						if ($$('.commentlist li')) { //Calculating the number of parent comments
							var co = $$('.commentlist li');
							
							for (var a=0; a<co.length; a++) {
								if (co[a].get('class').indexOf('depth-1') != -1) {
									num_comments++;
								}
							}							
						}
						
						if (num_comments != comments_per_page) {	
							if (num_comments > 0) {	
								if (comment_order == 'asc') {
									temp.getElement('.commentlist').getLast().inject($('commentlist'), 'bottom').setStyle('opacity', 0).fade('in');	
								} else {
									temp.getElement('.commentlist').getFirst().inject($('commentlist'), 'top').setStyle('opacity', 0).fade('in');	
									new Fx.Scroll(document.body).start(0, $('commentlist').getCoordinates().top);																
								}
								$('commentCount').set('text', temp.getElement('.list').getFirst().get('text'));
							} else {
								temp.getElement('.list').inject($('commentsholder'), 'top').setStyle('opacity', 0).fade('in');
							}
						} else {
							$('commentsholder').empty();
							temp.getElement('.list').inject($('commentsholder'), 'top').setStyle('opacity', 0).fade('in');
							ajaxLinks('.list span a', 'comments');	
						}
						
					} else { //Threaded comments
						var t = temp.getElements('li');
						for (var i=0; i<t.length; i++) {	
							if (comment_pid == t[i].id) {
								if (!$(comment_pid).getElement('.children')) {
									t[i].getElement('.children').inject($(comment_pid), 'bottom').setStyle('opacity', '0').fade('in');				
								} else {
									t[i].getElement('.children').getLast().inject($(comment_pid).getElement('.children'), 'bottom').setStyle('opacity', '0').fade('in');
								}
							}
						}
					}									
					
					var commentMod = $('commentStatus').set('html', 'Thank you for your comment');
					var commentModfx = new Fx.Tween(commentMod).start('color', '#28ab3b');
					(function(){$('commentStatus').fade('out');}).delay(3000);
					$('comment').value = '';					
				},					

				onFailure: function(instance) {	
					$('postStatus').removeClass('ajax-loading');
					$('comment').fade('in');
					$('commentStatus').fade('in');
					var errTemp = new Element('div').set('html', instance.responseText);
					var errComment = $('commentStatus').set('html', errTemp.getElement('p').get('text'));
					var errCommentfx = new Fx.Tween(errComment).start('color', '#ff3333');
					(function(){$('commentStatus').fade('out');}).delay(3000);
				}
			});
			this.send();
		});			
	}
}


function cancelReply() {
	var t = addComment, temp = t.I('wp-temp-form-div'), respond = t.I(t.respondId);

	if ( ! temp || ! respond )
		return;
		
	t.I('comment_parent').value = '0';
	temp.parentNode.insertBefore(respond, temp);
	temp.parentNode.removeChild(temp);
	document.getElementById('cancel-comment-reply-link').style.display = 'none';
	this.onclick = null;
	return false;
}

//CLEAR SEARCH TXTBOX
function clear(){
	if ($('s').value == 'Start your search ...') {
		$('s').value = '';
	}	
}

//INPUT FADING	
function inputFade(id) {
	if ($(id)){
		$(id).addEvents({
			'focus': function(){			
				if (id == 's') {
					clear();		
				}
				var bgchange = new Fx.Tween(id)
				bgchange.start('background-color', '#ffffff', '#fbfb9d')	
	
			},
			'blur': function(){
				var bgoriginal = new Fx.Tween(id)
				bgoriginal.start('background-color', '#fbfb9d', '#ffffff')
			}
		});		
	}
}

window.addEvent('domready', function(dom){						 
	ajaxLinks('.page-navi a', 'post');
	ajaxLinks('.list span a', 'comments');

	//INPUT FADING
	ajaxComment();
	inputFade('s');
	inputFade('author');
	inputFade('email');
	inputFade('url');	
	inputFade('comment');
	inputFade('cSubject');
	inputFade('cName');
	inputFade('cEmail');	
	inputFade('cMsg');
	ajaxMsg();	
}); //END DOM READY EVENT 