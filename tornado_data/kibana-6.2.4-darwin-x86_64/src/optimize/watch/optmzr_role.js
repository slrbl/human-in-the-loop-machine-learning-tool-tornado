'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _watch_server = require('./watch_server');

var _watch_server2 = _interopRequireDefault(_watch_server);

var _watch_optimizer = require('./watch_optimizer');

var _watch_optimizer2 = _interopRequireDefault(_watch_optimizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, kibanaHapiServer, config) {
    const server = new _watch_server2.default(config.get('optimize.watchHost'), config.get('optimize.watchPort'), config.get('server.basePath'), new _watch_optimizer2.default({
      log: function log(tags, data) {
        return kibanaHapiServer.log(tags, data);
      },
      uiBundles: kbnServer.uiBundles,
      profile: config.get('optimize.profile'),
      sourceMaps: config.get('optimize.sourceMaps'),
      prebuild: config.get('optimize.watchPrebuild'),
      unsafeCache: config.get('optimize.unsafeCache')
    }));

    let ready = false;

    const sendReady = function sendReady() {
      if (!process.connected) return;
      process.send(['WORKER_BROADCAST', { optimizeReady: ready }]);
    };

    process.on('message', function (msg) {
      if (msg && msg.optimizeReady === '?') sendReady();
    });

    sendReady();

    yield server.init();

    ready = true;
    sendReady();
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
