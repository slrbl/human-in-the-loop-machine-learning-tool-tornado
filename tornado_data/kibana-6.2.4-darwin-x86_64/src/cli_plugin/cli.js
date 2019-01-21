'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var _command = require('../cli/command');

var _command2 = _interopRequireDefault(_command);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argv = process.env.kbnWorkerArgv ? JSON.parse(process.env.kbnWorkerArgv) : process.argv.slice();
const program = new _command2.default('bin/kibana-plugin');

program.version(_utils.pkg.version).description('The Kibana plugin manager enables you to install and remove plugins that ' + 'provide additional functionality to Kibana');

(0, _list2.default)(program);
(0, _install2.default)(program);
(0, _remove2.default)(program);

program.command('help <command>').description('get the help for a specific command').action(function (cmdName) {
  const cmd = _lodash2.default.find(program.commands, { _name: cmdName });
  if (!cmd) return program.error(`unknown command ${cmdName}`);
  cmd.help();
});

program.command('*', null, { noHelp: true }).action(function (cmd) {
  program.error(`unknown command ${cmd}`);
});

// check for no command name
const subCommand = argv[2] && !String(argv[2][0]).match(/^-|^\.|\//);
if (!subCommand) {
  program.defaultHelp();
}

program.parse(argv);
