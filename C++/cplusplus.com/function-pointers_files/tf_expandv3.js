// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var TF_requiredMajorVersion = 8;
// Minor version of Flash required
var TF_requiredMinorVersion = 0;
// Revision of Flash required
var TF_requiredRevision = 0;
// --------------------------------

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
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
	else if ( isIE && isWin && !isOpera ) {
		flashVer = TF_ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function TF_DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = TF_GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

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
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function TF_AC_GenerateobjExpand(objAttrs, params, embedAttrs)
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
  setVariableValue(tf_id, "tf_flash_objectStr", str);
  document.write(str);
}

function TF_AC_FL_RunContentExpand() {
  var ret = 
    TF_AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  TF_AC_GenerateobjExpand(ret.objAttrs, ret.params, ret.embedAttrs);
}

function TF_AC_SW_RunContentExpand(){
  var ret = 
    TF_AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  TF_AC_GenerateobjExpand(ret.objAttrs, ret.params, ret.embedAttrs);
}

function TF_AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":
        args[i+1] = TF_AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
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
        ret.objAttrs[args[i]] = args[i+1];
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
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}
//-------------------------------------------------------
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

setVariableValue(tf_id, "tf_widthCollapsed", tf_widthCollapsed);
setVariableValue(tf_id, "tf_heightCollapsed", tf_heightCollapsed);
setVariableValue(tf_id, "tf_widthExpanded", tf_widthExpanded);
setVariableValue(tf_id, "tf_heightExpanded", tf_heightExpanded);
setVariableValue(tf_id, "tf_imagefileCollapsed", tf_imagefileCollapsed);
setVariableValue(tf_id, "tf_imagefileExpanded", tf_imagefileExpanded);

if(typeof(tf_autoCollapse) != "undefined") {
	setVariableValue(tf_id, "tf_autoCollapse", tf_autoCollapse);
} else {
	setVariableValue(tf_id, "tf_autoCollapse", false);
}

var flashId = "TFExpandFlash" + tf_id;
var divStaticId = "TFExpandFixedDiv" + tf_id;
var divDynamicId = "TFExpandExpandedDiv" + tf_id;
var dummyIFrameId = "TFExpandDummyIFrame" + tf_id;

setVariableValue(tf_id, "tf_collapsedx", 0);
setVariableValue(tf_id, "tf_collapsedy", 0);
setVariableValue(tf_id, "flashId", flashId);
setVariableValue(tf_id, "divStaticId", divStaticId);
setVariableValue(tf_id, "divDynamicId", divDynamicId);
setVariableValue(tf_id, "dummyIFrameId", dummyIFrameId);
setVariableValue(tf_id, "tf_isCollapsed", true);
setVariableValue(tf_id, "tf_isInitialized", false);
setVariableValue(tf_id, "tf_isLoaded", false);
setVariableValue(tf_id, "tf_isMouseIn", false);

//Hidden Variables
if(typeof(tf_hidden_doCheckInit) != "undefined" && tf_hidden_doCheckInit == true) {
	setVariableValue(tf_id, "tf_hidden_doCheckInit", tf_hidden_doCheckInit);
	setVariableValue(tf_id, "tf_hidden_collapsedx", tf_hidden_collapsedx);
	setVariableValue(tf_id, "tf_hidden_collapsedy", tf_hidden_collapsedy);
	setVariableValue(tf_id, "tf_hidden_preLoad", tf_hidden_preLoad);
} else {
	setVariableValue(tf_id, "tf_hidden_doCheckInit", false);
}

if(typeof(tf_hidden_singleExpandDelay) != "undefined") {
	setVariableValue(tf_id, "tf_hidden_singleExpandDelay", tf_hidden_singleExpandDelay);
} else {
	setVariableValue(tf_id, "tf_hidden_singleExpandDelay", 500);
}

if(typeof(tf_hidden_autoCollapseDelay) != "undefined") {
	setVariableValue(tf_id, "tf_hidden_autoCollapseDelay", tf_hidden_autoCollapseDelay);
} else {
	setVariableValue(tf_id, "tf_hidden_autoCollapseDelay", 500);
}

if(typeof(tf_peelOffAd) != "undefined") {
	setVariableValue(tf_id, "tf_peelOffAd", tf_peelOffAd);
} else {
	setVariableValue(tf_id, "tf_peelOffAd", false);
}

if(typeof(tf_peelOffViewPixel) != "undefined") {
	setVariableValue(tf_id, "tf_peelOffViewPixel", tf_peelOffViewPixel);
} else {
	setVariableValue(tf_id, "tf_peelOffViewPixel", "");
}

