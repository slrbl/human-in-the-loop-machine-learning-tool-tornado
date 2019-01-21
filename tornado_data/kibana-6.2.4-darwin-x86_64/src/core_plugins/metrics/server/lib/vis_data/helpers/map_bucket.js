'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapBucket;

var _get_agg_value = require('./get_agg_value');

var _get_agg_value2 = _interopRequireDefault(_get_agg_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapBucket(metric) {
  return bucket => [bucket.key, (0, _get_agg_value2.default)(bucket, metric)];
}
module.exports = exports['default'];
