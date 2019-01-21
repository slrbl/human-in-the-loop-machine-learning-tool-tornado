'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChildDirectory$ = exports.isDirectory = undefined;

let statTest = (() => {
  var _ref = _asyncToGenerator(function* (path, test) {
    try {
      const stats = yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.stat)(path, cb);
      });
      return Boolean(test(stats));
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    return false;
  });

  return function statTest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *  Determine if a path currently points to a directory
 *  @param  {String} path
 *  @return {Promise<boolean>}
 */


let isDirectory = exports.isDirectory = (() => {
  var _ref2 = _asyncToGenerator(function* (path) {
    assertAbsolutePath(path);
    return yield statTest(path, function (stat) {
      return stat.isDirectory();
    });
  });

  return function isDirectory(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 *  Get absolute paths for child directories within a path
 *  @param  {string} path
 *  @return {Promise<Array<string>>}
 */


var _fs = require('fs');

var _path = require('path');

var _bluebird = require('bluebird');

var _rxjs = require('rxjs');

var _errors = require('../../errors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function assertAbsolutePath(path) {
  if (typeof path !== 'string') {
    throw (0, _errors.createInvalidDirectoryError)(new TypeError('path must be a string'), path);
  }

  if (!(0, _path.isAbsolute)(path)) {
    throw (0, _errors.createInvalidDirectoryError)(new TypeError('path must be absolute'), path);
  }
}

const createChildDirectory$ = exports.createChildDirectory$ = path => _rxjs.Observable.defer(() => {
  assertAbsolutePath(path);
  return (0, _bluebird.fromNode)(cb => (0, _fs.readdir)(path, cb));
}).catch(error => {
  throw (0, _errors.createInvalidDirectoryError)(error, path);
}).mergeAll().filter(name => !name.startsWith('.')).map(name => (0, _path.resolve)(path, name)).mergeMap(v => _rxjs.Observable.fromPromise(isDirectory(path)).mergeMap(pass => pass ? [v] : []));
