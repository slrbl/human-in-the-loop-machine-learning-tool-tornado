'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer) {
  const settings = (0, _transform_deprecations.transformDeprecations)(kbnServer.settings);
  kbnServer.config = _config.Config.withDefaultSchema(settings);
};

var _config = require('./config');

var _transform_deprecations = require('./transform_deprecations');

module.exports = exports['default'];
