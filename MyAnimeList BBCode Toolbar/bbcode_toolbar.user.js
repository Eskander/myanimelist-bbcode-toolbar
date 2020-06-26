// ==UserScript==
// @name         [MyAnimeList] BBCode Toolbar
// @namespace    https://github.com/eskander
// @version      2020-06-26
// @description  Advanced BBCode Editor for MyAnimeList.net
// @author       eskander
// @license      MIT

// @include      *://myanimelist.net/forum/?topicid=*
// @include      *://myanimelist.net/forum/?action=message&msgid=*
// @include      *://myanimelist.net/forum/?action=message&topic_id=*
// @include      *://myanimelist.net/mymessages.php?go=send*
// @include      *://myanimelist.net/editprofile.php*
// @include      *://myanimelist.net/myblog.php*
// @include      *://myanimelist.net/forum/?action=post*
// @include      *://myanimelist.net/forum/index.php?action=post&boardid=*
// @include      *://myanimelist.net/clubs.php?cid=*
// @include      *://myanimelist.net/profile/*
// @include      *://myanimelist.net/modules.php?go=report&type=forummessage&id=*
// @include      *://myanimelist.net/mymessages.php?toname=*
// @include      *://myanimelist.net/comtocom.php?id1=*
// @include      *://myanimelist.net/comments.php?id=*
// @include      *://myanimelist.net/editlist.php?type=anime&id=*
// @include      *://myanimelist.net/panel.php?go=editmanga&id=*
// @include      *://myanimelist.net/panel.php?go=add&selected_series_id=*
// @include      *://myanimelist.net/panel.php?go=addmanga&selected_manga_id=*
// @include      *://myanimelist.net/panel.php?go=anime_series&do=add
// @include      *://myanimelist.net/panel.php?go=mangadb&do=add
// @include      *://myanimelist.net/people.php?id=*
// @include      *://myanimelist.net/people/*
// @include      *://myanimelist.net/myfriends.php?go=add&id=*
// @include      *://myanimelist.net/blog.php?eid=*
// @include      *://myanimelist.net/forum/index.php?topicid=*
// @include      *://myanimelist.net/ownlist/anime/*
// @include      *://myanimelist.net/ownlist/manga/*

// @exclude      *://myanimelist.net/editprofile.php?go=stylepref&do=cssadv&id=*

// @icon         https://www.google.com/s2/favicons?domain=myanimelist.net
// @homepage     https://github.com/eskander/userscripts-collection
// @supportURL   https://github.com/eskander/userscripts-collection/issues
// @compatible   firefox Tested with Tampermonkey
// @compatible   chrome Tested with Tampermonkey
// @grant        GM_addStyle
// ==/UserScript==

/**************************************************************************************************/
/* Disclaimer: MyAnimeList BBCode Toolbar is based on "BBCodes for MAL" script by Al_eXs          */
/*             and its continuation by Serhiyko.                                                  */
/*             Original source code: https://userscripts-mirror.org/scripts/show/142850 (mirror)  */
/*             Continuation:         https://greasyfork.org/en/scripts/5709-bbcodes-for-mal       */
/**************************************************************************************************/

(function () {
    // import font-awesome 
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/fontawesome.min.css');
    document.head.appendChild(link);

    // Greasemonkey compatibility
    if (typeof GM_addStyle == "undefined") {
        function GM_addStyle(css) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                heads[0].appendChild(node);
            } else {
                // no head yet, stick it whereever
                document.documentElement.appendChild(node);
            }
        }
    }

    // toolbar style
    GM_addStyle(`
        #myBBcode {
            margin: 10px 0px 5px 0px;
            display: block;
            background-color: #2e51a2;
            width: 100%;
        }

        .bbcbtn {
            background-color: #2e51a2;
            border: none;
            color: #fff;
            width: 40px;
            height: 40px;
            text-align: center;
            display: inline-block;
            cursor: pointer;
        }

        .bbcbtn:hover {
            background-color: #e1e7f5;
            color: #000
        }

        .hidearrow {
            /* for Firefox */
            -moz-appearance: none;
            /* for Chrome */
            -webkit-appearance: none;
        }

        .divider {
            display: inline;
            border-left: 2px solid white;
        }
    `);
})();

