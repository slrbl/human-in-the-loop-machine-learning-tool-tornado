'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollSearchApi = scrollSearchApi;

var _handle_es_error = require('../../../lib/handle_es_error');

var _handle_es_error2 = _interopRequireDefault(_handle_es_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrollSearchApi(server) {
  server.route({
    path: '/api/kibana/legacy_scroll_start',
    method: ['POST'],
    handler: (req, reply) => {
      var _server$plugins$elast = server.plugins.elasticsearch.getCluster('admin');

      const callWithRequest = _server$plugins$elast.callWithRequest;
      var _req$payload = req.payload;
      const index = _req$payload.index,
            size = _req$payload.size,
            body = _req$payload.body;

      const params = {
        index,
        size,
        body,
        scroll: '1m',
        sort: '_doc'
      };
      return callWithRequest(req, 'search', params).then(reply).catch(error => reply((0, _handle_es_error2.default)(error)));
    }
  });

  server.route({
    path: '/api/kibana/legacy_scroll_continue',
    method: ['POST'],
    handler: (req, reply) => {
      var _server$plugins$elast2 = server.plugins.elasticsearch.getCluster('admin');

      const callWithRequest = _server$plugins$elast2.callWithRequest;
      const scrollId = req.payload.scrollId;

      return callWithRequest(req, 'scroll', { scrollId, scroll: '1m' }).then(reply).catch(error => reply((0, _handle_es_error2.default)(error)));
    }
  });
}
