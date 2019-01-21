'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stdDeviationSibling;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _get_sibling_agg_value = require('../../helpers/get_sibling_agg_value');

var _get_sibling_agg_value2 = _interopRequireDefault(_get_sibling_agg_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdDeviationSibling(resp, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);
    if (metric.mode === 'band' && metric.type === 'std_deviation_bucket') {
      (0, _get_splits2.default)(resp, panel, series).forEach(split => {

        const mapBucketByMode = mode => {
          return bucket => {
            return [bucket.key, (0, _get_sibling_agg_value2.default)(split, _lodash2.default.assign({}, metric, { mode }))];
          };
        };

        const upperData = split.timeseries.buckets.map(mapBucketByMode('upper'));
        const lowerData = split.timeseries.buckets.map(mapBucketByMode('lower'));

        results.push({
          id: `${split.id}:lower`,
          lines: { show: true, fill: false, lineWidth: 0 },
          points: { show: false },
          color: split.color,
          data: lowerData
        });
        results.push({
          id: `${split.id}:upper`,
          label: split.label,
          color: split.color,
          lines: { show: true, fill: 0.5, lineWidth: 0 },
          points: { show: false },
          fillBetween: `${split.id}:lower`,
          data: upperData
        });
      });
    }

    return next(results);
  };
}
module.exports = exports['default'];
