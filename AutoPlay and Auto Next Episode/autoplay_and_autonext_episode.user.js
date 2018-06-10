// ==UserScript==
// @name         [KissAnime] AutoPlay Next Episode
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.3
// @description  Autoplays next episode automatically.
// @author       Skqnder
// @match        *://kissanime.ru/Anime/*/*
// @compatible   firefox
// @compatible   chrome
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

$(document).ready(function () {
    var NxtPlay = GM_getValue('NxtPlay', 0);
    if (NxtPlay == 1) {
        var check = 'checked';
    } else {
        var check = '';
    }

    $('.barContent').after('<br><input type="checkbox" id="NxtPlay" ' + check + ' > AutoPlay next episode <br>');
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
        if (NxtPlay == 1) {
            $('#btnNext').click();
        }
    });
})();
