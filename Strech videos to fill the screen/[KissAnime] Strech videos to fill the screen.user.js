
// ==UserScript==
// @name         [KissAnime] Strech videos to fill the screen
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.9
// @description  Watch old anime in full screen 16:9 aspect ratio.
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/Anime/*/*
// @match        *://openload.co/embed/*/*
// @match        *://www.rapidvideo.com/e/*
// @match        *://streamango.com/embed/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {

    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if (state === true) {

        $('#olvideo_html5_api').css('object-fit', 'fill');
        $('#videojs_html5_api').css('object-fit', 'fill');
        $('#mgvideo_html5_api').css('object-fit', 'fill');
        $('#my_video_1_html5_api').css('object-fit', 'fill');

    } else {

        $('#olvideo_html5_api').css('object-fit', 'contain');
        $('#videojs_html5_api').css('object-fit', 'contain');
        $('#mgvideo_html5_api').css('object-fit', 'contain');
        $('#my_video_1_html5_api').css('object-fit', 'contain');

    }
});
