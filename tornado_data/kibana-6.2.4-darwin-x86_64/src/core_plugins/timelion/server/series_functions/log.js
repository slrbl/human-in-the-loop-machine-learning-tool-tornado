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

exports.default = new _chainable2.default('log', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'base',
    types: ['number'],
    help: 'Set logarithmic base, 10 by default'

  }],
  help: 'Return the logarithm value of each value in the series list (default base: 10)',
  fn: function logFn(args) {
    const config = args.byName;
    return (0, _alter2.default)(args, function (eachSeries) {
      const data = _lodash2.default.map(eachSeries.data, function (point) {
        return [point[0], Math.log(point[1]) / Math.log(config.base || 10)];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
