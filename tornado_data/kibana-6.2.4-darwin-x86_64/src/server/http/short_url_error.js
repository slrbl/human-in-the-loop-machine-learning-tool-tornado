'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShortUrlError = handleShortUrlError;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleShortUrlError(error) {
  return _boom2.default.boomify(error, {
    statusCode: error.statusCode || error.status || 500
  });
}
