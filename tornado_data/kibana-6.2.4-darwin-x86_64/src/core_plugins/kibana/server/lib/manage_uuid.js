'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const FILE_ENCODING = 'utf8';

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (server) {
    let detectUuid = (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const readFile = _bluebird2.default.promisify(_fs.readFile);
        try {
          const result = yield readFile(uuidFile);
          return result.toString(FILE_ENCODING);
        } catch (err) {
          if (err.code === 'ENOENT') {
            // non-existent uuid file is ok
            return false;
          }
          server.log(['error', 'read-uuid'], err);
          // Note: this will most likely be logged as an Unhandled Rejection
          throw err;
        }
      });

      return function detectUuid() {
        return _ref2.apply(this, arguments);
      };
    })();

    let writeUuid = (() => {
      var _ref3 = _asyncToGenerator(function* (uuid) {
        const writeFile = _bluebird2.default.promisify(_fs.writeFile);
        try {
          return yield writeFile(uuidFile, uuid, { encoding: FILE_ENCODING });
        } catch (err) {
          server.log(['error', 'write-uuid'], err);
          // Note: this will most likely be logged as an Unhandled Rejection
          throw err;
        }
      });

      return function writeUuid(_x2) {
        return _ref3.apply(this, arguments);
      };
    })();

    // detect if uuid exists already from before a restart


    const config = server.config();
    const fileName = 'uuid';
    const uuidFile = (0, _path.join)(config.get('path.data'), fileName);

    const logToServer = function logToServer(msg) {
      return server.log(['server', 'uuid', fileName], msg);
    };
    const dataFileUuid = yield detectUuid();
    let serverConfigUuid = config.get('server.uuid'); // check if already set in config

    if (dataFileUuid) {
      // data uuid found
      if (serverConfigUuid === dataFileUuid) {
        // config uuid exists, data uuid exists and matches
        logToServer(`Kibana instance UUID: ${dataFileUuid}`);
        return;
      }

      if (!serverConfigUuid) {
        // config uuid missing, data uuid exists
        serverConfigUuid = dataFileUuid;
        logToServer(`Resuming persistent Kibana instance UUID: ${serverConfigUuid}`);
        config.set('server.uuid', serverConfigUuid);
        return;
      }

      if (serverConfigUuid !== dataFileUuid) {
        // config uuid exists, data uuid exists but mismatches
        logToServer(`Updating Kibana instance UUID to: ${serverConfigUuid} (was: ${dataFileUuid})`);
        return writeUuid(serverConfigUuid);
      }
    }

    // data uuid missing

    if (!serverConfigUuid) {
      // config uuid missing
      serverConfigUuid = _uuid2.default.v4();
      config.set('server.uuid', serverConfigUuid);
    }

    logToServer(`Setting new Kibana instance UUID: ${serverConfigUuid}`);
    return writeUuid(serverConfigUuid);
  });

  function manageUuid(_x) {
    return _ref.apply(this, arguments);
  }

  return manageUuid;
})();

module.exports = exports['default'];
