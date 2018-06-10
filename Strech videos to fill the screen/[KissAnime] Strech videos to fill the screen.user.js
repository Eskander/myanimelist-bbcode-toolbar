// ==UserScript==
// @name         [KissAnime] Strech videos to fill the screen
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.8
// @description  Watch old anime in full screen 16:9 aspect ratio.
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/Anime/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {

    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if (state == true) {
        
        $('#my_video_1_html5_api').css('object-fit', 'fill');
        
    } else {
        
        $('#my_video_1_html5_api').css('object-fit', 'contain');
        
    }
});
