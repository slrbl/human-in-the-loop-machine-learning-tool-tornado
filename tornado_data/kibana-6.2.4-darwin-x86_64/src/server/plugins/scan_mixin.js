'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanMixin = undefined;

let scanMixin = exports.scanMixin = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    var _findPluginSpecs = (0, _plugin_discovery.findPluginSpecs)(kbnServer.settings, config);

    const pack$ = _findPluginSpecs.pack$,
          invalidDirectoryError$ = _findPluginSpecs.invalidDirectoryError$,
          invalidPackError$ = _findPluginSpecs.invalidPackError$,
          deprecation$ = _findPluginSpecs.deprecation$,
          invalidVersionSpec$ = _findPluginSpecs.invalidVersionSpec$,
          spec$ = _findPluginSpecs.spec$;


    const logging$ = _rxjs.Observable.merge(pack$.do(function (definition) {
      server.log(['plugin', 'debug'], {
        tmpl: 'Found plugin at <%= path %>',
        path: definition.getPath()
      });
    }), invalidDirectoryError$.do(function (error) {
      server.log(['plugin', 'warning'], {
        tmpl: '<%= err.code %>: Unable to scan directory for plugins "<%= dir %>"',
        err: error,
        dir: error.path
      });
    }), invalidPackError$.do(function (error) {
      server.log(['plugin', 'warning'], {
        tmpl: 'Skipping non-plugin directory at <%= path %>',
        path: error.path
      });
    }), invalidVersionSpec$.map(function (spec) {
      const name = spec.getId();
      const pluginVersion = spec.getExpectedKibanaVersion();
      const kibanaVersion = config.get('pkg.version');
      return `Plugin "${name}" was disabled because it expected Kibana version "${pluginVersion}", and found "${kibanaVersion}".`;
    }).distinct().do(function (message) {
      server.log(['plugin', 'warning'], message);
    }), deprecation$.do(function ({ spec, message }) {
      server.log(['warning', spec.getConfigPrefix(), 'config', 'deprecation'], message);
    }));

    kbnServer.pluginSpecs = yield spec$.merge(logging$.ignoreElements()).toArray().toPromise();

    kbnServer.plugins = kbnServer.pluginSpecs.map(function (spec) {
      return new _lib.Plugin(kbnServer, spec);
    });
  });

  return function scanMixin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _rxjs = require('rxjs');

var _plugin_discovery = require('../../plugin_discovery');

var _lib = require('./lib');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
