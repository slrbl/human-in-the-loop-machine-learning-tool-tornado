'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = undefined;

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * The server plugin class, used to extend the server
 * and add custom behavior. A "scoped" plugin class is
 * created by the PluginApi class and provided to plugin
 * providers that automatically binds all but the `opts`
 * arguments.
 *
 * @class Plugin
 * @param {KbnServer} kbnServer - the KbnServer this plugin
 *                              belongs to.
 * @param {PluginDefinition} def
 * @param {PluginSpec} spec
 */
class Plugin {
  constructor(kbnServer, spec) {
    this.kbnServer = kbnServer;
    this.spec = spec;
    this.pkg = spec.getPkg();
    this.path = spec.getPath();
    this.id = spec.getId();
    this.version = spec.getVersion();
    this.requiredIds = spec.getRequiredPluginIds() || [];
    this.externalPreInit = spec.getPreInitHandler();
    this.externalInit = spec.getInitHandler();
    this.enabled = spec.isEnabled(kbnServer.config);
    this.configPrefix = spec.getConfigPrefix();
    this.publicDir = spec.getPublicDir();

    this.preInit = (0, _lodash.once)(this.preInit);
    this.init = (0, _lodash.once)(this.init);
  }

  preInit() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.externalPreInit) {
        return yield _this.externalPreInit(_this.kbnServer.server);
      }
    })();
  }

  init() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const id = _this2.id,
            version = _this2.version,
            kbnServer = _this2.kbnServer,
            configPrefix = _this2.configPrefix;
      const config = kbnServer.config;

      // setup the hapi register function and get on with it

      const asyncRegister = (() => {
        var _ref = _asyncToGenerator(function* (server, options) {
          _this2._server = server;
          _this2._options = options;

          server.log(['plugins', 'debug'], {
            tmpl: 'Initializing plugin <%= plugin.toString() %>',
            plugin: _this2
          });

          if (_this2.publicDir) {
            server.exposeStaticDir(`/plugins/${id}/{path*}`, _this2.publicDir);
          }

          // Many of the plugins are simply adding static assets to the server and we don't need
          // to track their "status". Since plugins must have an init() function to even set its status
          // we shouldn't even create a status unless the plugin can use it.
          if (_this2.externalInit) {
            _this2.status = kbnServer.status.createForPlugin(_this2);
            server.expose('status', _this2.status);
            yield _this2.externalInit(server, options);
          }
        });

        return function asyncRegister(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      })();

      const register = function register(server, options, next) {
        asyncRegister(server, options).then(function () {
          return next();
        }, next);
      };

      register.attributes = { name: id, version: version };

      yield kbnServer.server.register({
        register: register,
        options: config.has(configPrefix) ? config.get(configPrefix) : null
      });

      // Only change the plugin status to green if the
      // intial status has not been changed
      if (_this2.status && _this2.status.state === 'uninitialized') {
        _this2.status.green('Ready');
      }
    })();
  }

  getServer() {
    return this._server;
  }

  getOptions() {
    return this._options;
  }

  toJSON() {
    return this.pkg;
  }

  toString() {
    return `${this.id}@${this.version}`;
  }
}
exports.Plugin = Plugin;
