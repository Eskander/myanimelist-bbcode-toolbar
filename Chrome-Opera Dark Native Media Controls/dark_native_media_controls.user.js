// ==UserScript==
// @name         [Chrome/Opera] Dark Native Media Controls
// @namespace    https://github.com/Skqnder
// @version      0.7
// @description  Fix the ugly white controls in native Chrome & Opera HTML5 Media Player. (pre-Chrome 67 Controls)
// @author       Skqnder
// @license 	 MIT
// @include      *
// @run-at       document-start
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

'use strict';

(function() {
    var transparency = 0.8 ;//Set this value between 0 and 1 to edit controls bar transparency.

    var controls = "video::-webkit-media-controls { filter: invert(1) grayscale(1) !important; opacity: "+transparency+" !important; }";
    var style = document.createElement('style');
    style.setAttribute('type','text/css');
    style.appendChild(document.createTextNode(controls));
    document.getElementsByTagName('head')[0].appendChild(style);
})();