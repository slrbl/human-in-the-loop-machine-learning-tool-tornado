'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperty = getProperty;

var _toPath = require('lodash/internal/toPath');

var _toPath2 = _interopRequireDefault(_toPath);

var _get_root_type = require('./get_root_type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Recursively read properties from the mapping object of type "object"
 *  until the `path` is resolved.
 *  @param  {EsObjectMapping} mapping
 *  @param  {Array<string>} path
 *  @return {Objects|undefined}
 */
function getPropertyMappingFromObjectMapping(mapping, path) {
  const props = mapping && (mapping.properties || mapping.fields);

  if (!props) {
    return undefined;
  }

  if (path.length > 1) {
    return getPropertyMappingFromObjectMapping(props[path[0]], path.slice(1));
  } else {
    return props[path[0]];
  }
}

/**
 *  Get the mapping for a specific property within the root type of the EsMappingsDsl.
 *  @param  {EsMappingsDsl} mappings
 *  @param  {string|Array<string>} path
 *  @return {Object|undefined}
 */
function getProperty(mappings, path) {
  return getPropertyMappingFromObjectMapping(mappings[(0, _get_root_type.getRootType)(mappings)], (0, _toPath2.default)(path));
}
