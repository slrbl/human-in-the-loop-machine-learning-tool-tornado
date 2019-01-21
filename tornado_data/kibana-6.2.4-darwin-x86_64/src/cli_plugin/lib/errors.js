'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedProtocolError = UnsupportedProtocolError;
function UnsupportedProtocolError() {
  Error.call(this, 'Unsupported protocol');
}

UnsupportedProtocolError.prototype = Object.create(Error.prototype);
