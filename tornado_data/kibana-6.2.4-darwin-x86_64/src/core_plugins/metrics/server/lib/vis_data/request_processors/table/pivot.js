'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pivot;

var _lodash = require('lodash');

var _basic_aggs = require('../../../../../common/basic_aggs');

var _basic_aggs2 = _interopRequireDefault(_basic_aggs);

var _get_buckets_path = require('../../helpers/get_buckets_path');

var _get_buckets_path2 = _interopRequireDefault(_get_buckets_path);

var _bucket_transform = require('../../helpers/bucket_transform');

var _bucket_transform2 = _interopRequireDefault(_bucket_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pivot(req, panel) {
  return next => doc => {
    const sort = req.payload.state.sort;

    if (panel.pivot_id) {
      (0, _lodash.set)(doc, 'aggs.pivot.terms.field', panel.pivot_id);
      (0, _lodash.set)(doc, 'aggs.pivot.terms.size', panel.pivot_rows);
      if (sort) {
        const series = panel.series.find(item => item.id === sort.column);
        const metric = series && (0, _lodash.last)(series.metrics);
        if (metric && metric.type === 'count') {
          (0, _lodash.set)(doc, 'aggs.pivot.terms.order', { _count: sort.order });
        } else if (metric && _basic_aggs2.default.includes(metric.type)) {
          const sortAggKey = `${metric.id}-SORT`;
          const fn = _bucket_transform2.default[metric.type];
          const bucketPath = (0, _get_buckets_path2.default)(metric.id, series.metrics).replace(metric.id, sortAggKey);
          (0, _lodash.set)(doc, `aggs.pivot.terms.order`, { [bucketPath]: sort.order });
          (0, _lodash.set)(doc, `aggs.pivot.aggs`, { [sortAggKey]: fn(metric) });
        } else {
          (0, _lodash.set)(doc, 'aggs.pivot.terms.order', { _term: (0, _lodash.get)(sort, 'order', 'asc') });
        }
      }
    } else {
      (0, _lodash.set)(doc, 'aggs.pivot.filter.match_all', {});
    }
    return next(doc);
  };
}
module.exports = exports['default'];
