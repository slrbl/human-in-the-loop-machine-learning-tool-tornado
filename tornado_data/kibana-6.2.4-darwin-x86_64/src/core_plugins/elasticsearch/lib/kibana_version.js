'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../../../package.json');

exports.default = {
  // Make the version stubbable to improve testability.
  get() {
    return _package.version;
  }
};
module.exports = exports['default'];
