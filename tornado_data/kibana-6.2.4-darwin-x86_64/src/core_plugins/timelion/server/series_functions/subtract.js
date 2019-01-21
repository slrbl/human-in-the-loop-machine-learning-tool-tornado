'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('../lib/reduce.js');

var _reduce2 = _interopRequireDefault(_reduce);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('subtract', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'term',
    types: ['seriesList', 'number'],
    help: 'Number or series to subtract from input. SeriesList with multiple series will be applied label-wise.'
  }],
  help: 'Subtract the values of one or more series in a seriesList to each position, in each series, of the input seriesList',
  fn: function subtractFn(args) {
    return (0, _reduce2.default)(args, function (a, b) {
      return a - b;
    });
  }
});
module.exports = exports['default'];
