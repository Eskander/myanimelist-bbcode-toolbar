// ==UserScript==
// @name         [Fedora] Revive old AskFedora URLs
// @namespace    https://github.com/eskander
// @version      0.1
// @description  Auto redirect old AskFedora links to the read-only archive.
// @author       eskander
// @license      MIT
// @icon         https://getfedora.org/static/images/favicon.ico
// @include      *://ask.fedoraproject.org/*/question/*
// @run-at       document-start
// @homepage     https://github.com/eskander/userscripts-collection
// @supportURL   https://github.com/eskander/userscripts-collection/issues
// @compatible   firefox Tested with Tampermonkey
// @grant        none
// ==/UserScript==


window.location.replace(window.location.href.replace(/ask.fedoraproject.org/, "askbot.fedoraproject.org"));