if(typeof(tf_expandImprintPixel) != "undefined") {
	setVariableValue(tf_id, "tf_expandImprintPixel", tf_expandImprintPixel);
} else {
	setVariableValue(tf_id, "tf_expandImprintPixel", "");
}

if(typeof(tf_hidden_reLoadByPlay) != "undefined") {
	setVariableValue(tf_id, "tf_hidden_reLoadByPlay", tf_hidden_reLoadByPlay);
} else {
	setVariableValue(tf_id, "tf_hidden_reLoadByPlay", 1);
}

var POSITION = {TOP: -1, LEFT: -1, CENTER: 0, RIGHT: 1, BOTTOM: 1};

function tf_loadExpand2(id) {
	if(getVariableValue(id, "tf_isLoaded") == true) {
		return;
	}

	setVariableValue(id, "tf_isLoaded", true);
	var div_staticElement = document.getElementById(getVariableValue(id, "divStaticId"));
	var div_dynamicElement = document.getElementById(getVariableValue(id, "divDynamicId"));
	var dummy_IFrameElement = document.getElementById(getVariableValue(id, "dummyIFrameId"));
	var tf_widthCollapsed = getVariableValue(id, "tf_widthCollapsed");
	var tf_heightCollapsed = getVariableValue(id, "tf_heightCollapsed");
	var tf_widthExpanded = getVariableValue(id, "tf_widthExpanded");
	var tf_heightExpanded = getVariableValue(id, "tf_heightExpanded");
	setVariableValue(id, "div_staticElement", div_staticElement);
	setVariableValue(id, "div_dynamicElement", div_dynamicElement);
	setVariableValue(id, "dummy_IFrameElement", dummy_IFrameElement);

	if(getVariableValue(id, "tf_peelOffAd") == true) {
		div_staticElement.style.position = "absolute";
		div_staticElement.style.top = "0px";
		div_staticElement.style.right = "0px";
		if(div_staticElement.parentNide != document.body) {
			document.body.appendChild(div_staticElement);
		}
	}

	if (TF_hasRightVersionExpand) {
		setVariableValue(id, "flash_object", tf_thisMovie(getVariableValue(id, "flashId")));
		if(getVariableValue(id, "tf_autoCollapse") == true) {
			getVariableValue(id, "div_dynamicElement").onmouseout = function() {
				setVariableValue(id, "tf_isMouseIn", false);
				window.setTimeout("if(getVariableValue('" + id + "', 'tf_isCollapsed') == false && getVariableValue('" + id + "', 'tf_isMouseIn') == false) {tf_collapse3('" + id + "', true);}", getVariableValue(id, "tf_hidden_autoCollapseDelay"));
			}
			div_dynamicElement.onmouseover = function() {
				setVariableValue(id, "tf_isMouseIn", true);
			}
		}
	} else {
		var tf_imagefileCollapsed = getVariableValue(id, "tf_imagefileCollapsed");
		var tf_imagefileExpanded = getVariableValue(id, "tf_imagefileExpanded");
		var link = document.createElement("a");
		link.target = "_blank";
		link.href = tf_clickTag;
		div_dynamicElement.appendChild(link);

		var backupCollapsedElement = document.createElement("img");
		backupCollapsedElement.border = 0;
		backupCollapsedElement.src = tf_imagefileCollapsed;
		backupCollapsedElement.style.width = tf_widthCollapsed + "px";
		backupCollapsedElement.style.height = tf_heightCollapsed + "px";
		backupCollapsedElement.style.position = "relative";
		backupCollapsedElement.style.cursor = "pointer";
		link.appendChild(backupCollapsedElement);

		var backupExpandedElement = document.createElement("img");
		backupExpandedElement.border = 0;
		backupExpandedElement.src = tf_imagefileExpanded;
		backupExpandedElement.style.width = tf_widthExpanded + "px";
		backupExpandedElement.style.height = tf_heightExpanded + "px";
		backupExpandedElement.style.position = "absolute";
		backupExpandedElement.style.display = "none";
		backupExpandedElement.style.left = "0px";
		backupExpandedElement.style.top = "0px";
		link.appendChild(backupExpandedElement);

		backupCollapsedElement.onmouseover = function() {
			setVariableValue(id, "tf_isMouseIn", true);
			setVariableValue(id, "collapsedtimeout", window.setTimeout("tf_expand3('" + id + "')", getVariableValue(id, "tf_hidden_singleExpandDelay")));
		};

		backupCollapsedElement.onmouseout = function() {
			window.clearTimeout(getVariableValue(id, "collapsedtimeout"));
			setVariableValue(id, "tf_isMouseIn", false);
		};

		backupExpandedElement.onmouseover = function() {
			setVariableValue(id, "tf_isMouseIn", true);
			window.clearTimeout(getVariableValue(id, "expandedtimeout"));
		};

		backupExpandedElement.onmouseout = function() {
			setVariableValue(id, "tf_isMouseIn", false);
			setVariableValue(id, "expandedtimeout", window.setTimeout("tf_collapse3('" + id + "')", getVariableValue(id, "tf_hidden_autoCollapseDelay")));
		};
		setVariableValue(id, "backupCollapsedElement", backupCollapsedElement);
		setVariableValue(id, "backupExpandedElement", backupExpandedElement);
	}

	if(getVariableValue(id, "tf_hidden_doCheckInit") == true) {
		tf_initExpand2(id, 
			getVariableValue(id, "tf_hidden_collapsedx"), 
			getVariableValue(id, "tf_hidden_collapsedy"), 
			getVariableValue(id, "tf_hidden_preLoad"));
	}
}

