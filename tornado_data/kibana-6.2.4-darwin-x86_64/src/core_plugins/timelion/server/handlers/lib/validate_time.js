'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateTime;

var _date_math = require('../../lib/date_math.js');

var _date_math2 = _interopRequireDefault(_date_math);

var _to_milliseconds = require('../../lib/to_milliseconds.js');

var _to_milliseconds2 = _interopRequireDefault(_to_milliseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateTime(time, tlConfig) {
  const span = (0, _date_math2.default)(time.to, true) - (0, _date_math2.default)(time.from);
  const interval = (0, _to_milliseconds2.default)(time.interval);
  const bucketCount = span / interval;
  const maxBuckets = tlConfig.settings['timelion:max_buckets'];
  if (bucketCount > maxBuckets) {
    throw new Error('Max buckets exceeded: ' + Math.round(bucketCount) + ' of ' + maxBuckets + ' allowed. ' + 'Choose a larger interval or a shorter time span');
  }
  return true;
}
module.exports = exports['default'];
