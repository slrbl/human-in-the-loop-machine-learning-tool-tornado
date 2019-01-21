'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRoot = fromRoot;

var _package_json = require('./package_json');

var _path = require('path');

function fromRoot(...args) {
  return (0, _path.resolve)(_package_json.pkg.__dirname, ...args);
}
