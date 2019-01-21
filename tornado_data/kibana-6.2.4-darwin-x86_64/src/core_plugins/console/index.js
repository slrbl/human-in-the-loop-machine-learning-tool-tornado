'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (kibana) {
  const modules = (0, _path.resolve)(__dirname, 'public/webpackShims/');
  const src = (0, _path.resolve)(__dirname, 'public/src/');

  const apps = [];

  if ((0, _fs.existsSync)((0, _path.resolve)(__dirname, 'public/tests'))) {
    apps.push({
      title: 'Console Tests',
      id: 'sense-tests',
      main: 'plugins/console/tests',
      hidden: true
      //listed: false // uncomment after https://github.com/elastic/kibana/pull/4755
    });
  }

  return new kibana.Plugin({
    id: 'console',
    require: ['elasticsearch'],

    isEnabled(config) {
      // console must be disabled when tribe mode is configured
      return config.get('console.enabled') && !config.get('elasticsearch.tribe.url');
    },

    config: function config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        proxyFilter: Joi.array().items(Joi.string()).single().default(['.*']),
        ssl: Joi.object({
          verify: Joi.boolean()
        }).default(),
        proxyConfig: Joi.array().items(Joi.object().keys({
          match: Joi.object().keys({
            protocol: Joi.string().default('*'),
            host: Joi.string().default('*'),
            port: Joi.string().default('*'),
            path: Joi.string().default('*')
          }),

          timeout: Joi.number(),
          ssl: Joi.object().keys({
            verify: Joi.boolean(),
            ca: Joi.array().single().items(Joi.string()),
            cert: Joi.string(),
            key: Joi.string()
          }).default()
        })).default()
      }).default();
    },

    deprecations: function deprecations() {
      return [(settings, log) => {
        if ((0, _lodash.has)(settings, 'proxyConfig')) {
          log('Config key "proxyConfig" is deprecated. Configuration can be inferred from the "elasticsearch" settings');
        }
      }];
    },

    init: function init(server, options) {
      if (options.ssl && options.ssl.verify) {
        throw new Error('sense.ssl.verify is no longer supported.');
      }

      const config = server.config();
      const filterHeaders = server.plugins.elasticsearch.filterHeaders;

      const proxyConfigCollection = new _server2.ProxyConfigCollection(options.proxyConfig);
      const proxyPathFilters = options.proxyFilter.map(str => new RegExp(str));

      server.route((0, _server2.createProxyRoute)({
        baseUrl: config.get('elasticsearch.url'),
        pathFilters: proxyPathFilters,
        getConfigForReq(req, uri) {
          const whitelist = config.get('elasticsearch.requestHeadersWhitelist');
          const filteredHeaders = filterHeaders(req.headers, whitelist);
          const headers = (0, _set_headers2.default)(filteredHeaders, config.get('elasticsearch.customHeaders'));

          if (!(0, _lodash.isEmpty)(config.get('console.proxyConfig'))) {
            return _extends({}, proxyConfigCollection.configForUri(uri), {
              headers
            });
          }

          return _extends({}, (0, _server2.getElasticsearchProxyConfig)(server), {
            headers
          });
        }
      }));

      server.route({
        path: '/api/console/api_server',
        method: ['GET', 'POST'],
        handler: function handler(req, reply) {
          var _req$query = req.query;
          const version = _req$query.sense_version,
                apis = _req$query.apis;

          if (!apis) {
            reply(_boom2.default.badRequest('"apis" is a required param.'));
            return;
          }

          return (0, _server.resolveApi)(version, apis.split(','), reply);
        }
      });

      const testApp = server.getHiddenUiAppById('sense-tests');
      if (testApp) {
        server.route({
          path: '/app/sense-tests',
          method: 'GET',
          handler: function handler(req, reply) {
            return reply.renderApp(testApp);
          }
        });
      }
    },

    uiExports: {
      apps: apps,
      hacks: ['plugins/console/hacks/register'],
      devTools: ['plugins/console/console'],

      injectDefaultVars(server) {
        return {
          elasticsearchUrl: server.config().get('elasticsearch.url')
        };
      },

      noParse: [(0, _path.join)(modules, 'ace' + _path.sep), (0, _path.join)(modules, 'moment_src/moment' + _path.sep), (0, _path.join)(src, 'sense_editor/mode/worker.js')]
    }
  });
};

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _server = require('./api_server/server');

var _fs = require('fs');

var _path = require('path');

var _lodash = require('lodash');

var _set_headers = require('../elasticsearch/lib/set_headers');

var _set_headers2 = _interopRequireDefault(_set_headers);

var _server2 = require('./server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
