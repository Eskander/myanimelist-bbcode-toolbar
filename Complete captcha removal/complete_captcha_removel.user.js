// ==UserScript==
// @name         [KissAnime] Complete captcha removal
// @namespace    https://greasyfork.org/users/152412
// @version      0.1
// @description  Always use Rapidvideo and never encounter captchas again.
// @author       Skqnder
// @license 	 MIT
// @match        *://kissanime.ru/*
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    //search and destroy
    var link = document.getElementsByTagName('a');
    for (var i = 0; i < link.length; i++) {
        var current = link[i].href;
        if (current.includes("Anime") && current.includes("Episode-") && !(current.includes("&s="))) {
            link[i].href+="&s=rapidvideo";
        }
    }
    //Just in case..
    if (/SKIP THIS/i.test (document.body.innerHTML)){
        document.querySelector('form#formVerify .specialButton').click();
    }
})();
