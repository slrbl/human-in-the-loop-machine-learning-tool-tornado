'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ansicolors = require('ansicolors');

var _ansicolors2 = _interopRequireDefault(_ansicolors);

var _log_format = require('./log_format');

var _log_format2 = _interopRequireDefault(_log_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statuses = ['err', 'info', 'error', 'warning', 'fatal', 'status', 'debug'];

const typeColors = {
  log: 'blue',
  req: 'green',
  res: 'green',
  ops: 'cyan',
  config: 'cyan',
  err: 'red',
  info: 'green',
  error: 'red',
  warning: 'red',
  fatal: 'magenta',
  status: 'yellow',
  debug: 'brightBlack',
  server: 'brightBlack',
  optmzr: 'white',
  managr: 'green',
  optimize: 'magenta',
  listening: 'magenta'
};

const color = _lodash2.default.memoize(function (name) {
  return _ansicolors2.default[typeColors[name]] || _lodash2.default.identity;
});

const type = _lodash2.default.memoize(function (t) {
  return color(t)(_lodash2.default.pad(t, 7).slice(0, 7));
});

const workerType = process.env.kbnWorkerType ? `${type(process.env.kbnWorkerType)} ` : '';

class KbnLoggerStringFormat extends _log_format2.default {
  format(data) {
    const time = color('time')(this.extractAndFormatTimestamp(data, 'HH:mm:ss.SSS'));
    const msg = data.error ? color('error')(data.error.stack) : color('message')(data.message);

    const tags = (0, _lodash2.default)(data.tags).sortBy(function (tag) {
      if (color(tag) === _lodash2.default.identity) return `2${tag}`;
      if (_lodash2.default.includes(statuses, tag)) return `0${tag}`;
      return `1${tag}`;
    }).reduce(function (s, t) {
      return s + `[${color(t)(t)}]`;
    }, '');

    return `${workerType}${type(data.type)} [${time}] ${tags} ${msg}`;
  }
}
exports.default = KbnLoggerStringFormat;
module.exports = exports['default'];
