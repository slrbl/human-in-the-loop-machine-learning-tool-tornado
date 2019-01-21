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

exports.default = new _chainable2.default('abs', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }],
  help: 'Return the absolute value of each value in the series list',
  fn: function absFn(args) {
    return (0, _alter2.default)(args, function (eachSeries) {
      const data = _lodash2.default.map(eachSeries.data, function (point) {
        return [point[0], Math.abs(point[1])];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
