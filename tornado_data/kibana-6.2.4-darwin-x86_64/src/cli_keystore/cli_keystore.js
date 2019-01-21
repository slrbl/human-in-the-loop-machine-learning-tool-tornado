'use strict';

var _path = require('path');

var _utils = require('../utils');

var _command = require('../cli/command');

var _command2 = _interopRequireDefault(_command);

var _path2 = require('../server/path');

var _keystore = require('../server/keystore');

var _create = require('./create');

var _list = require('./list');

var _add = require('./add');

var _remove = require('./remove');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = (0, _path.join)((0, _path2.getData)(), 'kibana.keystore');
const keystore = new _keystore.Keystore(path);

const program = new _command2.default('bin/kibana-keystore');

program.version(_utils.pkg.version).description('A tool for managing settings stored in the Kibana keystore');

(0, _create.createCli)(program, keystore);
(0, _list.listCli)(program, keystore);
(0, _add.addCli)(program, keystore);
(0, _remove.removeCli)(program, keystore);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
