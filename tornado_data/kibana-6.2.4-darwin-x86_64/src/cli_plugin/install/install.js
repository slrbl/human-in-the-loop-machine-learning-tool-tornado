'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _download = require('./download');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cleanup = require('./cleanup');

var _pack = require('./pack');

var _rename = require('./rename');

var _rimraf = require('rimraf');

var _kibana = require('./kibana');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const mkdir = _bluebird2.default.promisify(_mkdirp2.default);

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (settings, logger) {
    try {
      yield (0, _cleanup.cleanPrevious)(settings, logger);

      yield mkdir(settings.workingPath);

      yield (0, _download.download)(settings, logger);

      yield (0, _pack.getPackData)(settings, logger);

      yield (0, _pack.extract)(settings, logger);

      (0, _rimraf.sync)(settings.tempArchiveFile);

      (0, _kibana.existingInstall)(settings, logger);

      (0, _kibana.assertVersion)(settings);

      yield (0, _rename.renamePlugin)(settings.workingPath, _path2.default.join(settings.pluginDir, settings.plugins[0].name));

      yield (0, _kibana.rebuildCache)(settings, logger);

      logger.log('Plugin installation complete');
    } catch (err) {
      logger.error(`Plugin installation was unsuccessful due to error "${err.message}"`);
      (0, _cleanup.cleanArtifacts)(settings);
      process.exit(70); // eslint-disable-line no-process-exit
    }
  });

  function install(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return install;
})();

module.exports = exports['default'];
