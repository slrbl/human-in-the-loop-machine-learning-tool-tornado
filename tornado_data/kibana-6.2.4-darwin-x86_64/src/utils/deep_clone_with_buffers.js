'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCloneWithBuffers = deepCloneWithBuffers;

var _lodash = require('lodash');

function cloneBuffersCustomizer(val) {
  if (Buffer.isBuffer(val)) {
    return new Buffer(val);
  }
}

function deepCloneWithBuffers(vals) {
  return (0, _lodash.cloneDeep)(vals, cloneBuffersCustomizer);
}
