'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = _bluebird2.default.promisify(require('fs').writeFile);

exports.default = _bluebird2.default.method(function (kbnServer, server, config) {
  const path = config.get('pid.file');
  if (!path) return;

  const pid = String(process.pid);

  return writeFile(path, pid, { flag: 'wx' }).catch(function (err) {
    if (err.code !== 'EEXIST') throw err;

    const log = {
      tmpl: 'pid file already exists at <%= path %>',
      path: path,
      pid: pid
    };

    if (config.get('pid.exclusive')) {
      throw _boom2.default.create(500, _lodash2.default.template(log.tmpl)(log), log);
    } else {
      server.log(['pid', 'warning'], log);
    }

    return writeFile(path, pid);
  }).then(function () {

    server.log(['pid', 'debug'], {
      tmpl: 'wrote pid file to <%= path %>',
      path: path,
      pid: pid
    });

    const clean = _lodash2.default.once(function () {
      (0, _fs.unlinkSync)(path);
    });

    process.once('exit', clean); // for "natural" exits
    process.once('SIGINT', function () {
      // for Ctrl-C exits
      clean();

      // resend SIGINT
      process.kill(process.pid, 'SIGINT');
    });

    process.on('unhandledRejection', function (reason) {
      server.log(['warning'], `Detected an unhandled Promise rejection.\n${reason}`);
    });
  });
});
module.exports = exports['default'];
