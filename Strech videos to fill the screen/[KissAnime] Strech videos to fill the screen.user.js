// ==UserScript==
// @name         KissAnime Strech videos to fill the screen
// @namespace    kissanime.ru
// @version      0.1
// @description  Watch old animes prior to 2010 in 16:9 aspect ratio.
// @author       Skqnder
// @match        *://kissanime.ru/Anime/*/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    $('#my_video_1_html5_api').css('object-fit', 'fill');
});
