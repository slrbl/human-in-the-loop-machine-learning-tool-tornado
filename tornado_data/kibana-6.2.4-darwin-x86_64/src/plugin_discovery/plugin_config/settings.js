'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = undefined;

let getDeprecationTransformer = (() => {
  var _ref = _asyncToGenerator(function* (spec) {
    const provider = spec.getDeprecationsProvider() || _lodash.noop;
    return (0, _deprecation.createTransform)((yield provider(_deprecation.Deprecations)) || []);
  });

  return function getDeprecationTransformer(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *  Get the settings for a pluginSpec from the raw root settings while
 *  optionally calling logDeprecation() with warnings about deprecated
 *  settings that were used
 *  @param  {PluginSpec} spec
 *  @param  {Object} rootSettings
 *  @param  {Function} [logDeprecation]
 *  @return {Promise<Object>}
 */


let getSettings = exports.getSettings = (() => {
  var _ref2 = _asyncToGenerator(function* (spec, rootSettings, logDeprecation) {
    const prefix = spec.getConfigPrefix();
    const transformer = yield getDeprecationTransformer(spec);
    const rawSettings = (0, _lodash.get)(serverConfig.transformDeprecations(rootSettings), prefix);
    return transformer(rawSettings, logDeprecation);
  });

  return function getSettings(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _config = require('../../server/config');

var serverConfig = _interopRequireWildcard(_config);

var _deprecation = require('../../deprecation');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
