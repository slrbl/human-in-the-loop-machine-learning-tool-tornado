'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {
  return new kibana.Plugin({
    require: ['kibana'],
    config(Joi) {
      const array = Joi.array,
            boolean = Joi.boolean,
            number = Joi.number,
            object = Joi.object,
            string = Joi.string,
            ref = Joi.ref;


      const sslSchema = object({
        verificationMode: string().valid('none', 'certificate', 'full').default('full'),
        certificateAuthorities: array().single().items(string()),
        certificate: string(),
        key: string(),
        keyPassphrase: string()
      }).default();

      return object({
        enabled: boolean().default(true),
        url: string().uri({ scheme: ['http', 'https'] }).default('http://localhost:9200'),
        preserveHost: boolean().default(true),
        username: string(),
        password: string(),
        shardTimeout: number().default(0),
        requestTimeout: number().default(30000),
        requestHeadersWhitelist: array().items().single().default(DEFAULT_REQUEST_HEADERS),
        customHeaders: object().default({}),
        pingTimeout: number().default(ref('requestTimeout')),
        startupTimeout: number().default(5000),
        logQueries: boolean().default(false),
        ssl: sslSchema,
        apiVersion: Joi.string().default('master'),
        healthCheck: object({
          delay: number().default(2500)
        }).default(),
        tribe: object({
          url: string().uri({ scheme: ['http', 'https'] }),
          preserveHost: boolean().default(true),
          username: string(),
          password: string(),
          shardTimeout: number().default(0),
          requestTimeout: number().default(30000),
          requestHeadersWhitelist: array().items().single().default(DEFAULT_REQUEST_HEADERS),
          customHeaders: object().default({}),
          pingTimeout: number().default(ref('requestTimeout')),
          startupTimeout: number().default(5000),
          logQueries: boolean().default(false),
          ssl: sslSchema,
          apiVersion: Joi.string().default('master')
        }).default()
      }).default();
    },

    deprecations({ rename }) {
      const sslVerify = basePath => {
        const getKey = path => {
          return (0, _lodash.compact)([basePath, path]).join('.');
        };

        return (settings, log) => {
          const sslSettings = (0, _lodash.get)(settings, getKey('ssl'));

          if (!(0, _lodash.has)(sslSettings, 'verify')) {
            return;
          }

          const verificationMode = (0, _lodash.get)(sslSettings, 'verify') ? 'full' : 'none';
          (0, _lodash.set)(sslSettings, 'verificationMode', verificationMode);
          (0, _utils.unset)(sslSettings, 'verify');

          log(`Config key "${getKey('ssl.verify')}" is deprecated. It has been replaced with "${getKey('ssl.verificationMode')}"`);
        };
      };

      return [rename('ssl.ca', 'ssl.certificateAuthorities'), rename('ssl.cert', 'ssl.certificate'), sslVerify(), rename('tribe.ssl.ca', 'tribe.ssl.certificateAuthorities'), rename('tribe.ssl.cert', 'tribe.ssl.certificate'), sslVerify('tribe')];
    },

    uiExports: {
      injectDefaultVars(server, options) {
        return {
          esRequestTimeout: options.requestTimeout,
          esShardTimeout: options.shardTimeout,
          esApiVersion: options.apiVersion,
          esDataIsTribe: (0, _lodash.get)(options, 'tribe.url') ? true : false
        };
      }
    },

    init(server) {
      const clusters = (0, _create_clusters.createClusters)(server);

      server.expose('getCluster', clusters.get);
      server.expose('createCluster', clusters.create);

      server.expose('filterHeaders', _filter_headers2.default);
      server.expose('ElasticsearchClientLogging', (0, _client_logger.clientLogger)(server));

      (0, _create_data_cluster.createDataCluster)(server);
      (0, _create_admin_cluster.createAdminCluster)(server);

      (0, _create_proxy.createProxy)(server, 'POST', '/{index}/_search');
      (0, _create_proxy.createProxy)(server, 'POST', '/_msearch');

      // Set up the health check service and start it.

      var _healthCheck = (0, _health_check2.default)(this, server);

      const start = _healthCheck.start,
            waitUntilReady = _healthCheck.waitUntilReady;

      server.expose('waitUntilReady', waitUntilReady);
      start();
    }
  });
};

var _lodash = require('lodash');

var _utils = require('../../utils');

var _health_check = require('./lib/health_check');

var _health_check2 = _interopRequireDefault(_health_check);

var _create_data_cluster = require('./lib/create_data_cluster');

var _create_admin_cluster = require('./lib/create_admin_cluster');

var _client_logger = require('./lib/client_logger');

var _create_clusters = require('./lib/create_clusters');

var _filter_headers = require('./lib/filter_headers');

var _filter_headers2 = _interopRequireDefault(_filter_headers);

var _create_proxy = require('./lib/create_proxy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_REQUEST_HEADERS = ['authorization'];

module.exports = exports['default'];
