'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deprecations = exports.createTransform = undefined;

var _create_transform = require('./create_transform');

Object.defineProperty(exports, 'createTransform', {
  enumerable: true,
  get: function get() {
    return _create_transform.createTransform;
  }
});

var _deprecations = require('./deprecations');

const Deprecations = exports.Deprecations = { rename: _deprecations.rename, unused: _deprecations.unused };