function addtag(snap, tag) {
    var textareaNumber = getXpathSnapNumber(snap);
    obj = document.getElementsByTagName("textarea")[textareaNumber];

    beforeText = obj.value.substring(0, obj.selectionStart);
    selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);
    afterText = obj.value.substring(obj.selectionEnd, obj.value.length);
    newText = null;

    switch (tag) {

        case "bold":
            tagOpen = "[b]";
            tagClose = "[/b]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "strike":
            tagOpen = "[s]";
            tagClose = "[/s]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "italic":
            tagOpen = "[i]";
            tagClose = "[/i]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "underline":
            tagOpen = "[u]";
            tagClose = "[/u]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "code":
            tagOpen = "[code]";
            tagClose = "[/code]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "centre":
            tagOpen = "[center]";
            tagClose = "[/center]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "right":
            tagOpen = "[right]";
            tagClose = "[/right]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "spoiler":
            spoiler = prompt("Enter spoiler name (or leave blank)", "");

            if (spoiler == null) {
                break;
            }

            if (spoiler) {
                spoiler = '="' + spoiler + '"';
            }

            tagOpen = "[spoiler" + spoiler + "]";
            tagClose = "[/spoiler]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "url":
            urlOrDesc = prompt("Enter URL or URL description", "");

            if (urlOrDesc == null) {
                break;
            }

            if (!urlOrDesc) {
                urlOrDesc = selectedText;
                selectedText = '';
            }

            if (urlOrDesc.indexOf("http://") == 0 || urlOrDesc.indexOf("https://") == 0) {
                tagOpen = "[url=" + urlOrDesc + "]";
                tagClose = "[/url]";
            } else {
                tagOpen = "[url=";
                tagClose = "]" + urlOrDesc + "[/url]";
            }

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "image":
            imgURL = prompt("Enter image URL", "");

            if (imgURL == null) {
                break;
            }

            if (imgURL) {
                selectedText = imgURL;
            }

            tagOpen = "[img]";
            tagClose = "[/img]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "size":
            txtSize = document.getElementById("Size");

            if (txtSize.value == "enter") {
                txtSizeName = prompt("Enter the size (1 is minimum, 100 is default)", "");
            } else {
                txtSizeName = txtSize.value;
            }

            if (txtSizeName == null) {
                break;
            }

            tagOpen = "[size=" + String(txtSizeName) + "]";
            tagClose = "[/size]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "youtube":
            yt = prompt("Enter complete youtube url", "");

            if (yt == null) {
                break;
            }

            yt = yt.replace("https://", "http://");
            yt = yt.replace("http://www.youtube.com/watch?v=", "http://youtube.com/watch?v=");
            yt = yt.replace("http://youtube.com/watch?v=", "");
            yt = yt.substring(0, 11);

            tagOpen = "[yt]";
            tagClose = "[/yt]";

            newText = beforeText + tagOpen + yt + tagClose + afterText;
            break;

        case "colour":
            colour = document.getElementById("Colour");

            if (colour.value == "enter") {
                colourName = prompt("Enter the colour name or hex value (e.g. #abc123)", "");
            } else {
                colourName = colour.value;
            }

            if (colourName == null) {
                break;
            }

            tagOpen = "[color=" + String(colourName) + "]";
            tagClose = "[/color]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "quote":
            quote = prompt("Enter quoted person name", "");

            if (quote == null) {
                break;
            }

            if (quote) {
                quote = "=" + quote;
            }

            tagOpen = "[quote" + quote + "]";
            tagClose = "[/quote]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "list":
            tagOpen = "[list][*]";
            tagClose = "[/list]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "list=1":
            tagOpen = "[list=1][*]";
            tagClose = "[/list]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "[*]":
            tagOpen = "[*]";
            tagClose = "";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
    }

    if (newText != null) {
        caretStart = obj.selectionStart;
        caretEnd = obj.selectionEnd;
        if (selectedText.length == 0) {
            caretEnd -= tagClose.length;
        }
        caretEnd += newText.length - obj.value.length;
        caretStart = caretEnd;
        obj.value = newText;
        obj.setSelectionRange(caretStart, caretEnd);
    }
    obj.focus();
}

