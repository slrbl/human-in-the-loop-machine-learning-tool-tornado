'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleResponseBody;

var _build_processor_function = require('../build_processor_function');

var _build_processor_function2 = _interopRequireDefault(_build_processor_function);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _table = require('../response_processors/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleResponseBody(panel) {
  return resp => {
    if (resp.error) {
      const err = new Error(resp.error.type);
      err.response = JSON.stringify(resp);
      throw err;
    }
    return panel.columns.map(column => {
      const processor = (0, _build_processor_function2.default)(_table2.default, resp, panel, column);
      return _lodash2.default.first(processor([]));
    });
  };
}
module.exports = exports['default'];
