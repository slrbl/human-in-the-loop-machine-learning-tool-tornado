'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValueSuggestions = registerValueSuggestions;

var _handle_es_error = require('../../../lib/handle_es_error');

var _handle_es_error2 = _interopRequireDefault(_handle_es_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function registerValueSuggestions(server) {
  server.route({
    path: '/api/kibana/suggestions/values/{index}',
    method: ['POST'],
    handler: (() => {
      var _ref = _asyncToGenerator(function* (req, reply) {
        const index = req.params.index;
        var _req$payload = req.payload;
        const field = _req$payload.field,
              query = _req$payload.query;

        var _server$plugins$elast = server.plugins.elasticsearch.getCluster('data');

        const callWithRequest = _server$plugins$elast.callWithRequest;

        const body = getBody({ field, query });
        try {
          const response = yield callWithRequest(req, 'search', { index, body });
          const suggestions = response.aggregations.suggestions.buckets.map(function (bucket) {
            return bucket.key;
          });
          reply(suggestions);
        } catch (error) {
          reply((0, _handle_es_error2.default)(error));
        }
      });

      function handler(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return handler;
    })()
  });
}

function getBody({ field, query }) {
  // Helps ensure that the regex is not evaluated eagerly against the terms dictionary
  const executionHint = 'map';

  // Helps keep the number of buckets that need to be tracked at the shard level contained in case
  // this is a high cardinality field
  const terminateAfter = 100000;

  // We don't care about the accuracy of the counts, just the content of the terms, so this reduces
  // the amount of information that needs to be transmitted to the coordinating node
  const shardSize = 10;

  return {
    size: 0,
    timeout: '1s',
    terminate_after: terminateAfter,
    aggs: {
      suggestions: {
        terms: {
          field,
          include: `${getEscapedQuery(query)}.*`,
          execution_hint: executionHint,
          shard_size: shardSize
        }
      }
    }
  };
}

function getEscapedQuery(query = '') {
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#_standard_operators
  return query.replace(/[.?+*|{}[\]()"\\#@&<>~]/g, match => `\\${match}`);
}