var tf_new_load = new Function("tf_loadExpand2('" + tf_id + "');")

if (window.attachEvent) {
	window.attachEvent("onload", tf_new_load);
} else {
	window.addEventListener("load", tf_new_load, false);
}

function tf_initExpand2(id, collapsedx, collapsedy, preLoad) {
	if(getVariableValue(id, "tf_isInitialized") == true) {
		return;
	}
	setVariableValue(id, "tf_isInitialized", true);
	if(TF_hasRightVersionExpand) {
		if(typeof(collapsedx) == "undefined") {
			collapsedx = 0;
		}
		if(typeof(collapsedy) == "undefined") {
			collapsedy = 0;
		}
		var tf_collapsedx = Number(collapsedx);
		var tf_collapsedy = Number(collapsedy);
		setVariableValue(id, "tf_collapsedx", tf_collapsedx);
		setVariableValue(id, "tf_collapsedy", tf_collapsedy);
		if(getVariableValue(id, "tf_isLoaded") == false) {
			tf_loadExpand2(id);
			div_dynamicElement = getVariableValue(id, "div_dynamicElement");
		}
		var div_dynamicElement = getVariableValue(id, "div_dynamicElement");
		var tf_widthExpanded = getVariableValue(id, "tf_widthExpanded");
		var tf_heightExpanded = getVariableValue(id, "tf_heightExpanded");
		var tf_widthCollapsed = getVariableValue(id, "tf_widthCollapsed");
		var tf_heightCollapsed = getVariableValue(id, "tf_heightCollapsed");
		div_dynamicElement.style.width = Number(tf_widthCollapsed + tf_collapsedx) + "px";
		div_dynamicElement.style.height = Number(tf_heightCollapsed + tf_collapsedy) + "px";
		div_dynamicElement.style.left = -1 * tf_collapsedx + "px";
		div_dynamicElement.style.top = -1 * tf_collapsedy + "px";
		var dummy_IFrameElement = getVariableValue(id, "dummy_IFrameElement");
		if(dummy_IFrameElement) {
			dummy_IFrameElement.style.left = -1 * tf_collapsedx + "px";
			dummy_IFrameElement.style.top = -1 * tf_collapsedy + "px";
		}

		div_dynamicElement.style.clip = "rect(" + tf_collapsedy + "px " + tf_widthExpanded + "px " + tf_heightExpanded + "px " + tf_collapsedx + "px)";
	}

	if(typeof(preLoad) != "undefined" && preLoad == true) {
		tf_expand3(id);
	}
}

