'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBundlesRoute = createBundlesRoute;

var _path = require('path');

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

var _dynamic_asset_response = require('./dynamic_asset_response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Creates a route that serves files from `bundlesPath`. If the
 *  file is js or css then it is searched for instances of
 *  PUBLIC_PATH_PLACEHOLDER and replaces them with `publicPath`.
 *  @param {Object} options
 *  @property {string} options.bundlesPath
 *  @property {string} options.basePublicPath
 *  @return {Hapi.RouteConfig}
 */
function createBundlesRoute({ bundlesPath, basePublicPath }) {

  // rather than calculate the fileHash on every request, we
  // provide a cache object to `createDynamicAssetResponse()` that
  // will store the 100 most recently used hashes.
  const fileHashCache = new _lruCache2.default(100);

  if (typeof bundlesPath !== 'string' || !(0, _path.isAbsolute)(bundlesPath)) {
    throw new TypeError('bundlesPath must be an absolute path to the directory containing the bundles');
  }

  if (typeof basePublicPath !== 'string') {
    throw new TypeError('basePublicPath must be a string');
  }

  if (!basePublicPath.match(/(^$|^\/.*[^\/]$)/)) {
    throw new TypeError('basePublicPath must be empty OR start and not end with a /');
  }

  return {
    method: 'GET',
    path: '/bundles/{path*}',
    config: {
      auth: false,
      ext: {
        onPreHandler: {
          method(request, reply) {
            const ext = (0, _path.extname)(request.params.path);
            if (ext !== '.js' && ext !== '.css') {
              return reply.continue();
            }

            reply((0, _dynamic_asset_response.createDynamicAssetResponse)({
              request,
              bundlesPath,
              fileHashCache,
              publicPath: `${basePublicPath}/bundles/`
            }));
          }
        }
      }
    },
    handler: {
      directory: {
        path: bundlesPath,
        listing: false,
        lookupCompressed: true
      }
    }
  };
}
