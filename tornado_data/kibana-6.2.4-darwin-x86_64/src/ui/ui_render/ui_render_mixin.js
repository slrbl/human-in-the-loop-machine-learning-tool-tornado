'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiRenderMixin = uiRenderMixin;

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function uiRenderMixin(kbnServer, server, config) {
  let getKibanaPayload = (() => {
    var _ref2 = _asyncToGenerator(function* ({ app, request, includeUserProvidedConfig, injectedVarsOverrides }) {
      const uiSettings = request.getUiSettingsService();
      const translations = yield request.getUiTranslations();

      return {
        app: app,
        bundleId: `app:${app.getId()}`,
        nav: server.getUiNavLinks(),
        version: kbnServer.version,
        branch: config.get('pkg.branch'),
        buildNum: config.get('pkg.buildNum'),
        buildSha: config.get('pkg.buildSha'),
        basePath: config.get('server.basePath'),
        serverName: config.get('server.name'),
        devMode: config.get('env.dev'),
        translations: translations,
        uiSettings: yield (0, _bluebird.props)({
          defaults: uiSettings.getDefaults(),
          user: includeUserProvidedConfig && uiSettings.getUserProvided()
        }),
        vars: yield replaceInjectedVars(request, (0, _lodash.defaults)(injectedVarsOverrides, (yield app.getInjectedVars()) || {}, defaultInjectedVars))
      };
    });

    return function getKibanaPayload(_x3) {
      return _ref2.apply(this, arguments);
    };
  })();

  let renderApp = (() => {
    var _ref3 = _asyncToGenerator(function* ({ app, reply, includeUserProvidedConfig = true, injectedVarsOverrides = {} }) {
      try {
        const request = reply.request;
        const translations = yield request.getUiTranslations();

        return reply.view(app.getTemplateName(), {
          app,
          kibanaPayload: yield getKibanaPayload({
            app,
            request,
            includeUserProvidedConfig,
            injectedVarsOverrides
          }),
          bundlePath: `${config.get('server.basePath')}/bundles`,
          i18n: function i18n(key) {
            return (0, _lodash.get)(translations, key, '');
          }
        });
      } catch (err) {
        reply(err);
      }
    });

    return function renderApp(_x4) {
      return _ref3.apply(this, arguments);
    };
  })();

  function replaceInjectedVars(request, injectedVars) {
    var _kbnServer$uiExports$ = kbnServer.uiExports.injectedVarsReplacers;
    const injectedVarsReplacers = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;


    return (0, _bluebird.reduce)(injectedVarsReplacers, (() => {
      var _ref = _asyncToGenerator(function* (acc, replacer) {
        return yield replacer(acc, request, kbnServer.server);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })(), injectedVars);
  }

  let defaultInjectedVars = {};
  kbnServer.afterPluginsInit(() => {
    var _kbnServer$uiExports$2 = kbnServer.uiExports.defaultInjectedVarProviders;
    const defaultInjectedVarProviders = _kbnServer$uiExports$2 === undefined ? [] : _kbnServer$uiExports$2;

    defaultInjectedVars = defaultInjectedVarProviders.reduce((allDefaults, { fn, pluginSpec }) => (0, _lodash.defaults)(allDefaults, fn(kbnServer.server, pluginSpec.readConfigValue(kbnServer.config, []))), {});
  });

  // render all views from ./views
  server.setupViews((0, _path.resolve)(__dirname, 'views'));

  server.route({
    path: '/app/{id}',
    method: 'GET',
    handler(req, reply) {
      return _asyncToGenerator(function* () {
        const id = req.params.id;
        const app = server.getUiAppById(id);
        if (!app) return reply(_boom2.default.notFound('Unknown app ' + id));

        try {
          if (kbnServer.status.isGreen()) {
            yield reply.renderApp(app);
          } else {
            yield reply.renderStatusPage();
          }
        } catch (err) {
          reply(_boom2.default.wrap(err));
        }
      })();
    }
  });

  server.decorate('reply', 'renderApp', function (app, injectedVarsOverrides) {
    return renderApp({
      app,
      reply: this,
      includeUserProvidedConfig: true,
      injectedVarsOverrides
    });
  });

  server.decorate('reply', 'renderAppWithDefaultConfig', function (app) {
    return renderApp({
      app,
      reply: this,
      includeUserProvidedConfig: false
    });
  });
}
