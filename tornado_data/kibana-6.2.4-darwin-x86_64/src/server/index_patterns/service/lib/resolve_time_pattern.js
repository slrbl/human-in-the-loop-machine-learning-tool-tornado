'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTimePattern = undefined;

/**
 *  Convert a time pattern into a list of indexes it could
 *  have matched and ones it did match.
 *
 *  @param  {Function} callCluster bound function for accessing an es client
 *  @param  {String} timePattern
 *  @return {Promise<Object>} object that lists the indices that match based
 *                            on a wildcard version of the time pattern (all)
 *                            and the indices that actually match the time
 *                            pattern (matches);
 */
let resolveTimePattern = exports.resolveTimePattern = (() => {
  var _ref = _asyncToGenerator(function* (callCluster, timePattern) {
    const aliases = yield (0, _es_api.callIndexAliasApi)(callCluster, (0, _time_pattern_to_wildcard.timePatternToWildcard)(timePattern));

    const allIndexDetails = (0, _lodash.chain)(aliases).reduce(function (acc, index, indexName) {
      return acc.concat(indexName, Object.keys(index.aliases || {}));
    }, []).sort().uniq(true).map(function (indexName) {
      const parsed = (0, _moment2.default)(indexName, timePattern, true);
      if (!parsed.isValid()) {
        return {
          valid: false,
          indexName,
          order: indexName,
          isMatch: false
        };
      }

      return {
        valid: true,
        indexName,
        order: parsed,
        isMatch: indexName === parsed.format(timePattern)
      };
    }).sortByOrder(['valid', 'order'], ['desc', 'desc']).value();

    return {
      all: allIndexDetails.map(function (details) {
        return details.indexName;
      }),

      matches: allIndexDetails.filter(function (details) {
        return details.isMatch;
      }).map(function (details) {
        return details.indexName;
      })
    };
  });

  return function resolveTimePattern(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _time_pattern_to_wildcard = require('./time_pattern_to_wildcard');

var _es_api = require('./es_api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
