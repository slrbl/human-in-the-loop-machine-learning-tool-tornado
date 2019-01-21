'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build_processor_function = require('../build_processor_function');

var _build_processor_function2 = _interopRequireDefault(_build_processor_function);

var _series = require('../request_processors/series');

var _series2 = _interopRequireDefault(_series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildRequestBody(req, panel, series) {
  const processor = (0, _build_processor_function2.default)(_series2.default, req, panel, series);
  const doc = processor({});
  return doc;
}

exports.default = buildRequestBody;
module.exports = exports['default'];
