'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let waitForInitResolveMixin = exports.waitForInitResolveMixin = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    const queue = queues.get(kbnServer);
    queues.set(kbnServer, null);

    // only actually call the callbacks if we are really initializing
    if (config.get('plugins.initialize')) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const cb = _step.value;

          yield cb();
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
    }
  });

  return function waitForInitResolveMixin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.waitForInitSetupMixin = waitForInitSetupMixin;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Tracks the individual queue for each kbnServer, rather than attaching
 * it to the kbnServer object via a property or something
 * @type {WeakMap}
 */
const queues = new WeakMap();

function waitForInitSetupMixin(kbnServer) {
  queues.set(kbnServer, []);

  kbnServer.afterPluginsInit = function (callback) {
    const queue = queues.get(kbnServer);

    if (!queue) {
      throw new Error('Plugins have already initialized. Only use this method for setup logic that must wait for plugins to initialize.');
    }

    queue.push(callback);
  };
}
