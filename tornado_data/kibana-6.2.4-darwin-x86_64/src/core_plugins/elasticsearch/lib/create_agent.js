'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  const target = _url2.default.parse((0, _lodash.get)(config, 'url'));

  if (!/^https/.test(target.protocol)) return new _http2.default.Agent();

  return new _https2.default.Agent((0, _parse_config.parseConfig)(config).ssl);
};

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _parse_config = require('./parse_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
