'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypes = getTypes;
/**
 *  Get the names of the types defined in the EsMappingsDsl
 *
 *  @param  {EsMappingsDsl} mappings
 *  @return {Array<string>}
 */
function getTypes(mappings) {
  return Object.keys(mappings).filter(type => type !== '_default_');
}
