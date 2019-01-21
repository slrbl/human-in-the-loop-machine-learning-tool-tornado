'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extract = exports.getPackData = undefined;

/**
 * Returns the detailed information about each kibana plugin in the pack.
 *  TODO: If there are platform specific folders, determine which one to use.
 *
 * @param {object} settings - a plugin installer settings object
 * @param {object} logger - a plugin installer logger object
 */
let getPackData = exports.getPackData = (() => {
  var _ref = _asyncToGenerator(function* (settings, logger) {
    let packages = [];
    logger.log('Retrieving metadata from plugin archive');
    try {
      packages = yield (0, _zip.analyzeArchive)(settings.tempArchiveFile);
    } catch (err) {
      logger.error(err.stack);
      throw new Error('Error retrieving metadata from plugin archive');
    }

    if (packages.length === 0) {
      throw new Error('No kibana plugins found in archive');
    }

    packages.forEach(assertValidPackageName);
    settings.plugins = packages;
  });

  return function getPackData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * Extracts files from a zip archive to a file path using a filter function
 *
 * @param {string} archive - file path to a zip archive
 * @param {string} targetDir - directory path to where the files should
 *  extracted
 */


let extract = exports.extract = (() => {
  var _ref2 = _asyncToGenerator(function* (settings, logger) {
    try {
      const plugin = settings.plugins[0];

      logger.log('Extracting plugin archive');
      yield (0, _zip.extractArchive)(settings.tempArchiveFile, settings.workingPath, plugin.archivePath);
      logger.log('Extraction complete');
    } catch (err) {
      logger.error(err.stack);
      throw new Error('Error extracting plugin archive');
    }
  });

  return function extract(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _zip = require('./zip');

var _validateNpmPackageName = require('validate-npm-package-name');

var _validateNpmPackageName2 = _interopRequireDefault(_validateNpmPackageName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Checks the plugin name. Will throw an exception if it does not meet
 *  npm package naming conventions
 *
 * @param {object} plugin - a package object from listPackages()
 */
function assertValidPackageName(plugin) {
  const validation = (0, _validateNpmPackageName2.default)(plugin.name);
  if (!validation.validForNewPackages) {
    throw new Error(`Invalid plugin name [${plugin.name}] in package.json`);
  }
}
