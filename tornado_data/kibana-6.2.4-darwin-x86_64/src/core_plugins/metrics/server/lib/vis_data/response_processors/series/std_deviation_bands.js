'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stdDeviationBands;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _map_bucket = require('../../helpers/map_bucket');

var _map_bucket2 = _interopRequireDefault(_map_bucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdDeviationBands(resp, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);
    if (metric.type === 'std_deviation' && metric.mode === 'band') {
      (0, _get_splits2.default)(resp, panel, series).forEach(split => {
        const upper = split.timeseries.buckets.map((0, _map_bucket2.default)(_lodash2.default.assign({}, metric, { mode: 'upper' })));
        const lower = split.timeseries.buckets.map((0, _map_bucket2.default)(_lodash2.default.assign({}, metric, { mode: 'lower' })));
        results.push({
          id: `${split.id}:upper`,
          label: split.label,
          color: split.color,
          lines: { show: true, fill: 0.5, lineWidth: 0 },
          points: { show: false },
          fillBetween: `${split.id}:lower`,
          data: upper
        });
        results.push({
          id: `${split.id}:lower`,
          color: split.color,
          lines: { show: true, fill: false, lineWidth: 0 },
          points: { show: false },
          data: lower
        });
      });
    }
    return next(results);
  };
}
module.exports = exports['default'];
