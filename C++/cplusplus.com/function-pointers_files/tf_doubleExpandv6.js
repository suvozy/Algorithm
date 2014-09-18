// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var TF_requiredMajorVersion = 8;
// Minor version of Flash required
var TF_requiredMinorVersion = 0;
// Revision of Flash required
var TF_requiredRevision = 0;
// -----------------------------------------------------------------------------

var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function TF_ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful.

			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}

	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function TF_GetSwfVer() {
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;

	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if (isIE && isWin && !isOpera) {
		flashVer = TF_ControlVersion();
	}
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function TF_DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = TF_GetSwfVer();
	if (versionStr == -1) {
		return false;
	} else if (versionStr != 0) {
		if (isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray = versionStr.split(" ");
			// ["WIN", "2,0,0,11"]
			tempString = tempArray[1];
			// "2,0,0,11"
			versionArray = tempString.split(",");
			// ['2', '0', '0', '11']
		} else {
			versionArray = versionStr.split(".");
		}
		var versionMajor = versionArray[0];
		var versionMinor = versionArray[1];
		var versionRevision = versionArray[2];

		// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function TF_AC_AddExtension(src, ext)
{
	if (src.indexOf('?') != -1)
		return src.replace(/\?/, ext + '?');
	else
		return src + ext;
}

function TF_AC_GenerateobjDoubleExpand4(objAttrs, params, embedAttrs)
{
	var str = '';
	if (isIE && isWin && !isOpera)
	{
		str += '<object ';
		for (var i in objAttrs)
		{
			str += i + '="' + objAttrs[i] + '" ';
		}
		str += '>';
		for (var i in params)
		{
			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
		}
		str += '</object>';
	}
	else
	{
		str += '<embed ';
		for (var i in embedAttrs)
		{
			str += i + '="' + embedAttrs[i] + '" ';
		}
		str += '> </embed>';
	}

	return str;
}

function TF_AC_FL_RunContentDoubleExpand4() {
	var ret =
			TF_AC_GetArgs
					(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
							, "application/x-shockwave-flash"
							);
	return TF_AC_GenerateobjDoubleExpand4(ret.objAttrs, ret.params, ret.embedAttrs);
}

function TF_AC_GetArgs(args, ext, srcParamName, classid, mimeType) {
	var ret = new Object();
	ret.embedAttrs = new Object();
	ret.params = new Object();
	ret.objAttrs = new Object();
	for (var i = 0; i < args.length; i = i + 2) {
		var currArg = args[i].toLowerCase();

		switch (currArg) {
			case "classid":
				break;
			case "pluginspage":
				ret.embedAttrs[args[i]] = args[i + 1];
				break;
			case "src":
			case "movie":
				args[i + 1] = TF_AC_AddExtension(args[i + 1], ext);
				ret.embedAttrs["src"] = args[i + 1];
				ret.params[srcParamName] = args[i + 1];
				break;
			case "onafterupdate":
			case "onbeforeupdate":
			case "onblur":
			case "oncellchange":
			case "onclick":
			case "ondblclick":
			case "ondrag":
			case "ondragend":
			case "ondragenter":
			case "ondragleave":
			case "ondragover":
			case "ondrop":
			case "onfinish":
			case "onfocus":
			case "onhelp":
			case "onmousedown":
			case "onmouseup":
			case "onmouseover":
			case "onmousemove":
			case "onmouseout":
			case "onkeypress":
			case "onkeydown":
			case "onkeyup":
			case "onload":
			case "onlosecapture":
			case "onpropertychange":
			case "onreadystatechange":
			case "onrowsdelete":
			case "onrowenter":
			case "onrowexit":
			case "onrowsinserted":
			case "onstart":
			case "onscroll":
			case "onbeforeeditfocus":
			case "onactivate":
			case "onbeforedeactivate":
			case "ondeactivate":
			case "type":
			case "codebase":
			case "id":
				ret.objAttrs[args[i]] = args[i + 1];
				break;
			case "width":
			case "height":
			case "align":
			case "vspace":
			case "hspace":
			case "class":
			case "title":
			case "accesskey":
			case "name":
			case "tabindex":
				ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
				break;
			default:
				ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
		}
	}
	ret.objAttrs["classid"] = classid;
	if (mimeType) ret.embedAttrs["type"] = mimeType;
	return ret;
}
// -----------------------------------------------------------------------------
function getVariableValue(id, name) {
	if(typeof(tf_variableManager) != "undefined") {
		return tf_variableManager[id][name];
	}
}

function setVariableValue(id, name, value) {
	if(typeof(tf_variableManager) == "undefined") {
		tf_variableManager = new Object();
	}
	if(typeof(tf_variableManager[id]) == "undefined") {
		tf_variableManager[id] = new Object();
	}
	tf_variableManager[id][name] = value;
}

function tf_doubleExpand5(id, preLoaded) {
	if(typeof(preLoaded) == "undefined" || preLoaded == false) {
		if(getVariableValue(id, "tf_isMouseIn") == false) {
			return;
		}
	}
	setVariableValue(id, "tf_isMouseIn", true);
	setVariableValue(id, "collapsed", false);
	var div_staticElement = document.getElementById(getVariableValue(id, "divStaticId"));
	var div_dynamicElementCollapsed = document.getElementById(getVariableValue(id, "divDynamicCollapsedId"));
	var div_dynamicElementExpanded = document.getElementById(getVariableValue(id, "divDynamicExpandedId"));
	div_staticElement.style.zIndex = 2147483647;
	div_dynamicElementCollapsed.style.visibility = "hidden";
	div_dynamicElementExpanded.style.visibility = "visible";

	var tf_widthCollapsed = parseInt(div_dynamicElementCollapsed.style.width, 10);
	var tf_heightCollapsed = parseInt(div_dynamicElementCollapsed.style.height, 10);
	var tf_widthExpanded = parseInt(div_dynamicElementExpanded.style.width, 10);
	var tf_heightExpanded = parseInt(div_dynamicElementExpanded.style.height, 10);

	var imprintPixel = getVariableValue(id, "tf_doubleExpandImprintPixel");
	if(imprintPixel != "") {
		if(typeof(tf_isIE7) != "undefined" && tf_isIE7 == true) {
			var img = document.createElement("img");
			img.src = url;
			img.style.width = "1px";
			img.style.height = "1px";
			img.style.display = "none";
			document.body.appendChild(img);
		} else {
			var img = new Image();
			img.src = imprintPixel;
		}
	}

	var position;
	var tf_collapsedx;
	var tf_collapsedy;
	position = tf_getPositionDoubleExpand1(div_dynamicElementCollapsed, tf_widthCollapsed, tf_heightCollapsed, tf_widthExpanded, tf_heightExpanded);

	if (position.x == POSITION.LEFT) {
		tf_collapsedx = 0;
	} else { //if (position.x == POSITION.RIGHT)
		tf_collapsedx = tf_widthExpanded - tf_widthCollapsed;
	}

	if (position.y == POSITION.TOP) {
		tf_collapsedy = 0;
	} else { //if (position.y == POSITION.BOTTOM)
		tf_collapsedy = tf_heightExpanded - tf_heightCollapsed;
	}

	var viewport = tf_getViewPort();
	if (position.top < viewport.top) {
		if (position.left < viewport.left) {
			tf_doubleSmoothScroll(id, position.left, position.top, viewport.left, viewport.top);
		} else if (position.right > viewport.left + viewport.width)	{
			tf_doubleSmoothScroll(id, position.right - tf_widthExpanded, position.top, viewport.left, viewport.top);
		} else {
			tf_doubleSmoothScroll(id, viewport.left, position.top, viewport.left, viewport.top);
		}
	} else if (position.bottom > viewport.top + viewport.height) {
		if (position.left < viewport.left) {
			tf_doubleSmoothScroll(id, position.left, viewport.top + (position.bottom - (viewport.top + viewport.height)), viewport.left, viewport.top);
		} else if (position.right > viewport.left + viewport.width)	{
			tf_doubleSmoothScroll(id, position.right - tf_widthExpanded, viewport.top + (position.bottom - (viewport.top + viewport.height)), viewport.left, viewport.top);
		} else {
			tf_doubleSmoothScroll(id, viewport.left, viewport.top + (position.bottom - (viewport.top + viewport.height)), viewport.left, viewport.top);
		}
	} else {
		if (position.right > viewport.left + viewport.width) {
			tf_doubleSmoothScroll(id, position.right - tf_widthExpanded, viewport.top, viewport.left, viewport.top);
		} else if (position.left < viewport.left) {
			tf_doubleSmoothScroll(id, position.left, viewport.top, viewport.left, viewport.top);
		} else {
			tf_doubleSmoothScroll(id, viewport.left, viewport.top, viewport.left, viewport.top);
		}
	}

	div_dynamicElementExpanded.style.left = (-1) * tf_collapsedx + "px";
	div_dynamicElementExpanded.style.top = (-1) * tf_collapsedy + "px";
	var dummy_IFrameElement = document.getElementById(getVariableValue(id, "dummyIFrameId"));
	if(dummy_IFrameElement) {
		dummy_IFrameElement.style.left = (-1) * tf_collapsedx + "px";
		dummy_IFrameElement.style.top = (-1) * tf_collapsedy + "px";
		dummy_IFrameElement.style.display = "";
	}

	if(getVariableValue(id, "tf_hidden_reLoadByPlay") == 1) {
		if(typeof(getVariableValue(id, "innerHTML") ) != "undefined") {
			div_dynamicElementExpanded.innerHTML = getVariableValue(id, "innerHTML");
		}
	} else if(getVariableValue(id, "tf_hidden_reLoadByPlay") == 2) {
		var flash_objectExpanded = tf_thisMovie(getVariableValue(id, "flashExpandedId"));
		if(flash_objectExpanded) {
			try {
				flash_objectExpanded.GotoFrame(1);
				flash_objectExpanded.Play();
			} catch (e) {
			}
		}
	}

    var closeDiv = document.getElementById("closeDiv" + id);
    if(closeDiv) {
        window.setTimeout("tf_doubleFlashLoaded('" + id + "')", getVariableValue(id, "closeButtonShowDelay"));
		setVariableValue(id, "detectFlashTimeOut", window.setTimeout("tf_doubleDetectFlashLoaded('" + id + "')", 10));
    }
}

function tf_doubleCollapse4(id, fromJS) {
	if(typeof(fromJS) != "undefined" && fromJS == true) {
		if(getVariableValue(id, "tf_isMouseIn") == true) {
			return;
		}
	}

	setVariableValue(id, "lastTime", new Date().getTime());
	setVariableValue(id, "tf_isMouseIn", false);
	setVariableValue(id, "collapsed", true);
	var div_staticElement = document.getElementById(getVariableValue(id, "divStaticId"));
	var div_dynamicElementCollapsed = document.getElementById(getVariableValue(id, "divDynamicCollapsedId"));
	var div_dynamicElementExpanded = document.getElementById(getVariableValue(id, "divDynamicExpandedId"));
	div_staticElement.style.zIndex = 0;
	div_dynamicElementCollapsed.style.visibility = "visible";
	div_dynamicElementExpanded.style.visibility = "hidden";
	var dummy_IFrameElement = document.getElementById(getVariableValue(id, "dummyIFrameId"));
	if(dummy_IFrameElement) {
		dummy_IFrameElement.style.display = "none";
	}

	if(getVariableValue(id, "tf_hidden_reLoadByPlay") == 1) {
		div_dynamicElementExpanded.innerHTML = "";
	} else if(getVariableValue(id, "tf_hidden_reLoadByPlay") == 2) {
		var flash_objectExpanded = tf_thisMovie(getVariableValue(id, "flashExpandedId"));
		if(flash_objectExpanded) {
			try {
				flash_objectExpanded.StopPlay();
			} catch (e) {
			}
		}
	}

    var closeDiv = document.getElementById("closeDiv" + id);
    if(closeDiv) {
        closeDiv.style.display = "none";        
    }
}

function tf_thisMovie(movieName) {
	if (isIE) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

function tf_doubleScrollStep(id, toY, destY, down, toX, destX, right) {
    var stepIncrementY = getVariableValue(id, "stepIncrementY");
    var stepIncrementX = getVariableValue(id, "stepIncrementX");

    if ((down && toY >= (destY - (2 * stepIncrementY))) ||
        (!down && toY <= (destY - (2 * stepIncrementY)))) {
        setVariableValue(id, "stepIncrementY", stepIncrementY * .55);
    }
    if ((right && toX >= (destX - (2 * stepIncrementX))) ||
        (!right && toX <= (destX - (2 * stepIncrementX)))) {
        setVariableValue(id, "stepIncrementX", stepIncrementX * .55);
    }

    if (!getVariableValue(id, "runningY") || (down && toY >= destY) || (!down && toY <= destY)) {
        setVariableValue(id, "runningY", false);
    }
    if (!getVariableValue(id, "runningX") || (right && toX >= destX) || (!right && toX <= destX)) {
        setVariableValue(id, "runningX", false);
    }

    var runningX = getVariableValue(id, "runningX");
    var runningY = getVariableValue(id, "runningY");
    var stepDelay = getVariableValue(id, "stepDelay");
    stepIncrementY = getVariableValue(id, "stepIncrementY");
    stepIncrementX = getVariableValue(id, "stepIncrementX");

    if (!runningY && !runningX) {
        tf_doubleKillScroll(id);
        return;
    } else if (runningY && !runningX) {
        var viewport = tf_getViewPort();
        window.scrollTo(viewport.left, toY);
        setVariableValue(id, "nextStep", tf_doubleCallNext(id, +toY + stepIncrementY, destY, down, 0, destX, right));
        window.setTimeout(getVariableValue(id, "nextStep"), stepDelay);
    } else if (!runningY && runningX) {
        var viewport = tf_getViewPort();
        window.scrollTo(toX, viewport.top);
        setVariableValue(id, "nextStep", tf_doubleCallNext(id, 0, destY, down, +toX + stepIncrementX, destX, right));
        window.setTimeout(getVariableValue(id, "nextStep"), stepDelay);
    } else {
        window.scrollTo(toX, toY);
        setVariableValue(id, "nextStep", tf_doubleCallNext(id, +toY + stepIncrementY, destY, down, +toX + stepIncrementX, destX, right));
        window.setTimeout(getVariableValue(id, "nextStep"), stepDelay);
    }
}

function tf_doubleCallNext(id, toY, destY, down, toX, destX, right) {
    return function() {
        tf_doubleScrollStep(id, toY, destY, down, toX, destX, right);
    };
}

function tf_doubleSmoothScroll(id, targetXCoord, targetYCoord, currentXCoord, currentYCoord) {
    setVariableValue(id, "runningY", true);
    setVariableValue(id, "runningX", true);
    setVariableValue(id, "down", true);
    setVariableValue(id, "right", true);

    var incrementY = getVariableValue(id, "stepIncrementY");
    var incrementX = getVariableValue(id, "stepIncrementX");

    if (currentYCoord >= targetYCoord) {
        setVariableValue(id, "stepIncrementY", (-1)*incrementY);
        setVariableValue(id, "down", false);
        targetYCoord -= 17;
    } else {
        targetYCoord += 17;
    }
    if (currentXCoord >= targetXCoord) {
        setVariableValue(id, "stepIncrementX", (-1)*incrementX);
        setVariableValue(id, "right", false);
        targetXCoord -= 17;
    } else {
        targetXCoord += 17;
    }

    setVariableValue(id, "killTimeout", window.setTimeout("tf_doubleKillScroll('" + id + "')", getVariableValue(id, "limit")));
    tf_doubleScrollStep(id, currentYCoord + getVariableValue(id, "stepIncrementY"), targetYCoord, getVariableValue(id, "down"), currentXCoord + getVariableValue(id, "stepIncrementX"), targetXCoord, getVariableValue(id, "right"));
}

function tf_doubleKillScroll(id) {
    window.clearTimeout(getVariableValue(id, "killTimeout"));
    setVariableValue(id, "runningX", false);
    setVariableValue(id, "runningY", false);
    setVariableValue(id, "stepIncrementX", 10);
    setVariableValue(id, "stepIncrementY", 10);
}

function tf_getPositionDoubleExpand1(el, widthCollapsed, heightCollapsed, widthExpanded, heightExpanded) {
	var elementx = el.offsetLeft;
	var elementy = el.offsetTop;

	var parent = el.offsetParent;
	while (parent) {
		elementx += parent.offsetLeft;
		elementy += parent.offsetTop;
		parent = parent.offsetParent;
	}

	var screenWidth = document.body.scrollWidth;
	// available width  = document.body.clientWidth
	var screenHeight = document.body.scrollHeight;
	// available width  = document.body.clientHeight
	var positionx;
	var positiony;
	var left;
	var top;
	var right;
	var bottom;
	var leftSpace = elementx;
	var rightSpace = screenWidth - elementx - widthCollapsed;
	var topSpace = elementy;
	var bottomSpace = screenHeight - elementy - heightCollapsed;
	if (rightSpace >= leftSpace) {
		positionx = POSITION.LEFT;
		left = elementx + widthExpanded;
	} else {
		if(leftSpace < widthExpanded - widthCollapsed) {
			positionx = POSITION.LEFT;
			left = elementx + widthExpanded;
		} else {
			positionx = POSITION.RIGHT;
			left = elementx - (widthExpanded - widthCollapsed);
		}
	}

	if (bottomSpace >= topSpace) {
		positiony = POSITION.TOP;
		top = elementy;
	} else {
		if(topSpace < heightExpanded - heightCollapsed) {
			positiony = POSITION.TOP;
			top = elementy;
		} else {
			positiony = POSITION.BOTTOM;
			top = elementy - (heightExpanded - heightCollapsed);
		}
	}
	right = left + widthExpanded;
	bottom = top + heightExpanded;

	return {x: positionx, y: positiony, top: top, left: left, right: right, bottom: bottom};
}

function tf_getViewPort() {
	var left;
	var top;
	var width;
	var height;
	var body = document.body;
	var docElem = document.documentElement;
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
	var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
	top = scrollTop - clientTop;
	left = scrollLeft - clientLeft;
	if (typeof window.innerWidth != 'undefined') {
		width = window.innerWidth,
		height = window.innerHeight
	} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		width = document.documentElement.clientWidth;
		height = document.documentElement.clientHeight
	} else {
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}

	return {left: left, top: top, width: width, height: height};
}

function tf_doubleDetectFlashLoaded(id) {
	var flash_objectExpanded = tf_thisMovie(getVariableValue(id, "flashExpandedId"));
	if(flash_objectExpanded) {
		try {
			if(flash_objectExpanded.PercentLoaded() == 100) {
				tf_doubleFlashLoaded(id);
			} else {
				setVariableValue(id, "detectFlashTimeOut", window.setTimeout("tf_doubleDetectFlashLoaded('" + id + "')", 10));
			}
		} catch (e) {
		}
	}
}
function tf_doubleFlashLoaded(id) {
    var closeDiv = document.getElementById("closeDiv" + id);
    if(closeDiv == null) {
        return;
    }
	window.clearTimeout(getVariableValue(id, "detectFlashTimeOut"));
    if(getVariableValue(id, "collapsed")) {
        closeDiv.style.display = "none";        
    } else {
        closeDiv.style.display = "";
    }
}

function TF_GetFlashVarsDoubleExpand4(tf_adBanner, extraVars) {
	var flashVars = "";
	flashVars = "clickTag=" + escape(tf_clickTag);
	flashVars += "&clickTAG=" + escape(tf_clickTag);
	flashVars += "&clicktag=" + escape(tf_clickTag);

	var i = 1;
	while(eval("typeof(tf_clickTag" + i + ")") != "undefined") {
		flashVars += "&clickTag" + i + "=" + escape(eval("tf_clickTag" + i));
		i++;
	}
	flashVars += "&tf_state=" + tf_state;
	flashVars += "&tf_city=" + tf_city;
	flashVars += "&tf_zipcode=" + tf_zipcode;
	flashVars += "&tf_gender=" + tf_gender;
	flashVars += "&tf_location=" + tf_location;
	flashVars += "&tf_id=" + tf_id;
	flashVars += "&tf_show=tf_doubleExpand5";
	flashVars += "&tf_close=tf_doubleCollapse4";
	flashVars += "&tf_flashLoaded=tf_doubleFlashLoaded";

	if(typeof(extraVars) == "object") {
		for(i in extraVars) {
			flashVars += "&" + i + "=" + escape(extraVars[i]);
		}
	} else if(typeof(extraVars) == "string") {
		flashVars += "&" + extraVars;
	}
	return flashVars;
}

function tf_doubleCloseMouseDown(id, e) {
	var dragElement = (e.target)? e.target: e.srcElement;
	var closeDiv = document.getElementById("closeDiv" + id);
	if(dragElement != closeDiv && dragElement.parentNode != closeDiv) {
		return;
	}

	setVariableValue(id, "dragElement", closeDiv);

	var x = e.clientX;
	var y = e.clientY;
	var elX = 0;
	var elY = 0;
	if (document.defaultView) {
		elX = parseInt(document.defaultView.getComputedStyle(closeDiv, "").getPropertyValue("left"), 10);
		elY = parseInt(document.defaultView.getComputedStyle(closeDiv, "").getPropertyValue("top"), 10);
	}
	else {
		elX = parseInt(closeDiv.currentStyle.left, 10);
		elY = parseInt(closeDiv.currentStyle.top, 10);
	}
	setVariableValue(id, "X", x);
	setVariableValue(id, "Y", y);
	setVariableValue(id, "elX", elX);
	setVariableValue(id, "elY", elY);
}

function tf_doubleCloseMouseMove(id, e) {
	if(typeof(getVariableValue(id, "dragElement")) == "undefined") {
		return;
	}
	var x = e.clientX;
	var y = e.clientY;
	var elX = getVariableValue(id, "elX");
	var elY = getVariableValue(id, "elY");

	getVariableValue(id, "dragElement").style.left = elX - getVariableValue(id, "X") + x + "px";
	getVariableValue(id, "dragElement").style.top = elY - getVariableValue(id, "Y") + y + "px";
}

function tf_doubleCloseMouseUp(id, e) {
	if(typeof(getVariableValue(id, "dragElement")) == "undefined") {
		return;
	}
	var elX = 0;
	var elY = 0;
	if (document.defaultView) {
		elX = parseInt(document.defaultView.getComputedStyle(getVariableValue(id, "dragElement"), "").getPropertyValue("left"), 10);
		elY = parseInt(document.defaultView.getComputedStyle(getVariableValue(id, "dragElement"), "").getPropertyValue("top"), 10);
	}
	else {
		elX = parseInt(getVariableValue(id, "dragElement").currentStyle.left, 10);
		elY = parseInt(getVariableValue(id, "dragElement").currentStyle.top, 10);
	}
	alert("var tf_leftClose = " + elX + ";\nvar tf_topClose = " + elY + ";");
	setVariableValue(id, "dragElement");
}

function tf_doubleDummyClose1(id) {
	if(!getVariableValue(id, "tf_doubleEditMode")) {
		tf_doubleCollapse4(id);
	}
}

try {

	var flashCollapsedId = "TFDoubleExpandCollpasedFlash" + tf_id;
	var flashExpandedId = "TFDoubleExpandExpandedFlash" + tf_id;
	var flashCloseId = "TFDoubleExpandCloseFlash" + tf_id;
	var divStaticId = "TFDoubleExpandFixedDiv" + tf_id;
	var divDynamicCollapsedId = "TFDoubleExpandCollpasedDiv" + tf_id;
	var divDynamicExpandedId = "TFDoubleExpandExpandedDiv" + tf_id;
	var dummyIFrameId = "TFDoubleExpandDummyIFrame" + tf_id;
	setVariableValue(tf_id, "flashCollapsedId", flashCollapsedId);
	setVariableValue(tf_id, "flashExpandedId", flashExpandedId);
	setVariableValue(tf_id, "divStaticId", divStaticId);
	setVariableValue(tf_id, "divDynamicCollapsedId", divDynamicCollapsedId);
	setVariableValue(tf_id, "divDynamicExpandedId", divDynamicExpandedId);
	setVariableValue(tf_id, "dummyIFrameId", dummyIFrameId);
	setVariableValue(tf_id, "lastTime", new Date().getTime());

	setVariableValue(tf_id, "stepIncrementY", 10);
	setVariableValue(tf_id, "stepDelay", 10);
	setVariableValue(tf_id, "stepIncrementX", 10);
	setVariableValue(tf_id, "limit", 6000);
	setVariableValue(tf_id, "runningY", false);
	setVariableValue(tf_id, "runningX", false);
	setVariableValue(tf_id, "nextStep", "");
	setVariableValue(tf_id, "killTimeout", 0);

	document.write("<!--[if IE 7]><script type='text/javascript'>var tf_isIE7 = true;</script><![endif]-->");

	if(typeof(tf_hidden_reLoadByPlay) != "undefined") {
		setVariableValue(tf_id, "tf_hidden_reLoadByPlay", tf_hidden_reLoadByPlay);
	} else {
		setVariableValue(tf_id, "tf_hidden_reLoadByPlay", 1);
	}

	if(typeof(tf_doubleExpandImprintPixel) != "undefined") {
		setVariableValue(tf_id, "tf_doubleExpandImprintPixel", tf_doubleExpandImprintPixel);
	} else {
		setVariableValue(tf_id, "tf_doubleExpandImprintPixel", "");
	}

	if(typeof(tf_doubleCloseButtonShowDelay) != "undefined") {
		setVariableValue(tf_id, "closeButtonShowDelay", tf_doubleCloseButtonShowDelay);
	} else {
		setVariableValue(tf_id, "closeButtonShowDelay", 2000);
	}

	setVariableValue(tf_id, "tf_isMouseIn", false);
	var POSITION = {TOP: -1, LEFT: -1, CENTER: 0, RIGHT: 1, BOTTOM: 1};

	var tf_flashVarsCollapsed = "";
	if(typeof(tf_extraFlashVarsCollapsed) != "undefined") {
		tf_flashVarsCollapsed = TF_GetFlashVarsDoubleExpand4(tf_flashfileCollapsed, tf_extraFlashVarsCollapsed);
	} else {
		tf_flashVarsCollapsed = TF_GetFlashVarsDoubleExpand4(tf_flashfileCollapsed);
	}

	var tf_flashVarsExpanded = "";
	if(typeof(tf_extraFlashVarsExpanded) != "undefined") {
		tf_flashVarsExpanded = TF_GetFlashVarsDoubleExpand4(tf_flashfileExpanded, tf_extraFlashVarsExpanded);
	} else {
		tf_flashVarsExpanded = TF_GetFlashVarsDoubleExpand4(tf_flashfileExpanded);
	}

	if(typeof(tf_use_flash_wrapper) == "undefined") {
		tf_use_flash_wrapper = false;
	}

	if(typeof(tf_doubleExpandAllowFullScreen) == "undefined") {
		tf_doubleExpandAllowFullScreen = false;
	}

	if(typeof(tf_doubleAutoCollapse) == "undefined") {
		tf_doubleAutoCollapse = true;
	}

	if(typeof(tf_salignCollapsed) == "undefined") {
		tf_salignCollapsed = "lt";
	}

	if(typeof(tf_salignExpanded) == "undefined") {
		tf_salignExpanded = "lt";
	}

	if(typeof(tf_hidden_doubleExpandDelay) == "undefined") {
		tf_hidden_doubleExpandDelay = 500;
	}

	if(typeof(tf_hidden_doubleCollapseDelay) == "undefined") {
		tf_hidden_doubleCollapseDelay = 500;
	}

	if(typeof(tf_bgcolorCollapsed) == "undefined") {
		tf_bgcolorCollapsed = "#ffffff";
	}

	if(typeof(tf_bgcolorExpanded) == "undefined") {
		tf_bgcolorExpanded = "#ffffff";
	}

	if(typeof(tf_wmodeCollapsed) == "undefined") {
		tf_wmodeCollapsed = "transparent";
	}

	if(typeof(tf_wmodeExpanded) == "undefined") {
		tf_wmodeExpanded = "transparent";
	}

	if(typeof(tf_doubleEditMode) == "undefined") {
		tf_doubleEditMode = false;
	}

	if(tf_use_flash_wrapper == true && tf_doubleAutoCollapse == false && typeof(tf_fileClose) == "undefined") {
		throw "tf_fileClose";
	}

	if(typeof(tf_fileClose) != "undefined") {
		if(typeof(tf_leftClose) == "undefined") {
			throw "tf_leftClose";
		}
		if(typeof(tf_topClose) == "undefined") {
			throw "tf_topClose";
		}
		if(typeof(tf_widthClose) == "undefined") {
			throw "tf_widthClose";
		}
		if(typeof(tf_heightClose) == "undefined") {
			throw "tf_heightClose";
		}
	}

	if(typeof(tf_imagefileCollapsed) == "undefined") {
		throw "tf_imagefileCollapsed";
	}

	if(typeof(tf_imagefileExpanded) == "undefined") {
		throw "tf_imagefileExpanded";
	}

	if(typeof(tf_flashfileCollapsed) == "undefined") {
		throw "tf_flashfileCollapsed";
	}

	if(typeof(tf_flashfileExpanded) == "undefined") {
		throw "tf_flashfileExpanded";
	}

	if(typeof(tf_widthCollapsed) == "undefined") {
		throw "tf_widthCollapsed";
	}

	if(typeof(tf_heightCollapsed) == "undefined") {
		throw "tf_heightCollapsed";
	}

	if(typeof(tf_widthExpanded) == "undefined") {
		throw "tf_widthExpanded";
	}

	if(typeof(tf_heightExpanded) == "undefined") {
		throw "tf_heightExpanded";
	}

	setVariableValue(tf_id, "tf_doubleEditMode", tf_doubleEditMode);

	var tf_text = "";
	var tf_write = function(text) { tf_text += text; };

	var TF_hasRightVersionDoubleExpand = false;
	TF_hasRightVersionDoubleExpand = TF_DetectFlashVer(TF_requiredMajorVersion, TF_requiredMinorVersion, TF_requiredRevision);
	tf_write("<div id='" + divStaticId + "' style='width:" + tf_widthCollapsed + "px;height:" + tf_heightCollapsed + "px;position:relative;z-index:0;padding:0px;'>");

	if(!TF_hasRightVersionDoubleExpand) {
		tf_write("<a href='" + tf_clickTag + "' target='_blank'>");
	}
	tf_write("<div id='" + divDynamicCollapsedId + "'");
	tf_write(" style='z-index:1;width:" + tf_widthCollapsed + "px;height:" + tf_heightCollapsed + "px;position:relative;padding:0px;");
	if(!TF_hasRightVersionDoubleExpand) {
		tf_write("background-image:url(\"" + tf_imagefileCollapsed + "\");cursor:pointer;");
	}
	tf_write("' onmouseover='if(new Date().getTime()-getVariableValue(\"" + tf_id + "\", \"lastTime\")<100)return;if(getVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\"))return;setVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\", true);setVariableValue(\"" + tf_id + "\", \"collapsedtimeout\", window.setTimeout(\"tf_doubleExpand5(\\\"" + tf_id + "\\\");\", " + tf_hidden_doubleExpandDelay + "));'");
	tf_write(" onmouseout='setVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\", false);window.clearTimeout(getVariableValue(\"" + tf_id + "\", \"collapsedtimeout\"));'");
	tf_write(">");
	if (TF_hasRightVersionDoubleExpand) {
		tf_write(TF_AC_FL_RunContentDoubleExpand4(
				"codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
				"width", tf_widthCollapsed,
				"height", tf_heightCollapsed,
				"src", tf_flashfileCollapsed,
				"quality", "high",
				"pluginspage", "http://www.macromedia.com/go/getflashplayer",
				"align", "middle",
				"play", "true",
				"loop", "true",
				"scale", "noscale",
				"wmode", tf_wmodeCollapsed,
				"devicefont", "false",
				"id", flashCollapsedId,
				"bgcolor", tf_bgcolorCollapsed,
				"name", flashCollapsedId,
				"menu", "false",
				"allowFullScreen", "false",
				"allowScriptAccess", "always",
				"movie", tf_flashfileCollapsed,
				"salign", tf_salignCollapsed,
				"flashVars", tf_flashVarsCollapsed
				)
			+ ((tf_use_flash_wrapper)?"<a href='" + tf_clickTag + "' target='_blank'>"
			+ "<div style='position:absolute;left:0px;top:0px;width:" + tf_widthCollapsed + "px;height:" + tf_heightCollapsed + "px;z-index:1;cursor:pointer;opacity:0.01;-moz-opacity:0.01;filter:alpha(opacity=1);background-color:white'></div>"
			+ "</a>":""));
		//end AC code
	} else {
	}
	tf_write("</div>");
	tf_write("<!--[if lt IE 7]><IFRAME id='" + dummyIFrameId + "' style='border:none;display: none; left: 0px; position: absolute; top: 0px;z-index:0;opacity:0.1;-moz-opacity:0.1;filter:alpha(opacity=0);' src='javascript:false;' frameBorder='0' scrolling='no' width='" + tf_widthExpanded + "px' height='" + tf_heightExpanded + "px' hSpace = '0' vSpace = '0' marginHeight = '0' marginWidth = '0'></IFRAME><![endif]-->");

	tf_write("<div id='" + divDynamicExpandedId + "'");
	if(tf_doubleAutoCollapse || !TF_hasRightVersionDoubleExpand) {
		tf_write(" onmouseout='setVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\", false);setVariableValue(\"" + tf_id + "\", \"expandedtimeout\", window.setTimeout(\"tf_doubleCollapse4(\\\"" + tf_id + "\\\", true);\", " + tf_hidden_doubleCollapseDelay + "));'");
	}
	tf_write(" onmouseover='if(getVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\"))return;setVariableValue(\"" + tf_id + "\", \"tf_isMouseIn\", true);window.clearTimeout(getVariableValue(\"" + tf_id + "\", \"expandedtimeout\"))'");
	tf_write(" style='z-index:2;width:" + tf_widthExpanded + "px;height:" + tf_heightExpanded + "px;position:absolute;visibility:hidden;left:" + (-1) * (tf_widthExpanded - tf_widthCollapsed) + "px;top:" + (-1) * (tf_heightExpanded - tf_heightCollapsed) + "px;padding:0px;");
	if(!TF_hasRightVersionDoubleExpand) {
		tf_write("background-image:url(\"" + tf_imagefileExpanded + "\");cursor:pointer;");
	}
	tf_write("'>");
	if (TF_hasRightVersionDoubleExpand) {
		var html = TF_AC_FL_RunContentDoubleExpand4(
				"codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
				"width", tf_widthExpanded,
				"height", tf_heightExpanded,
				"src", tf_flashfileExpanded,
				"quality", "high",
				"pluginspage", "http://www.macromedia.com/go/getflashplayer",
				"align", "",
				"play", "true",
				"loop", "true",
				"scale", "noscale",
				"wmode", tf_wmodeExpanded,
				"devicefont", "false",
				"id", flashExpandedId,
				"bgcolor", tf_bgcolorExpanded,
				"name", flashExpandedId,
				"menu", "false",
				"allowFullScreen", tf_doubleExpandAllowFullScreen,
				"allowScriptAccess", "always",
				"movie", tf_flashfileExpanded,
				"salign", tf_salignExpanded,
				"flashVars", tf_flashVarsExpanded);
		if(tf_use_flash_wrapper) {
			if(typeof(tf_fileClose) != "undefined") {
				html += "<div id='closeDiv" + tf_id + "' style='display:none;position:absolute;cursor:pointer;z-index:2;left:" + tf_leftClose + "px;top:" + tf_topClose + "px;width:" + tf_widthClose + "px;height:" + tf_heightClose + "px;";
				if(/\.jpg$/i.test(tf_fileClose) || /\.jpeg$/i.test(tf_fileClose) || /\.gif$/i.test(tf_fileClose) || /\.png$/i.test(tf_fileClose)) {
					html += "background:url(\"" + tf_fileClose + "\") no-repeat' onclick='tf_doubleDummyClose1(\"" + tf_id + "\")'>";
				} else {
					html += "'>";
					html += TF_AC_FL_RunContentDoubleExpand4(
						"codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
						"width", tf_widthClose,
						"height", tf_heightClose,
						"src", tf_fileClose,
						"quality", "high",
						"pluginspage", "http://www.macromedia.com/go/getflashplayer",
						"align", "",
						"play", "true",
						"loop", "true",
						"scale", "noscale",
						"wmode", "transparent",
						"devicefont", "false",
						"id", flashCloseId,
						"bgcolor", "#ffffff",
						"name", flashCloseId,
						"menu", "false",
						"allowFullScreen", "false",
						"allowScriptAccess", "always",
						"movie", tf_fileClose,
						"salign", 'lt',
						"flashVars", "tf_id=" + tf_id + "&tf_close=tf_doubleDummyClose1");
				}
				html += "</div>";
			}
			html += "<a href='" + tf_clickTag + "' target='_blank'>";
			html += "<div style='position:absolute;left:0px;top:0px;width:" + tf_widthExpanded + "px;height:" + tf_heightExpanded + "px;z-index:1;cursor:pointer;opacity:0.01;-moz-opacity:0.01;filter:alpha(opacity=1);background-color:white'></div>";
			html+= "</a>";
		}
		setVariableValue(tf_id, "innerHTML", html);
		//end AC code
	} else {
	}

	tf_write("</div>");

	if(!TF_hasRightVersionDoubleExpand) {
		tf_write("</a>");
	}
	tf_write("</div>");

	document.write(tf_text);

	if(typeof(tf_doublePreloaded) != "undefined" && tf_doublePreloaded == true) {
		var tf_new_load = new Function("tf_doubleExpand5('" + tf_id + "', true);")
		if (window.attachEvent) {
			window.attachEvent("onload", tf_new_load);
		} else {
			window.addEventListener("load", tf_new_load, false);
		}
	}

	if(tf_doubleEditMode) {
		if(document.attachEvent) {
			document.attachEvent("onmousedown", new Function("tf_doubleCloseMouseDown('" + tf_id + "', event)"));
			document.attachEvent("onmousemove", new Function("tf_doubleCloseMouseMove('" + tf_id + "', event)"));
			document.attachEvent("onmouseup", new Function("tf_doubleCloseMouseUp('" + tf_id + "', event)"));
		} else {
			document.addEventListener("mousedown", new Function("event", "tf_doubleCloseMouseDown('" + tf_id + "', event)"), false);
			document.addEventListener("mousemove", new Function("event", "tf_doubleCloseMouseMove('" + tf_id + "', event)"), false);
			document.addEventListener("mouseup", new Function("event", "tf_doubleCloseMouseUp('" + tf_id + "', event)"), false);
		}
	}
} catch(tf_exception) {
	if(document.location.protocol == "file:" || document.location.hostname.toLowerCase().indexOf("tribalfusion") != -1) {
		if(typeof(tf_exception) == "string") {
			if(tf_exception.indexOf(" ") == -1) {
			alert(tf_exception +  " variable not defined.");
			} else {
				alert(tf_exception);
			}
		} else {
			alert(tf_exception.message);
		}
	}
} finally {
//Clean up
	var tf_doubleAutoCollapse = undefined;
	var tf_extraFlashVarsCollapsed = undefined;
	var tf_extraFlashVarsExpanded = undefined;
	var tf_hidden_doubleExpandDelay = undefined;
	var tf_hidden_doubleCollapseDelay = undefined;
	var tf_use_flash_wrapper = undefined;
	var tf_doublePreloaded = undefined;
	var tf_salignCollapsed = undefined;
	var tf_salignExpanded = undefined;
	var tf_bgcolorCollapsed = undefined;
	var tf_bgcolorExpanded = undefined;
	var tf_wmodeCollapsed = undefined;
	var tf_wmodeExpanded = undefined;
	var tf_hidden_reLoadByPlay = undefined;
	var tf_doubleExpandImprintPixel = undefined;
	var tf_doubleExpandAllowFullScreen = undefined;
	var tf_fileClose = undefined;
	var tf_leftClose = undefined;
	var tf_topClose = undefined;
	var tf_heightClose = undefined;
	var tf_widthClose = undefined;
	var tf_doubleEditMode = undefined;
	var tf_doubleCloseButtonShowDelay = undefined;
}