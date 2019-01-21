'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootType = getRootType;

var _get_types = require('./get_types');

/**
 *  Get the singular root type in the EsMappingsDsl
 *  object. If there are no types, or there are more
 *  that one type, this function will throw an error.
 *
 *  @param  {EsMappingsDsl} mappings
 *  @return {string}
 */
function getRootType(mappings) {
  const allTypes = (0, _get_types.getTypes)(mappings);

  if (allTypes.length !== 1) {
    throw new TypeError(`Unable to get root type of mappings object with ${allTypes.length} root types.`);
  }

  return allTypes[0];
}
