'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebuildCache = undefined;

let rebuildCache = exports.rebuildCache = (() => {
  var _ref = _asyncToGenerator(function* (settings, logger) {
    logger.log('Optimizing and caching browser bundles...');
    const serverConfig = _lodash2.default.merge((0, _read_yaml_config.readYamlConfig)(settings.config), {
      env: 'production',
      logging: {
        silent: settings.silent,
        quiet: !settings.silent,
        verbose: false
      },
      optimize: {
        useBundleCache: false
      },
      server: {
        autoListen: false
      },
      plugins: {
        initialize: false,
        scanDirs: [settings.pluginDir, (0, _utils.fromRoot)('src/core_plugins')]
      },
      uiSettings: {
        enabled: false
      }
    });

    const kbnServer = new _kbn_server2.default(serverConfig);
    yield kbnServer.ready();
    yield kbnServer.close();
  });

  return function rebuildCache(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.existingInstall = existingInstall;
exports.assertVersion = assertVersion;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../../utils');

var _kbn_server = require('../../server/kbn_server');

var _kbn_server2 = _interopRequireDefault(_kbn_server);

var _read_yaml_config = require('../../cli/serve/read_yaml_config');

var _version = require('../../utils/version');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function existingInstall(settings, logger) {
  try {
    (0, _fs.statSync)(_path2.default.join(settings.pluginDir, settings.plugins[0].name));

    logger.error(`Plugin ${settings.plugins[0].name} already exists, please remove before installing a new version`);
    process.exit(70); // eslint-disable-line no-process-exit
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}

function assertVersion(settings) {
  if (!settings.plugins[0].kibanaVersion) {
    throw new Error(`Plugin package.json is missing both a version property (required) and a kibana.version property (optional).`);
  }

  const actual = (0, _version.cleanVersion)(settings.plugins[0].kibanaVersion);
  const expected = (0, _version.cleanVersion)(settings.version);
  if (!(0, _version.versionSatisfies)(actual, expected)) {
    throw new Error(`Incorrect Kibana version in plugin [${settings.plugins[0].name}]. ` + `Expected [${expected}]; found [${actual}]`);
  }
}
