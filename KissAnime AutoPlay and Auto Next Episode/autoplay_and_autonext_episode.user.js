// ==UserScript==
// @name         [KissAnime] AutoPlay & Auto Next Episode
// @namespace    https://github.com/eskander
// @version      0.16.2
// @description  AutoPlay & Automatically move to the next episode. (all servers)
// @author       eskander
// @license      MIT
// @match        *://kissanime.ru/Anime/*/*
// @match        *://openload.co/embed/*/*
// @match        *://www.rapidvideo.com/e/*
// @match        *://streamango.com/embed/*/*
// @icon         https://www.google.com/s2/favicons?domain=kissanime.ru
// @homepage     https://github.com/eskander/userscripts-collection
// @supportURL   https://github.com/eskander/userscripts-collection/issues
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @run-at       document-start
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

'use strict';

(function () {

    var config = {
        childList: true,
        subtree: true
    }

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            disableAutoplay(mutation);
        })
    })

    function disableAutoplay(mutation) {
        var nodes = mutation.addedNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName == 'VIDEO') {
                nodes[i].setAttribute('preload', 'none');
                nodes[i].removeAttribute('autoplay');
                //nodes[i].muted = true;
                //console.log('[Kiss] Video killed successfully.');
            }
        }
    }

    observer.observe(document.documentElement, config);

})()

$(document).ready(function () {

    var AutPlay = GM_getValue('AutPlay', true);
    var NxtPlay = GM_getValue('NxtPlay', true);
    GM_setValue('EpEnded', false);
    var box1 = '';
    var box2 = '';
    //console.log("[Kiss]", window.location.host, "is ready");

    if (window.location.host == "kissanime.ru") {

        /* Thanks for lolamtisch for the idea of the checkboxes */
        if (AutPlay) {
            box1 = 'checked';
        } else {
            box1 = '';
        }

        if (NxtPlay) {
            box2 = 'checked';
        } else {
            box2 = '';
        }

        var checkbox1 = '<input type="checkbox" id="AutPlay" ' + box1 + '><label for="AutPlay" title="Automatically play the video when the page loads">Auto Play</label>';
        var checkbox2 = '<input type="checkbox" id="NxtPlay" ' + box2 + '><label for="NxtPlay" title="Automatically move to the next episode at the end of the current one">Auto Next Episode</label>';

        $('.barContent').append('<br>' + checkbox1);
        $('.barContent').append('<br>' + checkbox2);

        $('#AutPlay').change(function () {
            if ($('#AutPlay').is(':checked')) {
                AutPlay = true;
                GM_setValue('AutPlay', true);
            } else {
                AutPlay = false;
                GM_setValue('AutPlay', false);
            }
            //console.log("[Kiss] Auto Next is", AutPlay);
        });

        $('#NxtPlay').change(function () {
            if ($('#NxtPlay').is(':checked')) {
                NxtPlay = true;
                GM_setValue('NxtPlay', true);
            } else {
                NxtPlay = false;
                GM_setValue('NxtPlay', false);
            }
            //console.log("[Kiss] Auto Next is", NxtPlay);
        });

        if (!$('#my_video_1_html5_api').length) {
            setInterval(function () {
                var EpEnded = GM_getValue('EpEnded', false);
                //console.log("1 sec passed.");
                if (EpEnded) {
                    GM_setValue('EpEnded', 0);
                    if (NxtPlay) {
                        $('#btnNext').click();
                        //console.log("[Kiss] Requesting next episode..");
                    }
                }
            }, 2000); /* embedded videos state check interval. */
        }

        /* Just a stupid hack to please the guys at Google's */
        if ($("#my_video_1").length && AutPlay && typeof InstallTrigger == 'undefined') {
            $("#my_video_1")[0].setAttribute("allow", "autoplay; fullscreen");
            //console.log("[Kiss] Stupid chrome detected");
            setTimeout(function () {
                $("#my_video_1")[0].src += '';
            }, 1000); /* autoplay delay in chrome. */
        }

    }

    if (window.location.host == "kissanime.ru" && $('#my_video_1_html5_api').length) {

        if (AutPlay) {
            $('.videoAdClose').remove();
            $('.vjs-big-play-button').click();
            //setTimeout(function(){$("video").prop('muted',false)},300);
        }

        $('#my_video_1_html5_api').on('ended', function (e) {
            if (NxtPlay) {
                //console.log("[Kiss] Requesting next episode..");
                $('#btnNext').click();
            }
        });

    } else if (window.location.host == "www.rapidvideo.com") {

        if (AutPlay) {
            $('.vjs-poster').remove();
            $('.vjs-text-track-display').remove();
            $('.vjs-big-play-button').click();
            //setTimeout(function(){$("video").prop('muted',false)},300);
        }

        $('#videojs_html5_api').on('ended', function (e) {
            GM_setValue('EpEnded', true);
        });

    } else if (window.location.host == "openload.co") {

        if (AutPlay) {
            $('#videooverlay').click();
            $('.vjs-poster').click();
            //setTimeout(function(){$("video").prop('muted',false)},300);
        }

        $('#olvideo_html5_api').on('ended', function (e) {
            GM_setValue('EpEnded', true);
        });

    } else if (window.location.host == "streamango.com") {

        if (AutPlay) {
            $('#videooverlay').click();
            $('.vjs-big-play-button').click();
            //setTimeout(function(){$("video").prop('muted',false)},300);
        }

        $('#mgvideo_html5_api').on('ended', function (e) {
            GM_setValue('EpEnded', true);
        });
    }

});
