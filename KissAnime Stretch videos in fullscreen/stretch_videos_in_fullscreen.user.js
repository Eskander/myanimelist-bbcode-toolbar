// ==UserScript==
// @name         [KissAnime] Stretch videos in fullscreen
// @namespace    https://github.com/eskander
// @version      discontinued
// @description  Watch old anime in full screen 16:9 aspect ratio. (all servers)
// @author       eskander
// @license      MIT
// @match        *://kissanime.ru/Anime/*/*
// @match        *://openload.co/embed/*/*
// @match        *://www.rapidvideo.com/e/*
// @match        *://streamango.com/embed/*/*
// @icon         https://www.google.com/s2/favicons?domain=kissanime.ru
// @homepage     https://github.com/eskander/userscripts-collection
// @supportURL   https://github.com/eskander/userscripts-collection/issues
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

'use strict';

document.addEventListener('webkitfullscreenchange', function(e) {
    check();
}, false);

document.addEventListener('mozfullscreenchange', function(e) {
    check();
}, false);

document.addEventListener('fullscreenchange', function(e) {
    check();
}, false);


function check () {
    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (state === true) {
        fitvideo('olvideo_html5_api');
        fitvideo('videojs_html5_api');
        fitvideo('mgvideo_html5_api');
        fitvideo('my_video_1_html5_api');
    } else {
        containvideo('olvideo_html5_api');
        containvideo('videojs_html5_api');
        containvideo('mgvideo_html5_api');
        containvideo('my_video_1_html5_api');
    }
}

function fitvideo(a) {
  var x = document.getElementById(a);
  if(typeof x !== 'undefined' && x !== null) {
    x.style.cssText = 'object-fit: fill';
  }
}

function containvideo(a) {
  var x = document.getElementById(a);
  if(typeof x !== 'undefined' && x !== null) {
    x.style.cssText = 'object-fit: fit';
  }
}
