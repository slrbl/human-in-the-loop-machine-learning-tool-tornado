'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build_request_body = require('./build_request_body');

var _build_request_body2 = _interopRequireDefault(_build_request_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, panel, entities) => {
  const bodies = [];
  entities.forEach(entity => {
    bodies.push({
      index: panel.index_pattern,
      ignore: [404],
      timeout: '90s',
      requestTimeout: 90000,
      ignoreUnavailable: true
    });
    bodies.push((0, _build_request_body2.default)(req, panel, entity));
  });
  return bodies;
};

module.exports = exports['default'];
