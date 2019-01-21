'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build_request_body = require('./build_request_body');

var _build_request_body2 = _interopRequireDefault(_build_request_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, panel, series) => {
  const indexPattern = series.override_index_pattern && series.series_index_pattern || panel.index_pattern;
  const bodies = [];

  bodies.push({
    index: indexPattern,
    ignore: [404],
    timeout: '90s',
    requestTimeout: 90000,
    ignoreUnavailable: true
  });

  bodies.push((0, _build_request_body2.default)(req, panel, series));
  return bodies;
};

module.exports = exports['default'];
