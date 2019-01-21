'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _datasource = require('../../lib/classes/datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _build_request = require('./lib/build_request');

var _build_request2 = _interopRequireDefault(_build_request);

var _agg_response_to_series_list = require('./lib/agg_response_to_series_list');

var _agg_response_to_series_list2 = _interopRequireDefault(_agg_response_to_series_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _datasource2.default('es', {
  args: [{
    name: 'q',
    types: ['string', 'null'],
    multi: true,
    help: 'Query in lucene query string syntax'
  }, {
    name: 'metric',
    types: ['string', 'null'],
    multi: true,
    help: 'An elasticsearch metric agg: avg, sum, min, max, percentiles or cardinality, followed by a field.' + ' Eg "sum:bytes", "percentiles:bytes:95,99,99.9" or just "count"'
  }, {
    name: 'split',
    types: ['string', 'null'],
    multi: true,
    help: 'An elasticsearch field to split the series on and a limit. Eg, "hostname:10" to get the top 10 hostnames'
  }, {
    name: 'index',
    types: ['string', 'null'],
    help: 'Index to query, wildcards accepted. Provide Index Pattern name for scripted fields and ' + 'field name type ahead suggestions for metrics, split, and timefield arguments.'
  }, {
    name: 'timefield',
    types: ['string', 'null'],
    help: 'Field of type "date" to use for x-axis'
  }, {
    name: 'kibana',
    types: ['boolean', 'null'],
    help: 'Respect filters on Kibana dashboards. Only has an effect when using on Kibana dashboards'
  }, {
    name: 'interval', // You really shouldn't use this, use the interval picker instead
    types: ['string', 'null'],
    help: '**DO NOT USE THIS**. Its fun for debugging fit functions, but you really should use the interval picker'
  }],
  help: 'Pull data from an elasticsearch instance',
  aliases: ['elasticsearch'],
  fn: (() => {
    var _ref = _asyncToGenerator(function* (args, tlConfig) {

      const config = _lodash2.default.defaults(_lodash2.default.clone(args.byName), {
        q: '*',
        metric: ['count'],
        index: tlConfig.settings['timelion:es.default_index'],
        timefield: tlConfig.settings['timelion:es.timefield'],
        interval: tlConfig.time.interval,
        kibana: true,
        fit: 'nearest'
      });

      const findResp = yield tlConfig.request.getSavedObjectsClient().find({
        type: 'index-pattern',
        fields: ['title', 'fields'],
        search: `"${config.index}"`,
        search_fields: ['title']
      });
      const indexPatternSavedObject = findResp.saved_objects.find(function (savedObject) {
        return savedObject.attributes.title === config.index;
      });
      let scriptedFields = [];
      if (indexPatternSavedObject) {
        const fields = JSON.parse(indexPatternSavedObject.attributes.fields);
        scriptedFields = fields.filter(function (field) {
          return field.scripted;
        });
      }

      const body = (0, _build_request2.default)(config, tlConfig, scriptedFields);

      var _tlConfig$server$plug = tlConfig.server.plugins.elasticsearch.getCluster('data');

      const callWithRequest = _tlConfig$server$plug.callWithRequest;

      const resp = yield callWithRequest(tlConfig.request, 'search', body);
      if (!resp._shards.total) throw new Error('Elasticsearch index not found: ' + config.index);
      return {
        type: 'seriesList',
        list: (0, _agg_response_to_series_list2.default)(resp.aggregations, config)
      };
    });

    function esFn(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return esFn;
  })()
});
module.exports = exports['default'];
