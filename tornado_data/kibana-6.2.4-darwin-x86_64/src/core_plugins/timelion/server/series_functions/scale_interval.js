'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _to_milliseconds = require('../lib/to_milliseconds.js');

var _to_milliseconds2 = _interopRequireDefault(_to_milliseconds);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('scale_interval', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'interval',
    types: ['string'],
    help: 'The new interval in date math notation, eg 1s for 1 second. 1m, 5m, 1M, 1w, 1y, etc.'
  }],
  help: 'Changes scales a value (usually a sum or a count) to a new interval. For example, as a per-second rate',
  fn: function scaleIntervalFn(args, tlConfig) {
    const currentInterval = (0, _to_milliseconds2.default)(tlConfig.time.interval);
    const scaleInterval = (0, _to_milliseconds2.default)(args.byName.interval);

    return (0, _alter2.default)(args, function (eachSeries) {
      const data = _lodash2.default.map(eachSeries.data, function (point) {
        return [point[0], point[1] / currentInterval * scaleInterval];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
