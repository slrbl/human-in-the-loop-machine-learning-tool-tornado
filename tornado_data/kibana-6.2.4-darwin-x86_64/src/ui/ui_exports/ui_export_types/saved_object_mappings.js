'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappings = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

// mapping types
const mappings = exports.mappings = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('savedObjectMappings'), (0, _modify_reduce.mapSpec)((spec, type, pluginSpec) => ({
  pluginId: pluginSpec.getId(),
  properties: spec
})), _reduce.flatConcatAtType);
