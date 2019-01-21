'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPluginSpecs = findPluginSpecs;

var _rxjs = require('rxjs');

var _config = require('../server/config');

var _plugin_config = require('./plugin_config');

var _plugin_pack = require('./plugin_pack');

var _errors = require('./errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function defaultConfig(settings) {
  return _config.Config.withDefaultSchema((0, _config.transformDeprecations)(settings));
}

function bufferAllResults(observable) {
  return observable
  // buffer all results into a single array
  .toArray()
  // merge the array back into the stream when complete
  .mergeMap(array => array);
}

/**
 *  Creates a collection of observables for discovering pluginSpecs
 *  using Kibana's defaults, settings, and config service
 *
 *  @param {Object} settings
 *  @param {ConfigService} [config] when supplied **it is mutated** to include
 *                                  the config from discovered plugin specs
 *  @return {Object<name,Rx>}
 */
function findPluginSpecs(settings, config = defaultConfig(settings)) {
  // find plugin packs in configured paths/dirs
  const find$ = _rxjs.Observable.merge(...config.get('plugins.paths').map(_plugin_pack.createPackAtPath$), ...config.get('plugins.scanDirs').map(_plugin_pack.createPacksInDirectory$)).share();

  const extendConfig$ = find$
  // get the specs for each found plugin pack
  .mergeMap(({ pack }) => pack ? pack.getPluginSpecs() : []).mergeMap((() => {
    var _ref = _asyncToGenerator(function* (spec) {
      // extend the config service with this plugin spec and
      // collect its deprecations messages if some of its
      // settings are outdated
      const deprecations = [];
      yield (0, _plugin_config.extendConfigService)(spec, config, settings, function (message) {
        deprecations.push({ spec, message });
      });

      return {
        spec,
        deprecations
      };
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })())
  // extend the config with all plugins before determining enabled status
  .let(bufferAllResults).map(({ spec, deprecations }) => {
    const isRightVersion = spec.isVersionCompatible(config.get('pkg.version'));
    const enabled = isRightVersion && spec.isEnabled(config);
    return {
      spec,
      deprecations,
      enabledSpecs: enabled ? [spec] : [],
      disabledSpecs: enabled ? [] : [spec],
      invalidVersionSpecs: isRightVersion ? [] : [spec]
    };
  })
  // determine which plugins are disabled before actually removing things from the config
  .let(bufferAllResults).do(result => {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = result.disabledSpecs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const spec = _step.value;

        (0, _plugin_config.disableConfigExtension)(spec, config);
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
  }).share();

  return {
    // plugin packs found when searching configured paths
    pack$: find$.mergeMap(result => result.pack ? [result.pack] : []),

    // errors caused by invalid directories of plugin directories
    invalidDirectoryError$: find$.mergeMap(result => (0, _errors.isInvalidDirectoryError)(result.error) ? [result.error] : []),

    // errors caused by directories that we expected to be plugin but were invalid
    invalidPackError$: find$.mergeMap(result => (0, _errors.isInvalidPackError)(result.error) ? [result.error] : []),

    // { spec, message } objects produced when transforming deprecated
    // settings for a plugin spec
    deprecation$: extendConfig$.mergeMap(result => result.deprecations),

    // the config service we extended with all of the plugin specs,
    // only emitted once it is fully extended by all
    extendedConfig$: extendConfig$.ignoreElements().concat([config]),

    // all enabled PluginSpec objects
    spec$: extendConfig$.mergeMap(result => result.enabledSpecs),

    // all disabled PluginSpec objects
    disabledSpecs$: extendConfig$.mergeMap(result => result.disabledSpecs),

    // all PluginSpec objects that were disabled because their version was incompatible
    invalidVersionSpec$: extendConfig$.mergeMap(result => result.invalidVersionSpecs)
  };
}
