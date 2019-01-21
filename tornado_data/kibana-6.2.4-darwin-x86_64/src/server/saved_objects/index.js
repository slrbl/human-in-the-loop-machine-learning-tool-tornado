'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _saved_objects_mixin = require('./saved_objects_mixin');

Object.defineProperty(exports, 'savedObjectsMixin', {
  enumerable: true,
  get: function get() {
    return _saved_objects_mixin.savedObjectsMixin;
  }
});

var _client = require('./client');

Object.defineProperty(exports, 'SavedObjectsClient', {
  enumerable: true,
  get: function get() {
    return _client.SavedObjectsClient;
  }
});
