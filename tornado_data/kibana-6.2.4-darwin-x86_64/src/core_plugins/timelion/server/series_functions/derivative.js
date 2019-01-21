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

exports.default = new _chainable2.default('derivative', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }],
  help: 'Plot the change in values over time.',
  fn: function derivativeFn(args) {
    return (0, _alter2.default)(args, function (eachSeries) {
      const pairs = eachSeries.data;
      eachSeries.data = _lodash2.default.map(pairs, function (point, i) {
        if (i === 0 || pairs[i - 1][1] == null || point[1] == null) {
          return [point[0], null];
        }
        return [point[0], point[1] - pairs[i - 1][1]];
      });

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
