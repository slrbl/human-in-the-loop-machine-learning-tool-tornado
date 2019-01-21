/**
 *  Extracted from angular.js
 *  repo: https://github.com/angular/angular.js
 *  license: MIT - https://github.com/angular/angular.js/blob/51c516e7d4f2d10b0aaa4487bd0b52772022207a/LICENSE
 *  source: https://github.com/angular/angular.js/blob/51c516e7d4f2d10b0aaa4487bd0b52772022207a/src/Angular.js#L1413-L1432
 */

/**
 * This method is intended for encoding *key* or *value* parts of query component. We need a custom
 * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
 * encoded per http://tools.ietf.org/html/rfc3986:
 *    query         = *( pchar / "/" / "?" )
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
module.exports = function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%3B/gi, ';').
    replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}