function tf_expand3(id){
	if (!TF_hasRightVersionExpand) {
		if(getVariableValue(id, "tf_isMouseIn") == false) {
			return;
		}
	}

	if(getVariableValue(id, "tf_peelOffAd") == true) {
		if(typeof(getVariableValue(id, "firstTime")) == "undefined") {
			setVariableValue(id, "firstTime", true);
			var viewPixel = getVariableValue(id, "tf_peelOffViewPixel");
			if(viewPixel != "") {
				var img = new Image();
				img.src = viewPixel;
			}
		}
	}

	var imprintPixel = getVariableValue(id, "tf_expandImprintPixel");
	if(imprintPixel != "") {
		var img = new Image();
		img.src = imprintPixel;
	}

	var div_staticElement = document.getElementById(getVariableValue(id, "divStaticId"));
	div_staticElement.style.zIndex = 2147483647;
	var tf_collapsedx = getVariableValue(id, "tf_collapsedx");
	var tf_collapsedy = getVariableValue(id, "tf_collapsedy");
	var div_dynamicElement = getVariableValue(id, "div_dynamicElement");
	var tf_widthExpanded = getVariableValue(id, "tf_widthExpanded");
	var tf_heightExpanded = getVariableValue(id, "tf_heightExpanded");
	var tf_widthCollapsed = getVariableValue(id, "tf_widthCollapsed");
	var tf_heightCollapsed = getVariableValue(id, "tf_heightCollapsed");
	var dummy_IFrameElement = getVariableValue(id, "dummy_IFrameElement");
	setVariableValue(id, "tf_isCollapsed", false);
	div_dynamicElement.style.width = tf_widthExpanded + "px";
	div_dynamicElement.style.height = tf_heightExpanded + "px";

	if (TF_hasRightVersionExpand) {
		div_dynamicElement.style.clip = "rect(0px " + tf_widthExpanded + "px " + tf_heightExpanded + "px 0px)";
	} else {
		var position;
		position = tf_getPositionExpand(div_dynamicElement, tf_widthCollapsed, tf_heightCollapsed);

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

		if(dummy_IFrameElement) {
			dummy_IFrameElement.style.left = (-1) * tf_collapsedx + "px";
			dummy_IFrameElement.style.top = (-1) * tf_collapsedy + "px";
		}
		getVariableValue(id, "backupExpandedElement").style.display = "";
		getVariableValue(id, "backupCollapsedElement").style.display = "none";
		div_dynamicElement.style.left = (-1) * tf_collapsedx + "px";
		div_dynamicElement.style.top = (-1) * tf_collapsedy + "px";
	}
	if(dummy_IFrameElement) {
			dummy_IFrameElement.style.display = "";
	}
}

function tf_collapse3(id, doReload) {
	var tf_collapsedx = getVariableValue(id, "tf_collapsedx");
	var tf_collapsedy = getVariableValue(id, "tf_collapsedy");
	var div_dynamicElement = getVariableValue(id, "div_dynamicElement");
	var tf_widthExpanded = getVariableValue(id, "tf_widthExpanded");
	var tf_heightExpanded = getVariableValue(id, "tf_heightExpanded");
	var tf_widthCollapsed = getVariableValue(id, "tf_widthCollapsed");
	var tf_heightCollapsed = getVariableValue(id, "tf_heightCollapsed");
	var dummy_IFrameElement = getVariableValue(id, "dummy_IFrameElement");
	var flash_object = getVariableValue(id, "flash_object");
	var div_staticElement = document.getElementById(getVariableValue(id, "divStaticId"));
	div_staticElement.style.zIndex = 0;
	if(getVariableValue(id, "tf_isCollapsed") == true) {
		return;
	}
	setVariableValue(id, "tf_isCollapsed", true);
	if (TF_hasRightVersionExpand) {
		div_dynamicElement.style.width = Number(tf_widthCollapsed + tf_collapsedx) + "px";
		div_dynamicElement.style.height = Number(tf_heightCollapsed + tf_collapsedy) + "px";
		div_dynamicElement.style.clip = "rect(" + tf_collapsedy + "px " + tf_widthExpanded + "px " + tf_heightExpanded + "px " + tf_collapsedx + "px)";
		if (typeof(doReload) != "undefined" && doReload == true) {
			if(getVariableValue(id, "tf_hidden_reLoadByPlay") == 1) {
				div_dynamicElement.innerHTML = getVariableValue(id, "tf_flash_objectStr");
			} else {
				try {
					flash_object.GotoFrame(1);
					flash_object.Play();
				} catch (e) {
				}
			}
		}
	} else {
		getVariableValue(id, "backupCollapsedElement").style.display = "";
		getVariableValue(id, "backupExpandedElement").style.display = "none";
		div_dynamicElement.style.left = "0px";
		div_dynamicElement.style.top = "0px";
		div_dynamicElement.style.width = tf_widthCollapsed + "px";
		div_dynamicElement.style.height = tf_heightCollapsed + "px";
	}

	if(dummy_IFrameElement) {
			dummy_IFrameElement.style.display = "none";
	}
}

