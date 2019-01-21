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

exports.default = new _chainable2.default('range', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'min',
    types: ['number'],
    help: 'New minimum value'
  }, {
    name: 'max',
    types: ['number'],
    help: 'New maximum value'
  }],
  help: 'Changes the max and min of a series while keeping the same shape',
  fn: function range(args) {
    return (0, _alter2.default)(args, function (eachSeries) {
      const values = _lodash2.default.map(eachSeries.data, 1);
      const min = _lodash2.default.min(values);
      const max = _lodash2.default.max(values);

      // newvalue= (max'-min')/(max-min)*(value-min)+min'.
      const data = _lodash2.default.map(eachSeries.data, function (point) {
        const val = (args.byName.max - args.byName.min) / (max - min) * (point[1] - min) + args.byName.min;
        return [point[0], val];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
