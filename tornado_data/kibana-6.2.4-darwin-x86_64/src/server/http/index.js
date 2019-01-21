'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _url = require('url');

var _path = require('path');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _get_default_route = require('./get_default_route');

var _get_default_route2 = _interopRequireDefault(_get_default_route);

var _version_check = require('./version_check');

var _version_check2 = _interopRequireDefault(_version_check);

var _short_url_error = require('./short_url_error');

var _short_url_assert_valid = require('./short_url_assert_valid');

var _short_url_lookup = require('./short_url_lookup');

var _short_url_lookup2 = _interopRequireDefault(_short_url_lookup);

var _setup_connection = require('./setup_connection');

var _setup_connection2 = _interopRequireDefault(_setup_connection);

var _setup_redirect_server = require('./setup_redirect_server');

var _setup_redirect_server2 = _interopRequireDefault(_setup_redirect_server);

var _register_hapi_plugins = require('./register_hapi_plugins');

var _register_hapi_plugins2 = _interopRequireDefault(_register_hapi_plugins);

var _xsrf = require('./xsrf');

var _xsrf2 = _interopRequireDefault(_xsrf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    server = kbnServer.server = new _hapi2.default.Server();

    const shortUrlLookup = (0, _short_url_lookup2.default)(server);
    yield kbnServer.mixin(_setup_connection2.default);
    yield kbnServer.mixin(_setup_redirect_server2.default);
    yield kbnServer.mixin(_register_hapi_plugins2.default);

    // provide a simple way to expose static directories
    server.decorate('server', 'exposeStaticDir', function (routePath, dirPath) {
      this.route({
        path: routePath,
        method: 'GET',
        handler: {
          directory: {
            path: dirPath,
            listing: false,
            lookupCompressed: true
          }
        },
        config: { auth: false }
      });
    });

    // provide a simple way to expose static files
    server.decorate('server', 'exposeStaticFile', function (routePath, filePath) {
      this.route({
        path: routePath,
        method: 'GET',
        handler: {
          file: filePath
        },
        config: { auth: false }
      });
    });

    // helper for creating view managers for servers
    server.decorate('server', 'setupViews', function (path, engines) {
      this.views({
        path: path,
        isCached: config.get('optimize.viewCaching'),
        engines: _lodash2.default.assign({ jade: require('jade') }, engines || {})
      });
    });

    server.decorate('server', 'redirectToSlash', function (route) {
      this.route({
        path: route,
        method: 'GET',
        handler: function handler(req, reply) {
          return reply.redirect((0, _url.format)({
            search: req.url.search,
            pathname: req.url.pathname + '/'
          }));
        }
      });
    });

    // attach the app name to the server, so we can be sure we are actually talking to kibana
    server.ext('onPreResponse', function (req, reply) {
      const response = req.response;

      const customHeaders = _extends({}, config.get('server.customResponseHeaders'), {
        'kbn-name': kbnServer.name,
        'kbn-version': kbnServer.version
      });

      if (response.isBoom) {
        response.output.headers = _extends({}, response.output.headers, customHeaders);
      } else {
        Object.keys(customHeaders).forEach(name => {
          response.header(name, customHeaders[name]);
        });
      }

      return reply.continue();
    });

    server.route({
      path: '/',
      method: 'GET',
      handler: function handler(req, reply) {
        return reply.view('root_redirect', {
          hashRoute: `${config.get('server.basePath')}/app/kibana`,
          defaultRoute: (0, _get_default_route2.default)(kbnServer)
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/{p*}',
      handler: function handler(req, reply) {
        const path = req.path;
        if (path === '/' || path.charAt(path.length - 1) !== '/') {
          return reply(_boom2.default.notFound());
        }
        const pathPrefix = config.get('server.basePath') ? `${config.get('server.basePath')}/` : '';
        return reply.redirect((0, _url.format)({
          search: req.url.search,
          pathname: pathPrefix + path.slice(0, -1)
        })).permanent(true);
      }
    });

    server.route({
      method: 'GET',
      path: '/goto/{urlId}',
      handler: (() => {
        var _ref2 = _asyncToGenerator(function* (request, reply) {
          try {
            const url = yield shortUrlLookup.getUrl(request.params.urlId, request);
            (0, _short_url_assert_valid.shortUrlAssertValid)(url);

            const uiSettings = request.getUiSettingsService();
            const stateStoreInSessionStorage = yield uiSettings.get('state:storeInSessionStorage');
            if (!stateStoreInSessionStorage) {
              reply().redirect(config.get('server.basePath') + url);
              return;
            }

            const app = server.getHiddenUiAppById('stateSessionStorageRedirect');
            reply.renderApp(app, {
              redirectUrl: url
            });
          } catch (err) {
            reply((0, _short_url_error.handleShortUrlError)(err));
          }
        });

        function handler(_x4, _x5) {
          return _ref2.apply(this, arguments);
        }

        return handler;
      })()
    });

    server.route({
      method: 'POST',
      path: '/shorten',
      handler: (() => {
        var _ref3 = _asyncToGenerator(function* (request, reply) {
          try {
            (0, _short_url_assert_valid.shortUrlAssertValid)(request.payload.url);
            const urlId = yield shortUrlLookup.generateUrlId(request.payload.url, request);
            reply(urlId);
          } catch (err) {
            reply((0, _short_url_error.handleShortUrlError)(err));
          }
        });

        function handler(_x6, _x7) {
          return _ref3.apply(this, arguments);
        }

        return handler;
      })()
    });

    // Expose static assets (fonts, favicons).
    server.exposeStaticDir('/ui/fonts/{path*}', (0, _path.resolve)(__dirname, '../../ui/public/assets/fonts'));
    server.exposeStaticDir('/ui/favicons/{path*}', (0, _path.resolve)(__dirname, '../../ui/public/assets/favicons'));

    kbnServer.mixin(_version_check2.default);

    return kbnServer.mixin(_xsrf2.default);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
