'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendConfigService = undefined;

/**
 *  Extend a config service with the schema and settings for a
 *  plugin spec and optionally call logDeprecation with warning
 *  messages about deprecated settings that are used
 *  @param  {PluginSpec} spec
 *  @param  {Server.Config} config
 *  @param  {Object} rootSettings
 *  @param  {Function} [logDeprecation]
 *  @return {Promise<undefined>}
 */
let extendConfigService = exports.extendConfigService = (() => {
  var _ref = _asyncToGenerator(function* (spec, config, rootSettings, logDeprecation) {
    const settings = yield (0, _settings.getSettings)(spec, rootSettings, logDeprecation);
    const schema = yield (0, _schema.getSchema)(spec);
    config.extendSchema(schema, settings, spec.getConfigPrefix());
  });

  return function extendConfigService(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *  Disable the schema and settings applied to a config service for
 *  a plugin spec
 *  @param  {PluginSpec} spec
 *  @param  {Server.Config} config
 *  @return {undefined}
 */


exports.disableConfigExtension = disableConfigExtension;

var _settings = require('./settings');

var _schema = require('./schema');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function disableConfigExtension(spec, config) {
  const prefix = spec.getConfigPrefix();
  config.removeSchema(prefix);
  config.extendSchema((0, _schema.getStubSchema)(), { enabled: false }, prefix);
}
