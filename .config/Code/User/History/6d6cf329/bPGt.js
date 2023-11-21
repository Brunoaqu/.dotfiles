// ==UserScript==
// @name         freedium-redirect
// @namespace    https://github/brunoaqu/tampermoney-scripts
// @version 1.5.3
// @description  Redirects medium urls to freedium.
// @author       Brunoaqu
// @match        @match *://medium.com/*
// ==/UserScript==

(function(){
    `use strict`;

    window.stop();
    const url = window.location.href;
    if (url.includes(`medium.com`)) window.location.href = `https://freedium.cfd/${url}`;
})();
