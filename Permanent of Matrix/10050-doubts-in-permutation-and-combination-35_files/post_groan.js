/*=====================================*\
|| ################################### ||
|| # Post Groan Hack version 4.0     # ||
|| ################################### ||
\*=====================================*/
var post_groan_handleSuccess = function(o)
{
	if(o.responseText !== undefined)
	{
		if (post_groan_callback.object_name[o.tId] !== undefined)
		{
			fetch_object(post_groan_callback.object_name[o.tId]).innerHTML = o.responseText;
		}
	}
}
var post_groan_handleFailure = function(o)
{
	if(o.responseText !== undefined)
	{
		alert(o.responseText);
	}
}
var post_groan_callback =
{
	success: post_groan_handleSuccess,
	failure: post_groan_handleFailure,
	timeout: vB_Default_Timeout,
	cache: false,
	object_name: new Array()
};
function post_groan_give(postid, integrate)
{
	fetch_object('post_groan_button_' + postid).style.display = 'none';

	if (integrate == true)
	{
		fetch_object('post_thanks_button_' + postid).style.display = 'none';
	}

	var sUrl = 'post_groan.php';
	var postData = 'do=post_groan_add&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, post_groan_callback, postData);

	post_groan_callback.object_name[request.tId] = 'post_groan_box_' + postid;

	return false;
}
function post_groan_remove_all(postid, integrate)
{
	var sUrl = 'post_groan.php';
	var postData = 'do=post_groan_remove_all&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, post_groan_callback, postData);

	post_groan_callback.object_name[request.tId] = 'post_groan_box_' + postid;

	fetch_object('post_groan_button_' + postid).style.display = ''

	if (integrate == true)
	{
		fetch_object('post_thanks_button_' + postid).style.display = '';
	}

	return false;
}
function post_groan_remove_user(postid, integrate)
{
	var sUrl = 'post_groan.php';
	var postData = 'do=post_groan_remove_user&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, post_groan_callback, postData);

	post_groan_callback.object_name[request.tId] = 'post_groan_box_' + postid;

	fetch_object('post_groan_button_' + postid).style.display = ''

	if (integrate == true)
	{
		fetch_object('post_thanks_button_' + postid).style.display = '';
	}

	return false;	
}
