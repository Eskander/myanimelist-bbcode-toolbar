// ==UserScript==
// @name         [KissAnime] Auto Next Episode
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.7
// @description  Automatically move to the next episode.
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/Anime/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

$(document).ready(function () {

    var NxtPlay = GM_getValue('NxtPlay', 1);
    var check = ''

    if (NxtPlay === 1) {
        check = 'checked';
    } else {
        check = '';
    }

    $('.barContent').after('<br><input type="checkbox" id="NxtPlay" ' + check + ' > Auto next episode <br>');

    $('#NxtPlay').change(function () {
        if ($('#NxtPlay').is(":checked")) {
            NxtPlay = 1;
            GM_setValue('NxtPlay', 1);
        } else {
            NxtPlay = 0;
            GM_setValue('NxtPlay', 0);
        }
    });

    $('#my_video_1_html5_api').on('ended', function (e) {
        if (NxtPlay === 1) {
            $('#btnNext').click();
        }
    });
    
})();
