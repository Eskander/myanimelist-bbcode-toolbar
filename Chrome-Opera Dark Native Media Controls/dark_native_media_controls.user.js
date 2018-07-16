// ==UserScript==
// @name         [Chrome] Dark HTML5 Video Controls
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.1
// @description  Fix the ugly white controls in default chrome html5 video player.
// @author       Skqnder
// @license 	 MIT
// @include      *
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at       document-start
// @compatible   chrome
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    $("<style type='text/css'> video::-webkit-media-controls { filter: grayscale(1) brightness(0.9) invert(1); opacity: 0.8; } </style>").appendTo("head");

})();