function xpath(query, object) {
    if (!object) var object = document;
    return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getXpathSnap() {
    var path = xpath("//textarea[@class='textarea']");
    if (path.snapshotLength == 0 || path.snapshotItem(0).id == "add_anime_tags" || path.snapshotItem(0).id == "add_manga_tags") {
        path = xpath("//textarea[@class='inputtext']");
        if (path.snapshotItem(j).previousElementSibling == null) {
            return (path.snapshotLength > 0) ? path.snapshotItem(0) : false;
        }
    }
    for (var j = 0; j < path.snapshotLength; j++) {
        if (path.snapshotItem(j).previousElementSibling == null) {
            if (path.snapshotItem(j).id != "add_anime_tags" && path.snapshotItem(j).id != "add_manga_tags") {
                return path.snapshotItem(j);
            }
        } else {
            if (path.snapshotItem(j).previousElementSibling.id != 'myBBcode' && (path.snapshotItem(j).previousElementSibling.tagName != 'GRAMMARLY-GHOST' && (path.snapshotItem(j).previousElementSibling.previousElementSibling === null || path.snapshotItem(j).previousElementSibling.previousElementSibling.id != 'myBBcode'))) {
                return path.snapshotItem(j);
            }
        }
    }
    return false;
}

function getXpathSnapNumber(xpathToBeNumbered) {
    var path = xpath("//textarea");
    for (var i = 0; i < path.snapshotLength; i++) {
        if (path.snapshotItem(i) === xpathToBeNumbered) {
            return i;
        }
    }
}

setTimeout(function () {
    var allReplies = xpath("//a[@title='Reply to this comment'] | //a[contains(@class, 'ml8')][text() = 'Reply'] | //input[@id='postReply'][@value='Submit']");
    for (var i = 0; i < allReplies.snapshotLength; i++) {
        (function (ind) {
            allReplies.snapshotItem(ind).addEventListener("click", function () {

                var repeatCount0 = 0;
                var replyTimer0 = setInterval(function () {
                    var replied;
                    var replyButton = xpath("//input[@value='Submit Reply'] | //a[@class='quickEdit'][text() = 'Quick Edit']");
                    if (replyButton.snapshotLength > 0) {
                        xpathSnap = getXpathSnap();
                        createButtons();
                        replyButton.snapshotItem(0).addEventListener("click", function () {
                            replied = replyTimer();
                        }, false);  //Modern browsers
                    }

                    function replyTimer() {
                        var repeatCount = 0;
                        return setInterval(function () {
                            addCodeToEdits();
                            repeatCount += 1;
                            if (repeatCount >= 18) {
                                clearInterval(replied);
                            }
                        }, 500);
                    }

                    repeatCount0 += 1;
                    if (repeatCount0 >= 72) {
                        clearInterval(replyTimer0);
                    }
                }, 100);

            }, true);
        })(i);
    }

    addCodeToEdits();
}, 100);

function addCodeToEdits() {
    var allEdits = xpath("//a[@title='Edit Comment']");
    var toEdit;
    for (var i = 0; i < allEdits.snapshotLength; i++) {
        (function (ind) {
            allEdits.snapshotItem(ind).removeEventListener("click", function () {
                toEdit = editTimer();
            });
            allEdits.snapshotItem(ind).addEventListener("click", function () {
                toEdit = editTimer();
            }, true);
        })(i);
    }
    function editTimer() {
        var repeatCount = 0;
        return setInterval(function () {
            xpathSnap = getXpathSnap();
            createButtons();
            repeatCount += 1;
            if (repeatCount >= 12) {
                clearInterval(toEdit);
            }
        }, 400);
    }
}

while (xpathSnap = getXpathSnap()) {
    createButtons();
}



// Generate toolbar
function createButtons() {
    if (xpathSnap) {

        var xpathSnapCur = xpathSnap;
        var div1 = document.createElement("div");
        div1.align = "Left";
        div1.id = "myBBcode";
        div1.innerHTML = " ";
        xpathSnap.parentNode.insertBefore(div1, xpathSnap);

        // set button content
        function setButton(name, glyph) {
            var post = document.createElement("button");
            post.type = "button";
            post.innerHTML = glyph;
            post.title = name[0].toUpperCase() + name.slice(1);
            post.setAttribute('class', 'fa bbcbtn');
            post.addEventListener('click', function () {
                addtag(xpathSnapCur, name);
            }, false);
            div1.appendChild(post);
        }

        function setSize(size) {
            var opt = document.createElement("option");
            opt.value = size;
            opt.appendChild(document.createTextNode(size + "%"));
            postSize.appendChild(opt);
        }

        function setColor(color) {
            var opt = document.createElement("option");
            opt.value = color;
            opt.appendChild(document.createTextNode(color));
            postColour.appendChild(opt);
        }

        function setDivider() {
            var opt = document.createElement("div");
            opt.setAttribute('class', 'divider');
            div1.appendChild(opt);
        }


        // List layout
        setButton("bold", "&#xf032;");
        setButton("italic", "&#xf033;");
        setButton("strike", "&#xf0cc;");
        setButton("underline", "&#xf0cd;");

        // Size selector
        var postSize = document.createElement("select");
        postSize.id = "Size";
        postSize.title = "Size";
        postSize.setAttribute('class', 'fa bbcbtn hidearrow');

        // First size selector
        var opt = document.createElement("option");
        opt.value = "";
        opt.setAttribute('selected', '');
        opt.setAttribute('disabled', '');
        opt.setAttribute('hidden', '');
        opt.appendChild(document.createTextNode(""));
        postSize.appendChild(opt);

        // Predefined sizes
        setSize("20");
        setSize("50");
        setSize("100");
        setSize("300");
        setSize("600");

        // Custom size
        var opt = document.createElement("option");
        opt.value = "enter";
        opt.appendChild(document.createTextNode('Enter size'));
        postSize.appendChild(opt);

        postSize.addEventListener('change', function () {
            document.getElementById("Size").value = postSize.value;
            addtag(xpathSnapCur, 'size');
            postSize.value = 'Size';
            this.selectedIndex = 0;
        }, false);
        div1.appendChild(postSize);

        // Color selector
        var postColour = document.createElement("select");
        postColour.id = "Colour";
        postColour.title = "Color";
        postColour.setAttribute('class', 'fa bbcbtn hidearrow');

        // First color selector
        var opt = document.createElement("option");
        opt.value = "";
        opt.setAttribute('selected', '');
        opt.setAttribute('disabled', '');
        opt.setAttribute('hidden', '');
        opt.appendChild(document.createTextNode(""));
        postColour.appendChild(opt);

        // Predefined colors
        setColor("Grey");
        setColor("Blue");
        setColor("Red");
        setColor("Green");
        setColor("Yellow");
        setColor("Pink");
        setColor("Navy");
        setColor("White");
        setColor("Black");
        setColor("Orange");
        setColor("Purple");

        // Custom color
        var opt = document.createElement("option");
        opt.value = "enter";
        opt.appendChild(document.createTextNode('Enter colour'));
        postColour.appendChild(opt);

        postColour.addEventListener('change', function () {
            document.getElementById("Colour").value = postColour.value;
            addtag(xpathSnapCur, 'colour');
            postColour.value = 'Select';
            this.selectedIndex = 0;
        }, false);
        div1.appendChild(postColour);

        setDivider();

        setButton("centre", "&#xf037;");
        setButton("right", "&#xf038;");

        setDivider();

        setButton("url", "&#xf0c1;");
        setButton("spoiler", "&#xf06a;");
        setButton("image", "&#xf03e;");
        setButton("youtube", "&#xf167;");
        setButton("quote", "&#xf10d;");

        setDivider();

        setButton("list", "&#xf0ca;");
        setButton("list=1", "&#xf0cb;");
        setButton("[*]", "&#xf00b;");

    }
}
