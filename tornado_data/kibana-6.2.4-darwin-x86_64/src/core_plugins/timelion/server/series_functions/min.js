'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('../lib/reduce.js');

var _reduce2 = _interopRequireDefault(_reduce);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('min', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'value',
    types: ['seriesList', 'number'],
    help: 'Sets the point to whichever is lower, the existing value, or the one passed.' + ' If passing a seriesList it must contain exactly 1 series.'

  }],
  help: 'Minimum values of one or more series in a seriesList to each position, in each series, of the input seriesList',
  fn: function minFn(args) {
    return (0, _reduce2.default)(args, function (a, b) {
      return Math.min(a, b);
    });
  }
});
module.exports = exports['default'];
