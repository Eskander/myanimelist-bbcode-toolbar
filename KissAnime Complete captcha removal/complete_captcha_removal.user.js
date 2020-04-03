// ==UserScript==
// @name         [KissAnime] Complete captcha removal (Discontinued)
// @namespace    https://github.com/eskander
// @version      2020-04-03-null
// @description  Always use HydraX and never encounter captchas again. (No longer works/Unfixable)
// @author       eskander
// @license      MIT
// @match        *://kissanime.ru/*
// @icon         https://www.google.com/s2/favicons?domain=kissanime.ru
// @homepage     https://github.com/eskander/userscripts-collection
// @supportURL   https://github.com/eskander/userscripts-collection/issues
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

'use strict';

(function() {
    //search and destroy
    var link = document.getElementsByTagName('a');
    for (var i = 0; i < link.length; i++) {
        var current = link[i].href;
        if (current.includes("Anime") && current.includes("?id=") && !(current.includes("&s="))) {
            link[i].href+="&s=hydrax";
        }
    }
    if (document.getElementById("selectEpisode") !== null) {
        var option = document.getElementById("selectEpisode").getElementsByTagName("option");
        for (var j = 0; j < option.length; j++) {
            option[j].value+="&s=hydrax";
        }
    }
    //Just in case..
    if (/SKIP THIS \(HydraX\)/i.test(document.body.innerHTML)){
        document.getElementsByClassName('specialButton')[0].click();
    }
})();
