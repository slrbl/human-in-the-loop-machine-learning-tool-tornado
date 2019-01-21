'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleESError;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _elasticsearch = require('elasticsearch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleESError(error) {
  if (!(error instanceof Error)) {
    throw new Error('Expected an instance of Error');
  }

  if (error instanceof _elasticsearch.errors.ConnectionFault || error instanceof _elasticsearch.errors.ServiceUnavailable || error instanceof _elasticsearch.errors.NoConnections || error instanceof _elasticsearch.errors.RequestTimeout) {
    return _boom2.default.serverUnavailable(error);
  } else if (error instanceof _elasticsearch.errors.Conflict || _lodash2.default.contains(error.message, 'index_template_already_exists')) {
    return _boom2.default.conflict(error);
  } else if (error instanceof _elasticsearch.errors[403]) {
    return _boom2.default.forbidden(error);
  } else if (error instanceof _elasticsearch.errors.NotFound) {
    return _boom2.default.notFound(error);
  } else if (error instanceof _elasticsearch.errors.BadRequest) {
    return _boom2.default.badRequest(error);
  } else {
    return error;
  }
}
module.exports = exports['default'];
