'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateEsError = decorateEsError;

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _lodash = require('lodash');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _elasticsearch$errors = _elasticsearch2.default.errors;
const ConnectionFault = _elasticsearch$errors.ConnectionFault,
      ServiceUnavailable = _elasticsearch$errors.ServiceUnavailable,
      NoConnections = _elasticsearch$errors.NoConnections,
      RequestTimeout = _elasticsearch$errors.RequestTimeout,
      Conflict = _elasticsearch$errors.Conflict,
      NotAuthorized = _elasticsearch$errors[401],
      Forbidden = _elasticsearch$errors[403],
      NotFound = _elasticsearch$errors.NotFound,
      BadRequest = _elasticsearch$errors.BadRequest;
function decorateEsError(error) {
  if (!(error instanceof Error)) {
    throw new Error('Expected an instance of Error');
  }

  var _get = (0, _lodash.get)(error, 'body.error', {});

  const reason = _get.reason;

  if (error instanceof ConnectionFault || error instanceof ServiceUnavailable || error instanceof NoConnections || error instanceof RequestTimeout) {
    return (0, _errors.decorateEsUnavailableError)(error, reason);
  }

  if (error instanceof Conflict) {
    return (0, _errors.decorateConflictError)(error, reason);
  }

  if (error instanceof NotAuthorized) {
    return (0, _errors.decorateNotAuthorizedError)(error, reason);
  }

  if (error instanceof Forbidden) {
    return (0, _errors.decorateForbiddenError)(error, reason);
  }

  if (error instanceof NotFound) {
    return (0, _errors.createGenericNotFoundError)();
  }

  if (error instanceof BadRequest) {
    return (0, _errors.decorateBadRequestError)(error, reason);
  }

  return (0, _errors.decorateGeneralError)(error, reason);
}
