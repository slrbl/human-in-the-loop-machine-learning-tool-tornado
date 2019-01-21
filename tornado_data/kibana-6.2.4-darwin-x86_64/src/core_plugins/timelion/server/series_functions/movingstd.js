'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('movingstd', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'window',
    types: ['number'],
    help: 'Number of points to compute the standard deviation over'
  }],
  aliases: ['mvstd'],
  help: 'Calculate the moving standard deviation over a given window. Uses naive two-pass algorithm. Rounding errors ' + 'may become more noticeable with very long series, or series with very large numbers.',
  fn: function movingstdFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, _window) {

      const pairs = eachSeries.data;

      eachSeries.data = _lodash2.default.map(pairs, function (point, i) {
        if (i < _window) {
          return [point[0], null];
        }

        const average = _lodash2.default.chain(pairs.slice(i - _window, i)).map(function (point) {
          return point[1];
        }).reduce(function (memo, num) {
          return memo + num;
        }).value() / _window;

        const variance = _lodash2.default.chain(pairs.slice(i - _window, i)).map(function (point) {
          return point[1];
        }).reduce(function (memo, num) {
          return memo + Math.pow(num - average, 2);
        }).value() / (_window - 1);

        return [point[0], Math.sqrt(variance)];
      });
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
