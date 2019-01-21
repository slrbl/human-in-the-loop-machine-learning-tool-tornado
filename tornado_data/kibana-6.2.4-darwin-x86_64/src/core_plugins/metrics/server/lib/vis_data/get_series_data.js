'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeriesData = getSeriesData;

var _get_request_params = require('./series/get_request_params');

var _get_request_params2 = _interopRequireDefault(_get_request_params);

var _handle_response_body = require('./series/handle_response_body');

var _handle_response_body2 = _interopRequireDefault(_handle_response_body);

var _handle_error_response = require('./handle_error_response');

var _handle_error_response2 = _interopRequireDefault(_handle_error_response);

var _get_annotations = require('./get_annotations');

var _get_annotations2 = _interopRequireDefault(_get_annotations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSeriesData(req, panel) {
  var _req$server$plugins$e = req.server.plugins.elasticsearch.getCluster('data');

  const callWithRequest = _req$server$plugins$e.callWithRequest;

  const bodies = panel.series.map(series => (0, _get_request_params2.default)(req, panel, series));
  const params = {
    body: bodies.reduce((acc, items) => acc.concat(items), [])
  };
  return callWithRequest(req, 'msearch', params).then(resp => {
    const series = resp.responses.map((0, _handle_response_body2.default)(panel));
    return {
      [panel.id]: {
        id: panel.id,
        series: series.reduce((acc, series) => acc.concat(series), [])
      }
    };
  }).then(resp => {
    if (!panel.annotations || panel.annotations.length === 0) return resp;
    return (0, _get_annotations2.default)(req, panel).then(annotations => {
      resp[panel.id].annotations = annotations;
      return resp;
    });
  }).then(resp => {
    resp.type = panel.type;
    return resp;
  }).catch((0, _handle_error_response2.default)(panel));
}
