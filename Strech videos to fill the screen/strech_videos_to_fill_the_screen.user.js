// ==UserScript==
// @name         [KissAnime] Strech videos to fill the screen
// @namespace    https://greasyfork.org/users/152412
// @version      0.11
// @description  Watch old anime in full screen 16:9 aspect ratio. (all servers)
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/Anime/*/*
// @match        *://openload.co/embed/*/*
// @match        *://www.rapidvideo.com/e/*
// @match        *://streamango.com/embed/*/*
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

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