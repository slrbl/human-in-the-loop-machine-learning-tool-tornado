'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

let create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (keystore, command, options) {
    const logger = new _logger2.default(options);

    if (keystore.exists()) {
      const overwrite = yield (0, _utils.confirm)('A Kibana keystore already exists. Overwrite?');

      if (!overwrite) {
        return logger.log('Exiting without modifying keystore.');
      }
    }

    keystore.reset();
    keystore.save();

    logger.log(`Created Kibana keystore in ${keystore.path}`);
  });

  return function create(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.createCli = createCli;

var _logger = require('../cli_plugin/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _utils = require('../server/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createCli(program, keystore) {
  program.command('create').description('Creates a new Kibana keystore').option('-s, --silent', 'prevent all logging').action(create.bind(null, keystore));
}
