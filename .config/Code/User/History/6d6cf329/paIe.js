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
    const isMedium = url.includes(`medium.com`);

    if (isMedium) {
        window.location.href = `https://freedium.app/${url}`;
    }

})();
