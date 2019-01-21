'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = percentile;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_agg_value = require('../../helpers/get_agg_value');

var _get_agg_value2 = _interopRequireDefault(_get_agg_value);

var _get_default_decoration = require('../../helpers/get_default_decoration');

var _get_default_decoration2 = _interopRequireDefault(_get_default_decoration);

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function percentile(resp, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);
    if (metric.type !== 'percentile') return next(results);

    (0, _get_splits2.default)(resp, panel, series).forEach(split => {
      metric.percentiles.forEach(percentile => {
        const label = split.label + ` (${percentile.value})`;
        const data = split.timeseries.buckets.map(bucket => {
          const m = _lodash2.default.assign({}, metric, { percent: percentile.value });
          return [bucket.key, (0, _get_agg_value2.default)(bucket, m)];
        });
        if (percentile.mode === 'band') {
          const fillData = split.timeseries.buckets.map(bucket => {
            const m = _lodash2.default.assign({}, metric, { percent: percentile.percentile });
            return [bucket.key, (0, _get_agg_value2.default)(bucket, m)];
          });
          results.push({
            id: `${percentile.id}:${split.id}`,
            color: split.color,
            label,
            data,
            lines: { show: true, fill: percentile.shade, lineWidth: 0 },
            points: { show: false },
            legend: false,
            fillBetween: `${percentile.id}:${split.id}:${percentile.percentile}`
          });
          results.push({
            id: `${percentile.id}:${split.id}:${percentile.percentile}`,
            color: split.color,
            label,
            data: fillData,
            lines: { show: true, fill: false, lineWidth: 0 },
            legend: false,
            points: { show: false }
          });
        } else {
          const decoration = (0, _get_default_decoration2.default)(series);
          results.push(_extends({
            id: `${percentile.id}:${split.id}`,
            color: split.color,
            label,
            data
          }, decoration));
        }
      });
    });
    return next(results);
  };
}
module.exports = exports['default'];
