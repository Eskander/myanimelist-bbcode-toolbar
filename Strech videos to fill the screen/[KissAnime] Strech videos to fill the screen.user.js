// ==UserScript==
// @name         KissAnime Strech videos to fill the screen
// @namespace    kissanime.ru
// @version      0.2
// @description  Watch old animes prior to 2010 in 16:9 aspect ratio.
// @author       Skqnder
// @match        *://kissanime.ru/Anime/*/*
// @compatible   firefox
// @compatible   chrome
// @grant        none
// ==/UserScript==

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)    
{
    if (!window.screenTop && !window.screenY) {
           $('#my_video_1_html5_api').css('object-fit', 'fill');
    } else {
           $('#my_video_1_html5_api').css('object-fit', 'contain');
    }
});
