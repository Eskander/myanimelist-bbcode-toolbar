// ==UserScript==
// @name         [KissAnime] AutoPlay & Auto Next Episode
// @namespace    https://greasyfork.org/en/users/152412
// @version      0.9
// @description  AutoPlay & Automatically move to the next episode (all servers).
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/Anime/*/*
// @match        *://openload.co/embed/*/*
// @match        *://www.rapidvideo.com/e/*
// @match        *://streamango.com/embed/*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at       document-start
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {

    'use strict';

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var nodes = mutation.addedNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeName == "VIDEO") {
                    nodes[i].setAttribute('preload', 'none');
                    nodes[i].removeAttribute('autoplay');
                }
            }
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();

$(document).ready(function () {

    'use strict';

    var NxtPlay = GM_getValue('NxtPlay', 1);
    var AutPlay = GM_getValue('AutPlay', 1);
    var check1 = '';
    var check2 = '';
    GM_setValue('EpEnded', 0);

    if (NxtPlay === 1) {
        check1 = 'checked';
    } else {
        check1 = '';
    }

    if (AutPlay === 1) {
        check2 = 'checked';
    } else {
        check2 = '';
    }

    $('.barContent').after('<input type="checkbox" id="NxtPlay" '+check1+'> <label for="NxtPlay">Auto Next Episode</label> <br>');
    $('.barContent').after('<br><input type="checkbox" id="AutPlay" '+check2+'> <label for="AutPlay">Auto Play</label> <br>');

    $('#NxtPlay').change(function () {
        if ($('#NxtPlay').is(":checked")) {
            NxtPlay = 1;
            GM_setValue('NxtPlay', 1);
        } else {
            NxtPlay = 0;
            GM_setValue('NxtPlay', 0);
        }
    });

    $('#AutPlay').change(function () {
        if ($('#AutPlay').is(":checked")) {
            AutPlay = 1;
            GM_setValue('AutPlay', 1);
        } else {
            AutPlay = 0;
            GM_setValue('AutPlay', 0);
        }
    });

    $('#olvideo_html5_api').on('ended', function (e) {
        GM_setValue('EpEnded', 1);
    });
    $('#videojs_html5_api').on('ended', function (e) {
        GM_setValue('EpEnded', 1);
    });
    $('#mgvideo_html5_api').on('ended', function (e) {
        GM_setValue('EpEnded', 1);
    });
    $('#my_video_1_html5_api').on('ended', function (e) {
        GM_setValue('EpEnded', 1);
    });

    setInterval(function(){
        var EpEnded = GM_getValue('EpEnded', 0);
        if( EpEnded === 1 ) {
            Nxt();
            GM_setValue('EpEnded', 0);
        }
    }, 1000); /* interval of video state check. */

    function Nxt() {
        if (NxtPlay === 1) {
            $('#btnNext').click();
        }
    }

    window.onload = function() {
        if (AutPlay === 1) {
            $("#videooverlay").click();
            $('.vjs-big-play-button').click();
        }
    };

})();
