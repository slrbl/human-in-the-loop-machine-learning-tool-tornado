'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callFieldCapsApi = exports.callIndexAliasApi = undefined;

/**
 *  Call the index.getAlias API for a list of indices.
 *
 *  If `indices` is an array or comma-separated list and some of the
 *  values don't match anything but others do this will return the
 *  matches and not throw an error.
 *
 *  If not a single index matches then a NoMatchingIndicesError will
 *  be thrown.
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {Array<String>|String} indices
 *  @return {Promise<IndexAliasResponse>}
 */
let callIndexAliasApi = exports.callIndexAliasApi = (() => {
  var _ref = _asyncToGenerator(function* (callCluster, indices) {
    try {
      return yield callCluster('indices.getAlias', {
        index: indices,
        ignoreUnavailable: true,
        allowNoIndices: false
      });
    } catch (error) {
      throw (0, _errors.convertEsError)(indices, error);
    }
  });

  return function callIndexAliasApi(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *  Call the fieldCaps API for a list of indices.
 *
 *  Just like callIndexAliasApi(), callFieldCapsApi() throws
 *  if no indexes are matched, but will return potentially
 *  "partial" results if even a single index is matched.
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {Array<String>|String} indices
 *  @return {Promise<FieldCapsResponse>}
 */


let callFieldCapsApi = exports.callFieldCapsApi = (() => {
  var _ref2 = _asyncToGenerator(function* (callCluster, indices) {
    try {
      return yield callCluster('fieldCaps', {
        index: indices,
        fields: '*',
        ignoreUnavailable: true,
        allowNoIndices: false
      });
    } catch (error) {
      throw (0, _errors.convertEsError)(indices, error);
    }
  });

  return function callFieldCapsApi(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _errors = require('./errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
