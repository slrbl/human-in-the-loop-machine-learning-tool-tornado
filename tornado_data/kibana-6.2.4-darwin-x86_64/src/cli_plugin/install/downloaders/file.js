'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let copyFile = (() => {
  var _ref = _asyncToGenerator(function* ({ readStream, writeStream, progress }) {
    yield new Promise(function (resolve, reject) {
      // if either stream errors, fail quickly
      readStream.on('error', reject);
      writeStream.on('error', reject);

      // report progress as we transfer
      readStream.on('data', function (chunk) {
        progress.progress(chunk.length);
      });

      // write the download to the file system
      readStream.pipe(writeStream);

      // when the write is done, we are done
      writeStream.on('finish', resolve);
    });
  });

  return function copyFile(_x) {
    return _ref.apply(this, arguments);
  };
})();

/*
// Responsible for managing local file transfers
*/


var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function openSourceFile({ sourcePath }) {
  try {
    const fileInfo = (0, _fs.statSync)(sourcePath);

    const readStream = (0, _fs.createReadStream)(sourcePath);

    return { readStream, fileInfo };
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('ENOTFOUND');
    }

    throw err;
  }
}

exports.default = (() => {
  var _ref2 = _asyncToGenerator(function* (logger, sourcePath, targetPath) {
    try {
      var _openSourceFile = openSourceFile({ sourcePath });

      const readStream = _openSourceFile.readStream,
            fileInfo = _openSourceFile.fileInfo;

      const writeStream = (0, _fs.createWriteStream)(targetPath);

      try {
        const progress = new _progress2.default(logger);
        progress.init(fileInfo.size);

        yield copyFile({ readStream, writeStream, progress });

        progress.complete();
      } catch (err) {
        readStream.close();
        writeStream.close();
        throw err;
      }
    } catch (err) {
      logger.error(err);
      throw err;
    }
  });

  function copyLocalFile(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  }

  return copyLocalFile;
})();

module.exports = exports['default'];
