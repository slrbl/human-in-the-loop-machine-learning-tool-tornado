'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _crypto = require('crypto');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _utils = require('../../utils');

var _path = require('../path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _joi2.default.object({
  pkg: _joi2.default.object({
    version: _joi2.default.string().default(_joi2.default.ref('$version')),
    branch: _joi2.default.string().default(_joi2.default.ref('$branch')),
    buildNum: _joi2.default.number().default(_joi2.default.ref('$buildNum')),
    buildSha: _joi2.default.string().default(_joi2.default.ref('$buildSha'))
  }).default(),

  env: _joi2.default.object({
    name: _joi2.default.string().default(_joi2.default.ref('$env')),
    dev: _joi2.default.boolean().default(_joi2.default.ref('$dev')),
    prod: _joi2.default.boolean().default(_joi2.default.ref('$prod'))
  }).default(),

  dev: _joi2.default.object({
    basePathProxyTarget: _joi2.default.number().default(5603)
  }).default(),

  pid: _joi2.default.object({
    file: _joi2.default.string(),
    exclusive: _joi2.default.boolean().default(false)
  }).default(),

  cpu: _joi2.default.object({
    cgroup: _joi2.default.object({
      path: _joi2.default.object({
        override: _joi2.default.string().default()
      })
    })
  }),

  cpuacct: _joi2.default.object({
    cgroup: _joi2.default.object({
      path: _joi2.default.object({
        override: _joi2.default.string().default()
      })
    })
  }),

  server: _joi2.default.object({
    uuid: _joi2.default.string().guid().default(),
    name: _joi2.default.string().default(_os2.default.hostname()),
    host: _joi2.default.string().hostname().default('localhost'),
    port: _joi2.default.number().default(5601),
    maxPayloadBytes: _joi2.default.number().default(1048576),
    autoListen: _joi2.default.boolean().default(true),
    defaultRoute: _joi2.default.string().default('/app/kibana').regex(/^\//, `start with a slash`),
    basePath: _joi2.default.string().default('').allow('').regex(/(^$|^\/.*[^\/]$)/, `start with a slash, don't end with one`),
    customResponseHeaders: _joi2.default.object().unknown(true).default({}),
    ssl: _joi2.default.object({
      enabled: _joi2.default.boolean().default(false),
      redirectHttpFromPort: _joi2.default.number(),
      certificate: _joi2.default.string().when('enabled', {
        is: true,
        then: _joi2.default.required()
      }),
      key: _joi2.default.string().when('enabled', {
        is: true,
        then: _joi2.default.required()
      }),
      keyPassphrase: _joi2.default.string(),
      certificateAuthorities: _joi2.default.array().single().items(_joi2.default.string()),
      supportedProtocols: _joi2.default.array().items(_joi2.default.string().valid('TLSv1', 'TLSv1.1', 'TLSv1.2')),
      cipherSuites: _joi2.default.array().items(_joi2.default.string()).default(_crypto.constants.defaultCoreCipherList.split(':'))
    }).default(),
    cors: _joi2.default.when('$dev', {
      is: true,
      then: _joi2.default.object().default({
        origin: ['*://localhost:9876'] // karma test server
      }),
      otherwise: _joi2.default.boolean().default(false)
    }),
    xsrf: _joi2.default.object({
      disableProtection: _joi2.default.boolean().default(false),
      whitelist: _joi2.default.array().items(_joi2.default.string().regex(/^\//, 'start with a slash')).default([]),
      token: _joi2.default.string().optional().notes('Deprecated')
    }).default()
  }).default(),

  logging: _joi2.default.object().keys({
    silent: _joi2.default.boolean().default(false),

    quiet: _joi2.default.boolean().when('silent', {
      is: true,
      then: _joi2.default.default(true).valid(true),
      otherwise: _joi2.default.default(false)
    }),

    verbose: _joi2.default.boolean().when('quiet', {
      is: true,
      then: _joi2.default.valid(false).default(false),
      otherwise: _joi2.default.default(false)
    }),

    events: _joi2.default.any().default({}),
    dest: _joi2.default.string().default('stdout'),
    filter: _joi2.default.any().default({}),
    json: _joi2.default.boolean().when('dest', {
      is: 'stdout',
      then: _joi2.default.default(!process.stdout.isTTY),
      otherwise: _joi2.default.default(true)
    }),

    useUTC: _joi2.default.boolean().default(true)
  }).default(),

  ops: _joi2.default.object({
    interval: _joi2.default.number().default(5000)
  }).default(),

  plugins: _joi2.default.object({
    paths: _joi2.default.array().items(_joi2.default.string()).default([]),
    scanDirs: _joi2.default.array().items(_joi2.default.string()).default([]),
    initialize: _joi2.default.boolean().default(true)
  }).default(),

  path: _joi2.default.object({
    data: _joi2.default.string().default((0, _path.getData)())
  }).default(),

  optimize: _joi2.default.object({
    enabled: _joi2.default.boolean().default(true),
    bundleFilter: _joi2.default.string().default('!tests'),
    bundleDir: _joi2.default.string().default((0, _utils.fromRoot)('optimize/bundles')),
    viewCaching: _joi2.default.boolean().default(_joi2.default.ref('$prod')),
    watch: _joi2.default.boolean().default(false),
    watchPort: _joi2.default.number().default(5602),
    watchHost: _joi2.default.string().hostname().default('localhost'),
    watchPrebuild: _joi2.default.boolean().default(false),
    watchProxyTimeout: _joi2.default.number().default(5 * 60000),
    useBundleCache: _joi2.default.boolean().default(_joi2.default.ref('$prod')),
    unsafeCache: _joi2.default.when('$prod', {
      is: true,
      then: _joi2.default.boolean().valid(false),
      otherwise: _joi2.default.alternatives().try(_joi2.default.boolean(), _joi2.default.string().regex(/^\/.+\/$/)).default(true)
    }),
    sourceMaps: _joi2.default.when('$prod', {
      is: true,
      then: _joi2.default.boolean().valid(false),
      otherwise: _joi2.default.alternatives().try(_joi2.default.string().required(), _joi2.default.boolean()).default('#cheap-source-map')
    }),
    profile: _joi2.default.boolean().default(false)
  }).default(),
  status: _joi2.default.object({
    allowAnonymous: _joi2.default.boolean().default(false)
  }).default(),
  map: _joi2.default.object({
    manifestServiceUrl: _joi2.default.when('$dev', {
      is: true,
      then: _joi2.default.string().default('https://staging-dot-catalogue-dot-elastic-layer.appspot.com/v2/manifest'),
      otherwise: _joi2.default.string().default('https://catalogue.maps.elastic.co/v2/manifest')
    }),
    includeElasticMapsService: _joi2.default.boolean().default(true)
  }).default(),
  tilemap: _joi2.default.object({
    url: _joi2.default.string(),
    options: _joi2.default.object({
      attribution: _joi2.default.string(),
      minZoom: _joi2.default.number().min(0, 'Must be 0 or higher').default(0),
      maxZoom: _joi2.default.number().default(10),
      tileSize: _joi2.default.number(),
      subdomains: _joi2.default.array().items(_joi2.default.string()).single(),
      errorTileUrl: _joi2.default.string().uri(),
      tms: _joi2.default.boolean(),
      reuseTiles: _joi2.default.boolean(),
      bounds: _joi2.default.array().items(_joi2.default.array().items(_joi2.default.number()).min(2).required()).min(2)
    }).default()
  }).default(),
  regionmap: _joi2.default.object({
    includeElasticMapsService: _joi2.default.boolean().default(true),
    layers: _joi2.default.array().items(_joi2.default.object({
      url: _joi2.default.string(),
      format: _joi2.default.object({
        type: _joi2.default.string().default('geojson')
      }).default({
        type: 'geojson'
      }),
      meta: _joi2.default.object({
        feature_collection_path: _joi2.default.string().default('data')
      }).default({
        feature_collection_path: 'data'
      }),
      attribution: _joi2.default.string(),
      name: _joi2.default.string(),
      fields: _joi2.default.array().items(_joi2.default.object({
        name: _joi2.default.string(),
        description: _joi2.default.string()
      }))
    }))
  }).default(),

  i18n: _joi2.default.object({
    defaultLocale: _joi2.default.string().default('en')
  }).default()

}).default();

module.exports = exports['default'];
