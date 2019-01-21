'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = undefined;

var _map_spec = require('./map_spec');

/**
 *  Reducer wrapper which, replaces the `spec` with the details about the definition
 *  of that spec
 *  @type {Function}
 */
const debug = exports.debug = (0, _map_spec.mapSpec)((spec, type, pluginSpec) => ({
  spec,
  type,
  pluginSpec
}));
