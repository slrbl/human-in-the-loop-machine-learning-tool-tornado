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

exports.default = new _chainable2.default('cusum', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'base',
    types: ['number'],
    help: 'Number to start at. Basically just adds this to the beginning of the series'
  }],
  help: 'Return the cumulative sum of a series, starting at a base.',
  fn: function cusumFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, base) {
      const pairs = eachSeries.data;
      let total = base || 0;
      eachSeries.data = _lodash2.default.map(pairs, function (point) {
        total += point[1];
        return [point[0], total];
      });

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
