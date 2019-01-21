'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getQueryParams = getQueryParams;

var _mappings = require('../../../../mappings');

/**
 *  Get the field params based on the types and searchFields
 *  @param  {Array<string>} searchFields
 *  @param  {Array<string>} types
 *  @return {Object}
 */
function getFieldsForTypes(searchFields, types) {
  if (!searchFields || !searchFields.length) {
    return {
      all_fields: true
    };
  }

  return {
    fields: searchFields.reduce((acc, field) => [...acc, ...types.map(prefix => `${prefix}.${field}`)], [])
  };
}

/**
 *  Get the "query" related keys for the search body
 *  @param  {EsMapping} mapping mappings from Ui
 *  @param  {Object} type
 *  @param  {String} search
 *  @param  {Array<string>} searchFields
 *  @return {Object}
 */
function getQueryParams(mappings, type, search, searchFields) {
  if (!type && !search) {
    return {};
  }

  const bool = {};

  if (type) {
    bool.filter = [{ term: { type } }];
  }

  if (search) {
    bool.must = [{
      simple_query_string: _extends({
        query: search
      }, getFieldsForTypes(searchFields, type ? [type] : Object.keys((0, _mappings.getRootProperties)(mappings))))
    }];
  }

  return { query: { bool } };
}