function tf_thisMovie(movieName) {
	if (isIE) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

function tf_getPositionExpand(el, widthCollapsed, heightCollapsed) {
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
	var leftSpace = elementx;
	var rightSpace = screenWidth - elementx - widthCollapsed;
	var topSpace = elementy;
	var bottomSpace = screenHeight - elementy - heightCollapsed;
	if (rightSpace >= leftSpace) {
		positionx = POSITION.LEFT;
	} else {
		positionx = POSITION.RIGHT;
	}

	if (bottomSpace >= topSpace) {
		positiony = POSITION.TOP;
	} else {
		positiony = POSITION.BOTTOM;
	}

	return {x: positionx, y: positiony};
}

function TF_GetFlashVarsExpand3(extraVars) {
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
	flashVars += "&tf_flashLoaded=tf_initExpand2";
	flashVars += "&tf_show=tf_expand3";
	flashVars += "&tf_close=tf_collapse3";

	if(typeof(extraVars) == "object") {
		for(i in extraVars) {
			flashVars += "&" + i + "=" + escape(extraVars[i]);
		}
	} else if(typeof(extraVars) == "string") {
		flashVars += "&" + extraVars;
	}
	return flashVars;
}

var tf_flashVars = "";
if(typeof(tf_extraFlashVars) != "undefined") {
	tf_flashVars = TF_GetFlashVarsExpand3(tf_extraFlashVars);
} else {
	tf_flashVars = TF_GetFlashVarsExpand3();
}

if(typeof(tf_allowScriptAccessExpanded) == "undefined") {
	tf_allowScriptAccessExpanded = "always";
}

if(typeof(tf_salign) == "undefined") {
	tf_salign = "lt";
}

if(typeof(tf_bgcolor) == "undefined") {
	tf_bgcolor = "#ffffff";
}

if(typeof(tf_wmodeExpanded) == "undefined") {
	tf_wmodeExpanded = "transparent";
}

var TF_hasRightVersionExpand = false;
TF_hasRightVersionExpand = TF_DetectFlashVer(TF_requiredMajorVersion, TF_requiredMinorVersion, TF_requiredRevision);
if(!TF_hasRightVersionExpand) {
	tf_widthExpanded = tf_imageWidthExpanded;
	tf_heightExpanded = tf_imageHeightExpanded;
	setVariableValue(tf_id, "tf_widthExpanded", tf_widthExpanded);
	setVariableValue(tf_id, "tf_heightExpanded", tf_heightExpanded);
}

document.write("<div id='" + divStaticId + "' style='width:" + tf_widthCollapsed + "px;height:" + tf_heightCollapsed + "px;position:relative;z-index:0;padding:0px;'>");
document.write("<!--[if lt IE 7]><IFRAME id='" + dummyIFrameId + "' style='border:none;display: none; left: 0px; position: absolute; top: 0px;z-index:0;filter:alpha(opacity=0);' src='javascript:false;' frameBorder='0' scrolling='no' width='" + tf_widthExpanded + "px' height='" + tf_heightExpanded + "px' hSpace = '0' vSpace = '0' marginHeight = '0' marginWidth = '0'></IFRAME><![endif]-->");
document.write("<div id='" + divDynamicId + "' style='z-index:1;position:absolute;overflow:hidden;width:" + tf_widthCollapsed + "px;"+ "height:" + tf_heightCollapsed + "px;padding:0px;");

document.write("'>");
if (TF_hasRightVersionExpand) {
	TF_AC_FL_RunContentExpand(
			"codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
			"width", tf_widthExpanded,
			"height", tf_heightExpanded,
			"quality", "high",
			"pluginspage", "http://www.macromedia.com/go/getflashplayer",
			"align", "",
			"play", "true",
			"loop", "true",
			"scale", "noscale",
			"wmode", tf_wmodeExpanded,
			"devicefont", "false",
			"id", flashId,
			"bgcolor", tf_bgcolor,
			"name", flashId,
			"menu", "false",
			"allowFullScreen", "false",
			"allowScriptAccess", tf_allowScriptAccessExpanded,
			"movie", tf_flashfile,
			"salign", tf_salign,
			"flashVars", tf_flashVars
		);
	//end AC code
} else {

}
document.write("</div>");
document.write("</div>");

//Clean up
var tf_extraFlashVars = undefined;
var tf_autoCollapse = undefined;
var tf_hidden_doCheckInit = undefined;
var tf_hidden_singleExpandDelay = undefined;
var tf_hidden_autoCollapseDelay = undefined;
var tf_allowScriptAccessExpanded = undefined;
var tf_salign = undefined;
var tf_bgcolor = undefined;
var tf_wmodeExpanded = undefined;
var tf_peelOffAd = undefined;
var tf_hidden_reLoadByPlay = undefined;
var tf_peelOffViewPixel = undefined;
var tf_expandImprintPixel = undefined;