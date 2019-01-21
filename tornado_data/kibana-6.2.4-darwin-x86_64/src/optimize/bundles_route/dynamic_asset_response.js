'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDynamicAssetResponse = undefined;

/**
 *  Create a Hapi response for the requested path. This is designed
 *  to replicate a subset of the features provided by Hapi's Inert
 *  plugin including:
 *   - ensure path is not traversing out of the bundle directory
 *   - manage use file descriptors for file access to efficiently
 *     interact with the file multiple times in each request
 *   - generate and cache etag for the file
 *   - write correct headers to response for client-side caching
 *     and invalidation
 *   - stream file to response
 *
 *  It differs from Inert in some important ways:
 *   - the PUBLIC_PATH_PLACEHOLDER is replaced with the correct
 *     public path as the response is streamed
 *   - cached hash/etag is based on the file on disk, but modified
 *     by the public path so that individual public paths have
 *     different etags, but can share a cache
 *
 *  @param {Object} options
 *  @property {Hapi.Request} options.request
 *  @property {string} options.bundlesPath
 *  @property {string} options.publicPath
 *  @property {LruCache} options.fileHashCache
 */
let createDynamicAssetResponse = exports.createDynamicAssetResponse = (() => {
  var _ref = _asyncToGenerator(function* (options) {
    const request = options.request,
          bundlesPath = options.bundlesPath,
          publicPath = options.publicPath,
          fileHashCache = options.fileHashCache;


    let fd;
    try {
      const path = (0, _path.resolve)(bundlesPath, request.params.path);

      // prevent path traversal, only process paths that resolve within bundlesPath
      if (!path.startsWith(bundlesPath)) {
        return _boom2.default.forbidden(null, 'EACCES');
      }

      // we use and manage a file descriptor mostly because
      // that's what Inert does, and since we are accessing
      // the file 2 or 3 times per request it seems logical
      fd = yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.open)(path, 'r', cb);
      });

      const stat = yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.fstat)(fd, cb);
      });
      const hash = yield (0, _file_hash.getFileHash)(fileHashCache, path, stat, fd);

      const read = (0, _fs.createReadStream)(null, {
        fd,
        start: 0,
        autoClose: true
      });
      fd = null; // read stream is now responsible for fd

      const response = request.generateResponse((0, _public_path_placeholder.replacePlaceholder)(read, publicPath));
      response.code(200);
      response.etag(`${hash}-${publicPath}`);
      response.header('cache-control', 'must-revalidate');
      response.type(request.server.mime.path(path).type);
      return response;
    } catch (error) {
      if (fd) {
        try {
          yield (0, _bluebird.fromNode)(function (cb) {
            return (0, _fs.close)(fd, cb);
          });
        } catch (error) {
          // ignore errors from close, we already have one to report
          // and it's very likely they are the same
        }
      }

      if (error.code === 'ENOENT') {
        return _boom2.default.notFound();
      }

      return _boom2.default.boomify(error);
    }
  });

  return function createDynamicAssetResponse(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _path = require('path');

var _fs = require('fs');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _bluebird = require('bluebird');

var _file_hash = require('./file_hash');

var _public_path_placeholder = require('../public_path_placeholder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
