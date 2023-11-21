/**
 * @file        freedium-redirect.js
 * @author      Brunoaqu
 * @description redirects medium urls to freedium
 * @date        2023-11-20
 * @license     MIT
 */

// ==UserScript==
// @name         freedium-redirect
// @namespace    https://github/brunoaqu/tampermoney-scripts
// @version      0.1
// @description  Redirects medium urls to freedium.
// @author       Brunoaqu
// @match        @match *://medium.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function(){
    `use strict`;

    const url = window.location.href;
    if (url.includes(`medium.com`)) window.location.href = `https://freedium.cfd/${url}`;
})();
