'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build_processor_function = require('../build_processor_function');

var _build_processor_function2 = _interopRequireDefault(_build_processor_function);

var _table = require('../request_processors/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildRequestBody(req, panel) {
  const processor = (0, _build_processor_function2.default)(_table2.default, req, panel);
  const doc = processor({});
  return doc;
}

exports.default = buildRequestBody;
module.exports = exports['default'];
