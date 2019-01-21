'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternsService = undefined;

var _lib = require('./lib');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class IndexPatternsService {
  constructor(callDataCluster) {
    this._callDataCluster = callDataCluster;
  }

  /**
   *  Get a list of field objects for an index pattern that may contain wildcards
   *
   *  @param {Object} [options={}]
   *  @property {String} options.pattern The moment compatible time pattern
   *  @property {Number} options.metaFields The list of underscore prefixed fields that should
   *                                        be left in the field list (all others are removed).
   *  @return {Promise<Array<Fields>>}
   */
  getFieldsForWildcard(options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const pattern = options.pattern,
            metaFields = options.metaFields;

      return yield (0, _lib.getFieldCapabilities)(_this._callDataCluster, pattern, metaFields);
    })();
  }

  /**
   *  Get a list of field objects for a time pattern
   *
   *  @param {Object} [options={}]
   *  @property {String} options.pattern The moment compatible time pattern
   *  @property {Number} options.lookBack The number of indices we will pull mappings for
   *  @property {Number} options.metaFields The list of underscore prefixed fields that should
   *                                        be left in the field list (all others are removed).
   *  @return {Promise<Array<Fields>>}
   */
  getFieldsForTimePattern(options = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const pattern = options.pattern,
            lookBack = options.lookBack,
            metaFields = options.metaFields;

      var _ref = yield (0, _lib.resolveTimePattern)(_this2._callDataCluster, pattern);

      const matches = _ref.matches;

      const indices = matches.slice(0, lookBack);
      if (indices.length === 0) {
        throw (0, _lib.createNoMatchingIndicesError)(pattern);
      }
      return yield (0, _lib.getFieldCapabilities)(_this2._callDataCluster, indices, metaFields);
    })();
  }

}
exports.IndexPatternsService = IndexPatternsService;
