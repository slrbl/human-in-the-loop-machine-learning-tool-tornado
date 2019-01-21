'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cluster = require('cluster');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer) {

    if (!_cluster.isWorker) {
      throw new Error(`watch optimization is only available when using the "--dev" cli flag`);
    }

    /**
     * When running in watch mode two processes run in one of the following modes:
     *
     * optmzr: this process runs the WatchOptimizer and the WatchServer
     *   which serves the WatchOptimizer's output and blocks requests
     *   while the optimizer is running
     *
     * server: this process runs the entire kibana server and proxies
     *   all requests for /bundles/* to the optmzr process
     *
     * @param  {string} process.env.kbnWorkerType
     */
    switch (process.env.kbnWorkerType) {
      case 'optmzr':
        yield kbnServer.mixin(require('./optmzr_role'));
        break;

      case 'server':
        yield kbnServer.mixin(require('./proxy_role'));
        break;

      default:
        throw new Error(`unknown kbnWorkerType "${process.env.kbnWorkerType}"`);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
