/**
 * @file        freedium-redirect.js
 * @author      Brunoaqu
 * @description redirects medium urls to freedium
 * @date        2023-11-20
 * @license     MIT
 */

(function(){
    `use strict`;

    const url = window.location.href;
    if (url.includes(`medium.com`)) window.location.href = `https://freedium.app/${url}`;
})();
