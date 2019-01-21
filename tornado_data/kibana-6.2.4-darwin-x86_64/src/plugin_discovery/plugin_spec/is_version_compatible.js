'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVersionCompatible = isVersionCompatible;

var _version = require('../../utils/version');

function isVersionCompatible(version, compatibleWith) {
  // the special "kibana" version can be used to always be compatible,
  // but is intentionally not supported by the plugin installer
  if (version === 'kibana') {
    return true;
  }

  return (0, _version.versionSatisfies)((0, _version.cleanVersion)(version), (0, _version.cleanVersion)(compatibleWith));
}
