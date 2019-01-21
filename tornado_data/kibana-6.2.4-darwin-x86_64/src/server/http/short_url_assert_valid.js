'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortUrlAssertValid = shortUrlAssertValid;

var _url = require('url');

var _lodash = require('lodash');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shortUrlAssertValid(url) {
  var _parse = (0, _url.parse)(url);

  const protocol = _parse.protocol,
        hostname = _parse.hostname,
        pathname = _parse.pathname;


  if (protocol) {
    throw _boom2.default.notAcceptable(`Short url targets cannot have a protocol, found "${protocol}"`);
  }

  if (hostname) {
    throw _boom2.default.notAcceptable(`Short url targets cannot have a hostname, found "${hostname}"`);
  }

  const pathnameParts = (0, _lodash.trim)(pathname, '/').split('/');
  if (pathnameParts.length !== 2) {
    throw _boom2.default.notAcceptable(`Short url target path must be in the format "/app/{{appId}}", found "${pathname}"`);
  }
}
