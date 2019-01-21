'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log_format = require('./log_format');

var _log_format2 = _interopRequireDefault(_log_format);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stripColors = function stripColors(string) {
  return string.replace(/\u001b[^m]+m/g, '');
};

class KbnLoggerJsonFormat extends _log_format2.default {
  format(data) {
    data.message = stripColors(data.message);
    data['@timestamp'] = this.extractAndFormatTimestamp(data);
    return (0, _jsonStringifySafe2.default)(data);
  }
}
exports.default = KbnLoggerJsonFormat;
module.exports = exports['default'];
