'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (server) {
  server.route({
    method: ['POST', 'GET'],
    path: '/api/timelion/run',
    handler: (() => {
      var _ref = _asyncToGenerator(function* (request, reply) {
        try {
          const uiSettings = yield request.getUiSettingsService().getAll();

          const tlConfig = require('../handlers/lib/tl_config.js')({
            server,
            request,
            settings: _lodash2.default.defaults(uiSettings, timelionDefaults) // Just in case they delete some setting.
          });

          const chainRunner = (0, _chain_runner2.default)(tlConfig);
          const sheet = yield _bluebird2.default.all(chainRunner.processRequest(request.payload || {
            sheet: [request.query.expression],
            time: {
              from: request.query.from,
              to: request.query.to,
              interval: request.query.interval,
              timezone: request.query.timezone
            }
          }));

          reply({
            sheet,
            stats: chainRunner.getStats()
          });
        } catch (err) {
          server.log(['timelion', 'error'], `${err.toString()}: ${err.stack}`);
          // TODO Maybe we should just replace everywhere we throw with Boom? Probably.
          if (err.isBoom) {
            reply(err);
          } else {
            replyWithError(err, reply);
          }
        }
      });

      return function handler(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })()
  });
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chain_runner = require('../handlers/chain_runner.js');

var _chain_runner2 = _interopRequireDefault(_chain_runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const timelionDefaults = require('../lib/get_namespaced_settings')();

function replyWithError(e, reply) {
  reply({
    title: e.toString(),
    message: e.toString()
  }).code(500);
}

module.exports = exports['default'];
