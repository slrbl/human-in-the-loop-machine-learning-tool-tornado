'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnData = getColumnData;

var _get_request_params = require('./get_request_params');

var _get_request_params2 = _interopRequireDefault(_get_request_params);

var _handle_response_body = require('./handle_response_body');

var _handle_response_body2 = _interopRequireDefault(_handle_response_body);

var _handle_error_response = require('../handle_error_response');

var _handle_error_response2 = _interopRequireDefault(_handle_error_response);

var _get_last_value = require('../../../../common/get_last_value');

var _get_last_value2 = _interopRequireDefault(_get_last_value);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _regression = require('regression');

var _regression2 = _interopRequireDefault(_regression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getColumnData(req, panel, entities, client) {
  const elasticsearch = _lodash2.default.get(req, 'server.plugins.elasticsearch');
  if (elasticsearch) {
    var _elasticsearch$getClu = elasticsearch.getCluster('data');

    const callWithRequest = _elasticsearch$getClu.callWithRequest;

    if (!client) {
      client = callWithRequest.bind(null, req);
    }
  }
  const params = {
    body: (0, _get_request_params2.default)(req, panel, entities)
  };
  return client('msearch', params).then(resp => {
    const handler = (0, _handle_response_body2.default)(panel);
    return entities.map((entity, index) => {
      entity.data = {};
      handler(resp.responses[index]).forEach(row => {
        const linearRegression = (0, _regression2.default)('linear', row.data);
        entity.data[row.id] = {
          last: (0, _get_last_value2.default)(row.data),
          slope: linearRegression.equation[0],
          yIntercept: linearRegression.equation[1],
          label: row.label
        };
      });
      return entity;
    });
  }).catch((0, _handle_error_response2.default)(panel));
}
