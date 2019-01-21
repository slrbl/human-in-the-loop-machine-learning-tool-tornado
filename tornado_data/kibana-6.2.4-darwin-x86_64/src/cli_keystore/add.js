'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = undefined;

/**
 * @param {Keystore} keystore
 * @param {String} key
 * @param {Object|null} options
 * @property {Boolean} options.force - if true, will overwrite without prompting
 * @property {Stream} options.stdinStream - defaults to process.stdin
 * @property {Boolean} options.stdin - if true, uses options.stdin to read value
 */

let add = exports.add = (() => {
  var _ref = _asyncToGenerator(function* (keystore, key, options = {}) {
    const logger = new _logger2.default(options);
    let value;

    if (!keystore.exists()) {
      return logger.error('ERROR: Kibana keystore not found. Use \'create\' command to create one.');
    }

    if (!options.force && keystore.has(key)) {
      if (options.stdin) {
        return logger.log(`Setting ${key} already exists, exiting without modifying keystore.`);
      } else {
        const overwrite = yield (0, _utils.confirm)(`Setting ${key} already exists. Overwrite?`);

        if (!overwrite) {
          return logger.log('Exiting without modifying keystore.');
        }
      }
    }

    if (options.stdin) {
      value = yield (0, _utils2.createPromiseFromStreams)([options.stdinStream || process.stdin, (0, _utils2.createConcatStream)('')]);
    } else {
      value = yield (0, _utils.question)(`Enter value for ${key}`, { mask: '*' });
    }

    keystore.add(key, value.trim());
    keystore.save();
  });

  return function add(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.addCli = addCli;

var _logger = require('../cli_plugin/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _utils = require('../server/utils');

var _utils2 = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function addCli(program, keystore) {
  program.command('add <key>').description('Add a string setting to the keystore').option('-f, --force', 'overwrite existing setting without prompting').option('-x, --stdin', 'read setting value from stdin').option('-s, --silent', 'prevent all logging').action(add.bind(null, keystore));
}
