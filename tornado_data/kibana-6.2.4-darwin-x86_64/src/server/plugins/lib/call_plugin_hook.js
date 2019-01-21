'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callPluginHook = undefined;

let callPluginHook = exports.callPluginHook = (() => {
  var _ref = _asyncToGenerator(function* (hookName, plugins, id, history) {
    const plugin = plugins.find(function (plugin) {
      return plugin.id === id;
    });

    // make sure this is a valid plugin id
    if (!plugin) {
      if (history.length) {
        throw new Error(`Unmet requirement "${id}" for plugin "${(0, _lodash.last)(history)}"`);
      } else {
        throw new Error(`Unknown plugin "${id}"`);
      }
    }

    const circleStart = history.indexOf(id);
    const path = [...history, id];

    // make sure we are not trying to load a dependency within itself
    if (circleStart > -1) {
      const circle = path.slice(circleStart);
      throw new Error(`circular dependency found: "${circle.join(' -> ')}"`);
    }

    // call hook on all dependencies
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugin.requiredIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const req = _step.value;

        yield callPluginHook(hookName, plugins, req, path);
      }

      // call hook on this plugin
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

    yield plugin[hookName]();
  });

  return function callPluginHook(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
