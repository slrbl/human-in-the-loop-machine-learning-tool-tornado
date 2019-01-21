'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDeprecationWarningsMixin = configDeprecationWarningsMixin;

var _transform_deprecations = require('./transform_deprecations');

function configDeprecationWarningsMixin(kbnServer, server) {
  (0, _transform_deprecations.transformDeprecations)(kbnServer.settings, message => {
    server.log(['warning', 'config', 'deprecation'], message);
  });
}
