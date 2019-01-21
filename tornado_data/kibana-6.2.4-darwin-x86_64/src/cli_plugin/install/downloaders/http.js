'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wreck = require('wreck');

var _wreck2 = _interopRequireDefault(_wreck);

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _bluebird = require('bluebird');

var _fs = require('fs');

var _httpProxyAgent = require('http-proxy-agent');

var _httpProxyAgent2 = _interopRequireDefault(_httpProxyAgent);

var _proxyFromEnv = require('proxy-from-env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getProxyAgent(sourceUrl, logger) {
  const proxy = (0, _proxyFromEnv.getProxyForUrl)(sourceUrl);

  if (!proxy) {
    return null;
  }

  logger.log(`Picked up proxy ${proxy} from environment variable.`);
  return new _httpProxyAgent2.default(proxy);
}

function sendRequest({ sourceUrl, timeout }, logger) {
  const maxRedirects = 11; //Because this one goes to 11.
  return (0, _bluebird.fromNode)(cb => {
    const reqOptions = { timeout, redirects: maxRedirects };
    const proxyAgent = getProxyAgent(sourceUrl, logger);

    if (proxyAgent) {
      reqOptions.agent = proxyAgent;
    }

    const req = _wreck2.default.request('GET', sourceUrl, reqOptions, (err, resp) => {
      if (err) {
        if (err.code === 'ECONNREFUSED') {
          err = new Error('ENOTFOUND');
        }

        return cb(err);
      }

      if (resp.statusCode >= 400) {
        return cb(new Error('ENOTFOUND'));
      }

      cb(null, { req, resp });
    });
  });
}

function downloadResponse({ resp, targetPath, progress }) {
  return new Promise((resolve, reject) => {
    const writeStream = (0, _fs.createWriteStream)(targetPath);

    // if either stream errors, fail quickly
    resp.on('error', reject);
    writeStream.on('error', reject);

    // report progress as we download
    resp.on('data', chunk => {
      progress.progress(chunk.length);
    });

    // write the download to the file system
    resp.pipe(writeStream);

    // when the write is done, we are done
    writeStream.on('finish', resolve);
  });
}

/*
Responsible for managing http transfers
*/

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (logger, sourceUrl, targetPath, timeout) {
    try {
      var _ref2 = yield sendRequest({ sourceUrl, timeout }, logger);

      const req = _ref2.req,
            resp = _ref2.resp;


      try {
        const totalSize = parseFloat(resp.headers['content-length']) || 0;
        const progress = new _progress2.default(logger);
        progress.init(totalSize);

        yield downloadResponse({ resp, targetPath, progress });

        progress.complete();
      } catch (err) {
        req.abort();
        throw err;
      }
    } catch (err) {
      if (err.message !== 'ENOTFOUND') {
        logger.error(err);
      }
      throw err;
    }
  });

  function downloadUrl(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  }

  return downloadUrl;
})();

module.exports = exports['default'];
