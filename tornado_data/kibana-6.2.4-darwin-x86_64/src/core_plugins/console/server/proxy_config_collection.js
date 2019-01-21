'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyConfigCollection = undefined;

var _lodash = require('lodash');

var _proxy_config = require('./proxy_config');

var _url = require('url');

class ProxyConfigCollection {
  constructor(configs = []) {
    this.configs = configs.map(settings => new _proxy_config.ProxyConfig(settings));
  }

  configForUri(uri) {
    const parsedUri = (0, _url.parse)(uri);
    const settings = this.configs.map(config => config.getForParsedUri(parsedUri));
    return (0, _lodash.defaultsDeep)({}, ...settings);
  }
}
exports.ProxyConfigCollection = ProxyConfigCollection;
