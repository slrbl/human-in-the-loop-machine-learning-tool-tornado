'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildRequest;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _agg_body = require('./agg_body');

var _create_date_agg = require('./create_date_agg');

var _create_date_agg2 = _interopRequireDefault(_create_date_agg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildRequest(config, tlConfig, scriptedFields) {

  const bool = { must: [] };

  const timeFilter = { range: {} };
  timeFilter.range[config.timefield] = { gte: tlConfig.time.from, lte: tlConfig.time.to, format: 'epoch_millis' };
  bool.must.push(timeFilter);

  // Use the kibana filter bar filters
  if (config.kibana) {
    bool.filter = _lodash2.default.get(tlConfig, 'request.payload.extended.es.filter');
  }

  const aggs = {
    'q': {
      meta: { type: 'split' },
      filters: {
        filters: _lodash2.default.chain(config.q).map(function (q) {
          return [q, { query_string: { query: q } }];
        }).zipObject().value()
      },
      aggs: {}
    }
  };

  let aggCursor = aggs.q.aggs;

  _lodash2.default.each(config.split, function (clause) {
    clause = clause.split(':');
    if (clause[0] && clause[1]) {
      const termsAgg = (0, _agg_body.buildAggBody)(clause[0], scriptedFields);
      termsAgg.size = parseInt(clause[1], 10);
      aggCursor[clause[0]] = {
        meta: { type: 'split' },
        terms: termsAgg,
        aggs: {}
      };
      aggCursor = aggCursor[clause[0]].aggs;
    } else {
      throw new Error('`split` requires field:limit');
    }
  });

  _lodash2.default.assign(aggCursor, (0, _create_date_agg2.default)(config, tlConfig, scriptedFields));

  return {
    index: config.index,
    body: {
      query: {
        bool: bool
      },
      aggs: aggs,
      size: 0
    }
  };
}
module.exports = exports['default'];
