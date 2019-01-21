'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildAnnotationRequest;

var _build_processor_function = require('./build_processor_function');

var _build_processor_function2 = _interopRequireDefault(_build_processor_function);

var _annotations = require('./request_processors/annotations');

var _annotations2 = _interopRequireDefault(_annotations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildAnnotationRequest(req, panel, annotation) {
  const processor = (0, _build_processor_function2.default)(_annotations2.default, req, panel, annotation);
  const doc = processor({});
  return doc;
}
module.exports = exports['default'];
