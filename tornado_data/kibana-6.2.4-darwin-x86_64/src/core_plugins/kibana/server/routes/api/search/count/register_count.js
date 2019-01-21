'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerCount;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _handle_es_error = require('../../../../lib/handle_es_error');

var _handle_es_error2 = _interopRequireDefault(_handle_es_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerCount(server) {
  server.route({
    path: '/api/kibana/{id}/_count',
    method: ['POST', 'GET'],
    handler: function handler(req, reply) {
      var _server$plugins$elast = server.plugins.elasticsearch.getCluster('data');

      const callWithRequest = _server$plugins$elast.callWithRequest;

      const boundCallWithRequest = _lodash2.default.partial(callWithRequest, req);

      boundCallWithRequest('count', {
        allowNoIndices: false,
        index: req.params.id
      }).then(function (res) {
        reply({ count: res.count });
      }, function (error) {
        reply((0, _handle_es_error2.default)(error));
      });
    }
  });
}
module.exports = exports['default'];
