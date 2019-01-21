'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _goodSqueeze = require('good-squeeze');

var _fs = require('fs');

var _log_format_json = require('./log_format_json');

var _log_format_json2 = _interopRequireDefault(_log_format_json);

var _log_format_string = require('./log_format_string');

var _log_format_string2 = _interopRequireDefault(_log_format_string);

var _log_interceptor = require('./log_interceptor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KbnLogger {
  constructor(events, config) {
    this.squeeze = new _goodSqueeze.Squeeze(events);
    this.format = config.json ? new _log_format_json2.default(config) : new _log_format_string2.default(config);
    this.logInterceptor = new _log_interceptor.LogInterceptor();

    if (config.dest === 'stdout') {
      this.dest = process.stdout;
    } else {
      this.dest = (0, _fs.createWriteStream)(config.dest, {
        flags: 'a',
        encoding: 'utf8'
      });
    }
  }

  init(readstream, emitter, callback) {

    this.output = readstream.pipe(this.logInterceptor).pipe(this.squeeze).pipe(this.format);

    this.output.pipe(this.dest);

    emitter.on('stop', () => {
      this.output.unpipe(this.dest);
      if (this.dest !== process.stdout) {
        this.dest.end();
      }
    });

    callback();
  }
}
exports.default = KbnLogger;
module.exports = exports['default'];
