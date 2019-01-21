'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMilliseconds = parseMilliseconds;
exports.parse = parse;

var _expiryJs = require('expiry-js');

var _expiryJs2 = _interopRequireDefault(_expiryJs);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateUrls({ version, plugin }) {
  return [plugin, `https://artifacts.elastic.co/downloads/kibana-plugins/${plugin}/${plugin}-${version}.zip`];
}

function parseMilliseconds(val) {
  let result;

  try {
    const timeVal = (0, _expiryJs2.default)(val);
    result = timeVal.asMilliseconds();
  } catch (ex) {
    result = 0;
  }

  return result;
}

function parse(command, options, kbnPackage) {
  const settings = {
    timeout: options.timeout || 0,
    quiet: options.quiet || false,
    silent: options.silent || false,
    config: options.config || '',
    plugin: command,
    version: kbnPackage.version,
    pluginDir: options.pluginDir || ''
  };

  settings.urls = generateUrls(settings);
  settings.workingPath = (0, _path.resolve)(settings.pluginDir, '.plugin.installing');
  settings.tempArchiveFile = (0, _path.resolve)(settings.workingPath, 'archive.part');
  settings.tempPackageFile = (0, _path.resolve)(settings.workingPath, 'package.json');
  settings.setPlugin = function (plugin) {
    settings.plugin = plugin;
    settings.pluginPath = (0, _path.resolve)(settings.pluginDir, settings.plugin.name);
  };

  return settings;
}
