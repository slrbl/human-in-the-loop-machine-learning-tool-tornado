'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;
exports.listCli = listCli;

var _logger = require('../cli_plugin/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(keystore, command, options = {}) {
  const logger = new _logger2.default(options);

  if (!keystore.exists()) {
    return logger.error('ERROR: Kibana keystore not found. Use \'create\' command to create one.');
  }

  const keys = keystore.keys();
  logger.log(keys.join('\n'));
}

function listCli(program, keystore) {
  program.command('list').description('List entries in the keystore').option('-s, --silent', 'prevent all logging').action(list.bind(null, keystore));
}
