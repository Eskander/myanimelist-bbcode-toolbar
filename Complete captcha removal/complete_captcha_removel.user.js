// ==UserScript==
// @name         [KissAnime] Complete captcha removal
// @namespace    https://greasyfork.org/users/152412
// @version      0.2
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
        if (current.includes("Anime") && current.includes("?id=") && !(current.includes("&s="))) {
            link[i].href+="&s=rapidvideo";
        }
    }
    if (document.getElementById("selectEpisode") !== null) {
        var option = document.getElementById("selectEpisode").getElementsByTagName("option");
        for (var j = 0; j < option.length; j++) {
            option[j].value+="&s=rapidvideo";
        }
    }
    //Just in case..
    if (/SKIP THIS/i.test (document.body.innerHTML)){
        document.querySelector('form#formVerify .specialButton').click();
        document.getElementById("formVerify").style.visibility = "hidden";
    }
})();
