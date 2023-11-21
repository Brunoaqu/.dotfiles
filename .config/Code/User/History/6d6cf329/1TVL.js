/**
 * @file        freedium-redirect.js
 * @author      Brunoaqu
 * @description redirects medium urls to freedium
 * @date        2023-11-20
 * @license     MIT
 */

// ==UserScript==
// @name         freedium-redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://greasyfork.org/en/scripts/459541-youtube%E5%8E%BB%E5%B9%BF%E5%91%8A-youtube-ad-blocker/code
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==

(function(){
    `use strict`;

    const url = window.location.href;
    if (url.includes(`medium.com`)) window.location.href = `https://freedium.cfd/${url}`;
})();
