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

exports.default = new _chainable2.default('trim', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'start',
    types: ['number', 'null'],
    help: 'Buckets to trim from the beginning of the series. Default: 1'
  }, {
    name: 'end',
    types: ['number', 'null'],
    help: 'Buckets to trim from the end of the series. Default: 1'
  }],
  help: 'Set N buckets at the start or end of a series to null to fit the "partial bucket issue"',
  fn: function conditionFn(args) {
    const config = args.byName;
    if (config.start == null) config.start = 1;
    if (config.end == null) config.end = 1;

    return (0, _alter2.default)(args, function (eachSeries) {

      _lodash2.default.times(config.start, function (i) {
        eachSeries.data[i][1] = null;
      });

      _lodash2.default.times(config.end, function (i) {
        eachSeries.data[eachSeries.data.length - 1 - i][1] = null;
      });

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
