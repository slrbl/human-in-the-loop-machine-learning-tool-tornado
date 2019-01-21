'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldCapabilities = exports.concatIfUniq = undefined;

/**
 *  Get the field capabilities for field in `indices`, excluding
 *  all internal/underscore-prefixed fields that are not in `metaFields`
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {Array}  [indices=[]]  the list of indexes to check
 *  @param  {Array}  [metaFields=[]] the list of internal fields to include
 *  @return {Promise<Array<FieldInfo>>}
 */
let getFieldCapabilities = exports.getFieldCapabilities = (() => {
  var _ref = _asyncToGenerator(function* (callCluster, indices = [], metaFields = []) {
    const esFieldCaps = yield (0, _es_api.callFieldCapsApi)(callCluster, indices);
    const fieldsFromFieldCapsByName = (0, _lodash.indexBy)((0, _field_caps_response.readFieldCapsResponse)(esFieldCaps), 'name');

    const allFieldsUnsorted = Object.keys(fieldsFromFieldCapsByName).filter(function (name) {
      return !name.startsWith('_');
    }).concat(metaFields).reduce(concatIfUniq, []).map(function (name) {
      return (0, _lodash.defaults)({}, fieldsFromFieldCapsByName[name], {
        name,
        type: 'string',
        searchable: false,
        aggregatable: false,
        readFromDocValues: false
      });
    }).map(_overrides.mergeOverrides);

    return (0, _lodash.sortBy)(allFieldsUnsorted, 'name');
  });

  return function getFieldCapabilities(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _es_api = require('../es_api');

var _field_caps_response = require('./field_caps_response');

var _overrides = require('./overrides');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const concatIfUniq = exports.concatIfUniq = (arr, value) => arr.includes(value) ? arr : arr.concat(value);
