'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kibana_index_mappings_mixin = require('./kibana_index_mappings_mixin');

Object.defineProperty(exports, 'kibanaIndexMappingsMixin', {
  enumerable: true,
  get: function get() {
    return _kibana_index_mappings_mixin.kibanaIndexMappingsMixin;
  }
});

var _lib = require('./lib');

Object.defineProperty(exports, 'getTypes', {
  enumerable: true,
  get: function get() {
    return _lib.getTypes;
  }
});
Object.defineProperty(exports, 'getRootType', {
  enumerable: true,
  get: function get() {
    return _lib.getRootType;
  }
});
Object.defineProperty(exports, 'getProperty', {
  enumerable: true,
  get: function get() {
    return _lib.getProperty;
  }
});
Object.defineProperty(exports, 'getRootProperties', {
  enumerable: true,
  get: function get() {
    return _lib.getRootProperties;
  }
});
