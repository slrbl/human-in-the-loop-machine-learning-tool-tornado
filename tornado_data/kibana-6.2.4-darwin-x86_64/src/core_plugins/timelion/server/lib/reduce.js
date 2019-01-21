'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Pairwise reduce seriesList
 * @params {seriesList} left
 * @params {seriesList} right
 * @params {Function} fn - Function used to combine points at same index in each array of each series in the seriesList.
 * @return {seriesList}
 */
let pairwiseReduce = (() => {
  var _ref = _asyncToGenerator(function* (left, right, fn) {
    if (left.list.length !== right.list.length) {
      throw new Error('Unable to pairwise reduce seriesLists, number of series are not the same');
    }

    let pairwiseField = 'label';
    if (allSeriesContainKey(left, 'split') && allSeriesContainKey(right, 'split')) {
      pairwiseField = 'split';
    }
    const indexedList = _lodash2.default.indexBy(right.list, pairwiseField);

    // ensure seriesLists contain same pairwise labels
    left.list.forEach(function (leftSeries) {
      if (!indexedList[leftSeries[pairwiseField]]) {
        const rightSeriesLables = right.list.map(function (rightSeries) {
          return `"${rightSeries[pairwiseField]}"`;
        }).join(',');
        throw new Error(`Matching series could not be found for "${leftSeries[pairwiseField]}" in [${rightSeriesLables}]`);
      }
    });

    // pairwise reduce seriesLists
    const pairwiseSeriesList = { type: 'seriesList', list: [] };
    left.list.forEach((() => {
      var _ref2 = _asyncToGenerator(function* (leftSeries) {
        const first = { type: 'seriesList', list: [leftSeries] };
        const second = { type: 'seriesList', list: [indexedList[leftSeries[pairwiseField]]] };
        const reducedSeriesList = yield reduce([first, second], fn);
        const reducedSeries = reducedSeriesList.list[0];
        reducedSeries.label = leftSeries[pairwiseField];
        pairwiseSeriesList.list.push(reducedSeries);
      });

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    })());
    return pairwiseSeriesList;
  });

  return function pairwiseReduce(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * Reduces multiple arrays into a single array using a function
 * @param {Array} args - args[0] must always be a {type: 'seriesList'}
 *
 * - If only arg[0] exists, the seriesList will be reduced to a seriesList containing a single series
 * - If multiple arguments are passed, each argument will be mapped onto each series in the seriesList.

 * @params {Function} fn - Function used to combine points at same index in each array of each series in the seriesList.
 * @return {seriesList}
 */


let reduce = (() => {
  var _ref3 = _asyncToGenerator(function* (argsPromises, fn) {
    const args = yield Promise.all(argsPromises);

    const seriesList = args.shift();
    let argument = args.shift();

    if (seriesList.type !== 'seriesList') {
      throw new Error('input must be a seriesList');
    }

    if (_lodash2.default.isObject(argument) && argument.type === 'seriesList') {
      if (argument.list.length > 1) {
        return yield pairwiseReduce(seriesList, argument, fn);
      } else {
        argument = argument.list[0];
      }
    }

    function reduceSeries(series) {
      return _lodash2.default.reduce(series, function (destinationObject, argument, i, p) {

        let output = _lodash2.default.map(destinationObject.data, function (point, index) {

          const value = point[1];

          if (value == null) {
            return [point[0], null];
          }

          if (_lodash2.default.isNumber(argument)) {
            return [point[0], fn(value, argument, i, p)];
          }

          if (argument.data[index] == null || argument.data[index][1] == null) {
            return [point[0], null];
          }
          return [point[0], fn(value, argument.data[index][1], i, p)];
        });

        // Output = single series

        output = {
          data: output
        };
        output = _lodash2.default.defaults(output, destinationObject);
        return output;
      });
    }

    let reduced;

    if (argument != null) {
      reduced = _lodash2.default.map(seriesList.list, function (series) {
        return reduceSeries([series].concat(argument));
      });
    } else {
      reduced = [reduceSeries(seriesList.list)];
    }

    seriesList.list = reduced;
    return seriesList;
  });

  return function reduce(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function allSeriesContainKey(seriesList, key) {
  const containsKeyInitialValue = true;
  return seriesList.list.reduce((containsKey, series) => {
    return containsKey && _lodash2.default.has(series, key);
  }, containsKeyInitialValue);
}exports.default = reduce;
module.exports = exports['default'];
