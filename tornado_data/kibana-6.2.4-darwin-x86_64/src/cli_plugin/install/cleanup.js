'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanPrevious = cleanPrevious;
exports.cleanArtifacts = cleanArtifacts;

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanPrevious(settings, logger) {
  return new Promise(function (resolve, reject) {
    try {
      _fs2.default.statSync(settings.workingPath);

      logger.log('Found previous install attempt. Deleting...');
      try {
        _rimraf2.default.sync(settings.workingPath);
      } catch (e) {
        reject(e);
      }
      resolve();
    } catch (e) {
      if (e.code !== 'ENOENT') reject(e);

      resolve();
    }
  });
}

function cleanArtifacts(settings) {
  // delete the working directory.
  // At this point we're bailing, so swallow any errors on delete.
  try {
    _rimraf2.default.sync(settings.workingPath);
    _rimraf2.default.sync(settings.plugins[0].path);
  } catch (e) {} // eslint-disable-line no-empty
}
