const cheerio = require('cheerio');
const isRelativeUrl = require('is-relative-url');

/**
 * The `[href]` of anchors in the given `html` with a relative url are prefixed with the given `baseUrl`.
 *
 * So with a `baseUrl` of `https://example.com/` an href of `path/to/page/` becomes `https://example.com/path/to/page/`,
 * but in-page links (e.g. `#options`) and absolute urls (e.g. `https://google.com`) remain unchanged.
 *
 * @param {String} html         markup string containing anchors with hrefs
 * @param {String} baseUrl      url to prepend to all relative links
 * @returns {String}            markup string with rebased hrefs
 */
function rebaseRelativeUrls(html, baseUrl) {
    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const $ = cheerio.load(html);
    $('a').each((index, link) => {
        const $link = $(link);
        const href = $link.attr('href');
        if (isRelativeExternalUrl(href)) {
            $link.attr('href', baseUrl + href);
        }
    });
    return $.html();
}

function isRelativeExternalUrl(url) {
    return isRelativeUrl(url) && !url.startsWith('#');
}

module.exports = rebaseRelativeUrls;