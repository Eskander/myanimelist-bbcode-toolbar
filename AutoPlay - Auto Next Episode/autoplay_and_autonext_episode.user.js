// ==UserScript==
// @name         [KissAnime] AutoPlay Next Episode
// @namespace    kissanime
// @version      0.0
// @description  Autoplays next episode automatically.
// @author       Skqnder
// @match        *://kissanime.ru/Anime/*/*
// @compatible   firefox
// @compatible   chrome
// @grant        none
// ==/UserScript==

$('#my_video_1_html5_api').on('ended', function (e) {
     $('#btnNext').click();
});
