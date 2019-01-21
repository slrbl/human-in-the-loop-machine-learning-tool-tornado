'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeMixin = undefined;

/**
 *  KbnServer mixin that initializes all plugins found in ./scan mixin
 *  @param  {KbnServer} kbnServer
 *  @param  {Hapi.Server} server
 *  @param  {Config} config
 *  @return {Promise<undefined>}
 */
let initializeMixin = exports.initializeMixin = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    let callHookOnPlugins = (() => {
      var _ref2 = _asyncToGenerator(function* (hookName) {
        const plugins = kbnServer.plugins;

        const ids = plugins.map(function (p) {
          return p.id;
        });

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const id = _step.value;

            yield (0, _lib.callPluginHook)(hookName, plugins, id, []);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });

      return function callHookOnPlugins(_x4) {
        return _ref2.apply(this, arguments);
      };
    })();

    if (!config.get('plugins.initialize')) {
      server.log(['info'], 'Plugin initialization disabled.');
      return;
    }

    yield callHookOnPlugins('preInit');
    yield callHookOnPlugins('init');
  });

  return function initializeMixin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _lib = require('./lib');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
