'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs_optimizer = require('./fs_optimizer');

var _fs_optimizer2 = _interopRequireDefault(_fs_optimizer);

var _bundles_route = require('./bundles_route');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    if (!config.get('optimize.enabled')) return;

    // the watch optimizer sets up two threads, one is the server listening
    // on 5601 and the other is a server listening on 5602 that builds the
    // bundles in a "middleware" style.
    //
    // the server listening on 5601 may be restarted a number of times, depending
    // on the watch setup managed by the cli. It proxies all bundles/* requests to
    // the other server. The server on 5602 is long running, in order to prevent
    // complete rebuilds of the optimize content.
    const watch = config.get('optimize.watch');
    if (watch) {
      return yield kbnServer.mixin(require('./watch/watch'));
    }

    const uiBundles = kbnServer.uiBundles;

    server.route((0, _bundles_route.createBundlesRoute)({
      bundlesPath: uiBundles.getWorkingDir(),
      basePublicPath: config.get('server.basePath')
    }));

    yield uiBundles.writeEntryFiles();

    // Not all entry files produce a css asset. Ensuring they exist prevents
    // an error from occuring when the file is missing.
    yield uiBundles.ensureStyleFiles();

    // in prod, only bundle when someing is missing or invalid
    const reuseCache = config.get('optimize.useBundleCache') ? yield uiBundles.areAllBundleCachesValid() : false;

    // we might not have any work to do
    if (reuseCache) {
      server.log(['debug', 'optimize'], `All bundles are cached and ready to go!`);
      return;
    }

    // only require the FsOptimizer when we need to
    const optimizer = new _fs_optimizer2.default({
      uiBundles,
      profile: config.get('optimize.profile'),
      sourceMaps: config.get('optimize.sourceMaps'),
      unsafeCache: config.get('optimize.unsafeCache')
    });

    server.log(['info', 'optimize'], `Optimizing and caching ${uiBundles.getDescription()}. This may take a few minutes`);

    const start = Date.now();
    yield optimizer.run();
    const seconds = ((Date.now() - start) / 1000).toFixed(2);

    server.log(['info', 'optimize'], `Optimization of ${uiBundles.getDescription()} complete in ${seconds} seconds`);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
