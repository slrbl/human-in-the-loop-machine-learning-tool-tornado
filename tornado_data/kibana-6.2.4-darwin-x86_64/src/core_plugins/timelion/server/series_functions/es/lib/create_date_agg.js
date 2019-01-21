'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDateAgg;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _agg_body = require('./agg_body');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDateAgg(config, tlConfig, scriptedFields) {
  const dateAgg = {
    time_buckets: {
      meta: { type: 'time_buckets' },
      date_histogram: {
        field: config.timefield,
        interval: config.interval,
        time_zone: tlConfig.time.timezone,
        extended_bounds: {
          min: tlConfig.time.from,
          max: tlConfig.time.to
        },
        min_doc_count: 0
      }
    }
  };

  dateAgg.time_buckets.aggs = {};
  _lodash2.default.each(config.metric, function (metric) {
    metric = metric.split(':');
    if (metric[0] === 'count') {
      // This is pretty lame, but its how the "doc_count" metric has to be implemented at the moment
      // It simplifies the aggregation tree walking code considerably
      dateAgg.time_buckets.aggs[metric] = {
        bucket_script: {
          buckets_path: '_count',
          script: { inline: '_value', lang: 'expression' }
        }
      };
    } else if (metric[0] && metric[1]) {
      const metricName = metric[0] + '(' + metric[1] + ')';
      dateAgg.time_buckets.aggs[metricName] = {};
      dateAgg.time_buckets.aggs[metricName][metric[0]] = (0, _agg_body.buildAggBody)(metric[1], scriptedFields);
      if (metric[0] === 'percentiles' && metric[2]) {
        let percentList = metric[2].split(',');
        percentList = percentList.map(x => parseFloat(x));
        dateAgg.time_buckets.aggs[metricName][metric[0]].percents = percentList;
      }
    } else {
      throw new Error('`metric` requires metric:field or simply count');
    }
  });

  return dateAgg;
}
module.exports = exports['default'];
