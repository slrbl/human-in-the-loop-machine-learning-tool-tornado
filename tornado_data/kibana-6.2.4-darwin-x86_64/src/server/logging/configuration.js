'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loggingConfiguration;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _log_reporter = require('./log_reporter');

var _log_reporter2 = _interopRequireDefault(_log_reporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loggingConfiguration(config) {
  const events = config.get('logging.events');

  if (config.get('logging.silent')) {
    _lodash2.default.defaults(events, {});
  } else if (config.get('logging.quiet')) {
    _lodash2.default.defaults(events, {
      log: ['listening', 'error', 'fatal'],
      request: ['error'],
      error: '*'
    });
  } else if (config.get('logging.verbose')) {
    _lodash2.default.defaults(events, {
      log: '*',
      ops: '*',
      request: '*',
      response: '*',
      error: '*'
    });
  } else {
    _lodash2.default.defaults(events, {
      log: ['info', 'warning', 'error', 'fatal'],
      response: config.get('logging.json') ? '*' : '!',
      request: ['info', 'warning', 'error', 'fatal'],
      error: '*'
    });
  }

  const options = {
    opsInterval: config.get('ops.interval'),
    requestHeaders: true,
    requestPayload: true,
    reporters: [{
      reporter: _log_reporter2.default,
      config: {
        json: config.get('logging.json'),
        dest: config.get('logging.dest'),
        useUTC: config.get('logging.useUTC'),

        // I'm adding the default here because if you add another filter
        // using the commandline it will remove authorization. I want users
        // to have to explicitly set --logging.filter.authorization=none or
        // --logging.filter.cookie=none to have it show up in the logs.
        filter: _lodash2.default.defaults(config.get('logging.filter'), {
          authorization: 'remove',
          cookie: 'remove'
        })
      },
      events: _lodash2.default.transform(events, function (filtered, val, key) {
        // provide a string compatible way to remove events
        if (val !== '!') filtered[key] = val;
      }, {})
    }]
  };
  return options;
}
module.exports = exports['default'];
