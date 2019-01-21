'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiBundlesMixin = undefined;

let uiBundlesMixin = exports.uiBundlesMixin = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer) {
    kbnServer.uiBundles = new _ui_bundles_controller.UiBundlesController(kbnServer);

    var _kbnServer$uiExports$ = kbnServer.uiExports.uiBundleProviders;
    const uiBundleProviders = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = uiBundleProviders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const spec = _step.value;

        yield spec(kbnServer);
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

  return function uiBundlesMixin(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _ui_bundles_controller = require('./ui_bundles_controller');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
