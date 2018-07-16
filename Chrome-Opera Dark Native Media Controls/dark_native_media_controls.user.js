// ==UserScript==
// @name         [Chrome][Opera] Dark HTML5 Video Controls
// @namespace    https://greasyfork.org/users/152412
// @version      0.5
// @description  Fix the ugly white controls in default Chrome & Opera HTML5 Video Player.
// @author       Skqnder
// @license 	 MIT
// @include      *
// @run-at       document-start
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // I don't really know why I was using jQuery for a couple of lines of code. Talk about bad habits..
    var controls = "video::-webkit-media-controls { filter: brightness(0.9) invert(1) grayscale(1) !important; opacity: 0.8 !important; }";
    var style = document.createElement('style');
    style.setAttribute('type','text/css');
    style.appendChild(document.createTextNode(controls));
    document.getElementsByTagName('head')[0].appendChild(style);
})();
