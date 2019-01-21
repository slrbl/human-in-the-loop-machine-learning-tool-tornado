'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUBLIC_PATH_PLACEHOLDER = undefined;
exports.replacePlaceholder = replacePlaceholder;

var _utils = require('../utils');

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const $fromEvent = _Rx2.default.Observable.fromEvent;

const PUBLIC_PATH_PLACEHOLDER = exports.PUBLIC_PATH_PLACEHOLDER = '__REPLACE_WITH_PUBLIC_PATH__';

function replacePlaceholder(read, replacement) {
  const replace = (0, _utils.createReplaceStream)(PUBLIC_PATH_PLACEHOLDER, replacement);

  // handle errors on the read stream by proxying them
  // to the replace stream so that the consumer can
  // choose what to do with them.
  $fromEvent(read, 'error').take(1).takeUntil($fromEvent(read, 'end')).forEach(error => {
    replace.emit('error', error);
    replace.end();
  });

  replace.close = () => {
    read.unpipe();
    read.close();
  };

  return read.pipe(replace);
}
