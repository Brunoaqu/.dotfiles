// ==UserScript==
// @name         freedium-redirect
// @description  Redirects medium urls to freedium.
// @version      0.1
// @author       Brunoaqu
// @match        *://medium.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function(){
    `use strict`;

    const url = window.location.href;
    if (url.includes(`medium.com`)) {
      window.stop();
      window.location.replace(`https://freedium.cfd/${url}`);
    }
})();
