'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapUri;

var _lodash = require('lodash');

var _url = require('url');

var _filter_headers = require('./filter_headers');

var _filter_headers2 = _interopRequireDefault(_filter_headers);

var _set_headers = require('./set_headers');

var _set_headers2 = _interopRequireDefault(_set_headers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapUri(cluster, proxyPrefix) {
  function joinPaths(pathA, pathB) {
    return (0, _lodash.trimRight)(pathA, '/') + '/' + (0, _lodash.trimLeft)(pathB, '/');
  }

  return function (request, done) {
    var _parseUrl = (0, _url.parse)(cluster.getUrl(), true);

    const esUrlProtocol = _parseUrl.protocol,
          esUrlHasSlashes = _parseUrl.slashes,
          esUrlAuth = _parseUrl.auth,
          esUrlHostname = _parseUrl.hostname,
          esUrlPort = _parseUrl.port,
          esUrlBasePath = _parseUrl.pathname,
          esUrlQuery = _parseUrl.query;

    // copy most url components directly from the elasticsearch.url

    const mappedUrlComponents = {
      protocol: esUrlProtocol,
      slashes: esUrlHasSlashes,
      auth: esUrlAuth,
      hostname: esUrlHostname,
      port: esUrlPort
    };

    // pathname
    const reqSubPath = request.path.replace(proxyPrefix, '');
    mappedUrlComponents.pathname = joinPaths(esUrlBasePath, reqSubPath);

    // querystring
    const mappedQuery = (0, _lodash.defaults)((0, _lodash.omit)(request.query, '_'), esUrlQuery);
    if (Object.keys(mappedQuery).length) {
      mappedUrlComponents.query = mappedQuery;
    }

    const filteredHeaders = (0, _filter_headers2.default)(request.headers, cluster.getRequestHeadersWhitelist());
    const mappedHeaders = (0, _set_headers2.default)(filteredHeaders, cluster.getCustomHeaders());
    const mappedUrl = (0, _url.format)(mappedUrlComponents);
    done(null, mappedUrl, mappedHeaders);
  };
}
module.exports = exports['default'];
