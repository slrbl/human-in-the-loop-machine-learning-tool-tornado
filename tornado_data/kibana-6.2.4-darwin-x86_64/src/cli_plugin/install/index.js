'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluginInstall;

var _utils = require('../../utils');

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _path = require('../../server/path');

var _settings = require('./settings');

var _log_warnings = require('../lib/log_warnings');

var _log_warnings2 = _interopRequireDefault(_log_warnings);

var _warn_if_plugin_dir_option = require('../lib/warn_if_plugin_dir_option');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processCommand(command, options) {
  let settings;
  try {
    settings = (0, _settings.parse)(command, options, _utils.pkg);
  } catch (ex) {
    //The logger has not yet been initialized.
    console.error(ex.message);
    process.exit(64); // eslint-disable-line no-process-exit
  }

  const logger = new _logger2.default(settings);

  (0, _warn_if_plugin_dir_option.warnIfUsingPluginDirOption)(settings, (0, _utils.fromRoot)('plugins'), logger);
  (0, _log_warnings2.default)(settings, logger);
  (0, _install2.default)(settings, logger);
}

function pluginInstall(program) {
  program.command('install <plugin/url>').option('-q, --quiet', 'disable all process messaging except errors').option('-s, --silent', 'disable all process messaging').option('-c, --config <path>', 'path to the config file', (0, _path.getConfig)()).option('-t, --timeout <duration>', 'length of time before failing; 0 for never fail', _settings.parseMilliseconds).option('-d, --plugin-dir <path>', 'path to the directory where plugins are stored (DEPRECATED, known to not work for all plugins)', (0, _utils.fromRoot)('plugins')).description('install a plugin', `Common examples:
  install x-pack
  install file:///Path/to/my/x-pack.zip
  install https://path.to/my/x-pack.zip`).action(processCommand);
}
module.exports = exports['default'];
