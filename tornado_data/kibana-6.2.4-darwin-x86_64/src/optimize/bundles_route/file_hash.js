'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileHash = undefined;

/**
 *  Get the hash of a file via a file descriptor
 *  @param  {LruCache} cache
 *  @param  {string} path
 *  @param  {Fs.Stat} stat
 *  @param  {Fs.FileDescriptor} fd
 *  @return {Promise<string>}
 */
let getFileHash = exports.getFileHash = (() => {
  var _ref = _asyncToGenerator(function* (cache, path, stat, fd) {
    const key = `${path}:${stat.ino}:${stat.size}:${stat.mtime.getTime()}`;

    const cached = cache.get(key);
    if (cached) {
      return yield cached;
    }

    const hash = (0, _crypto.createHash)('sha1');
    const read = (0, _fs.createReadStream)(null, {
      fd,
      start: 0,
      autoClose: false
    });

    const promise = $fromEvent(read, 'data').merge($fromEvent(read, 'error').mergeMap($throw)).takeUntil($fromEvent(read, 'end')).forEach(function (chunk) {
      return hash.update(chunk);
    }).then(function () {
      return hash.digest('hex');
    }).catch(function (error) {
      // don't cache failed attempts
      cache.del(key);
      throw error;
    });

    cache.set(key, promise);
    return yield promise;
  });

  return function getFileHash(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

var _crypto = require('crypto');

var _fs = require('fs');

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const $fromEvent = _Rx2.default.Observable.fromEvent;
const $throw = _Rx2.default.Observable.throw;
