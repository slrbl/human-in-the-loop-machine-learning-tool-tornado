'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKbnFieldType = getKbnFieldType;
exports.castEsToKbnFieldTypeName = castEsToKbnFieldTypeName;
exports.getKbnTypeNames = getKbnTypeNames;
class KbnFieldType {
  constructor(options = {}) {
    const name = options.name;
    var _options$sortable = options.sortable;
    const sortable = _options$sortable === undefined ? false : _options$sortable;
    var _options$filterable = options.filterable;
    const filterable = _options$filterable === undefined ? false : _options$filterable;
    var _options$esTypes = options.esTypes;
    const esTypes = _options$esTypes === undefined ? [] : _options$esTypes;


    Object.defineProperties(this, {
      name: { value: name },
      sortable: { value: sortable },
      filterable: { value: filterable },
      esTypes: { value: Object.freeze(esTypes.slice()) }
    });
  }
}

exports.KbnFieldType = KbnFieldType;
const KBN_FIELD_TYPES = [new KbnFieldType({
  name: 'string',
  sortable: true,
  filterable: true,
  esTypes: ['string', 'text', 'keyword', '_type', '_id']
}), new KbnFieldType({
  name: 'number',
  sortable: true,
  filterable: true,
  esTypes: ['float', 'half_float', 'scaled_float', 'double', 'integer', 'long', 'short', 'byte', 'token_count']
}), new KbnFieldType({
  name: 'date',
  sortable: true,
  filterable: true,
  esTypes: ['date']
}), new KbnFieldType({
  name: 'ip',
  sortable: true,
  filterable: true,
  esTypes: ['ip']
}), new KbnFieldType({
  name: 'boolean',
  sortable: true,
  filterable: true,
  esTypes: ['boolean']
}), new KbnFieldType({
  name: 'geo_point',
  esTypes: ['geo_point']
}), new KbnFieldType({
  name: 'geo_shape',
  esTypes: ['geo_shape']
}), new KbnFieldType({
  name: 'attachment',
  esTypes: ['attachment']
}), new KbnFieldType({
  name: 'murmur3',
  esTypes: ['murmur3']
}), new KbnFieldType({
  name: '_source',
  esTypes: ['_source']
}), new KbnFieldType({
  name: 'unknown'
}), new KbnFieldType({
  name: 'conflict'
})];

/**
 *  Get a type object by name
 *  @param  {string} typeName
 *  @return {KbnFieldType}
 */
function getKbnFieldType(typeName) {
  return KBN_FIELD_TYPES.find(type => type.name === typeName);
}

/**
 *  Get the KbnFieldType name for an esType string
 *  @param {string} esType
 *  @return {string}
 */
function castEsToKbnFieldTypeName(esType) {
  const type = KBN_FIELD_TYPES.find(type => type.esTypes.includes(esType));
  return type ? type.name : 'unknown';
}

/**
 *  Get the esTypes known by all kbnFieldTypes
 *  @return {Array<string>}
 */
function getKbnTypeNames() {
  return KBN_FIELD_TYPES.map(type => type.name);
}
