// ==UserScript==
// @name         [MyAnimeList] Advanced BBCode Editor
// @namespace    https://github.com/skqnder
// @version      0.4-alpha
// @description  Advanced BBCode Editor for MyAnimeList.net
// @author       eskander
// @license      MIT

// @include      *://myanimelist.net/mymessages*
// @include      *://myanimelist.net/editprofile*
// @include      *://myanimelist.net/myblog*
// @include      *://myanimelist.net/clubs*
// @include      *://myanimelist.net/profile*
// @include      *://myanimelist.net/editprofile
// @include      *://myanimelist.net/comtocom*
// @include      *://myanimelist.net/comments*
// @include      *://myanimelist.net/editlist*
// @include      *://myanimelist.net/panel*
// @include      *://myanimelist.net/people*
// @include      *://myanimelist.net/myfriends*
// @include      *://myanimelist.net/blog*

// @exclude      *://myanimelist.net/forum*
// @exclude      *://myanimelist.net/editprofile.php?go=stylepref&do=cssadv&id=*

// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/sceditor.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/icons/monocons.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/formats/bbcode.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/plugins/autosave.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/plugins/autoyoutube.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/plugins/plaintext.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/plugins/undo.js
// @require      https://cdn.rawgit.com/skqnder/userscripts-collection/eab22971ff8dc64d19727b083751f2bc9df71b54/MyAnimeList%20Advanced%20BBCode%20Editor/plugins/alternative-lists.js

// @icon         https://www.google.com/s2/favicons?domain=myanimelist.net
// @homepage     https://github.com/skqnder/userscripts-collection
// @supportURL   https://github.com/skqnder/userscripts-collection/issues
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @compatible   opera Tested with Tampermonkey Beta
// @grant        none
// ==/UserScript==

'use strict';

(function() {

    $("head").append ('<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/themes/square.min.css" >');

    sceditor.command.set('date', {
        exec: function () {
            function _date(editor) {
                var	now = new Date(),
                    year = now.getYear(),
                    month = now.getMonth() + 1,
                    day = now.getDate();

                if (year < 2000) {
                    year = 1900 + year;
                }

                if (month < 10) {
                    month = '0' + month;
                }

                if (day < 10) {
                    day = '0' + day;
                }

                var mm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                month = mm[month - 1];

                return editor.opts.dateFormat
                    .replace(/year/i, year)
                    .replace(/month/i, month)
                    .replace(/day/i, day);
            }
            this.insertText(_date(this));
        },
        txtExec: function () {
            this.insertText(_date(this));
        },
        tooltip: 'Insert current date'
    },);

    sceditor.command.set('time', {
        exec: function () {
            function _time() {
                var	now = new Date(),
                    hours = now.getHours(),
                    mins = now.getMinutes(),
                    suf = ' AM';

                if (hours > 12) {
                    hours = hours-12;
                    suf = ' PM';
                }

                if (hours < 10) {
                    hours = '0' + hours;
                }

                if (mins < 10) {
                    mins = '0' + mins;
                }

                return hours + ':' + mins + suf;
            }
            this.insertText(_time());
        },
        txtExec: function () {
            this.insertText(_time());
        },
        tooltip: 'Insert current time'
    },);

    for (var i = 0; i < $('.textarea').length; i++) {
        var textarea = $('.textarea')[i];
        sceditor.create(textarea, {
            format: 'bbcode',
            icons: 'monocons',
            dateFormat: 'month day, year',
            style: '//cdnjs.cloudflare.com/ajax/libs/sceditor/2.1.3/themes/content/default.min.css',
            plugins: 'autosave,autoyoutube,plaintext,undo,alternative-lists',
            toolbar: 'source|bold,italic,underline,strike|center,right|color,removeformat|bulletlist,orderedlist|code,quote,image,youtube|link,unlink|date,time|print,maximize',
            //toolbar: 'source|bold,italic,underline,strike|left,center,right|size,color,removeformat|bulletlist,orderedlist|code,quote,image,youtube|link,unlink|date,time|print,maximize',
            emoticonsEnabled: false,
            autoExpand: true,
            enablePasteFiltering: true,
            autosave: {
                storageKey: 'sce-autodraft-' + i.toString() + location.pathname + location.search,
                expires: 180000
            },
        });
    }

})();
