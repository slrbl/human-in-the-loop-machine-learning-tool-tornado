'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEV_SSL_KEY_PATH = exports.DEV_SSL_CERT_PATH = undefined;

var _path = require('path');

const DEV_SSL_CERT_PATH = exports.DEV_SSL_CERT_PATH = (0, _path.resolve)(__dirname, '../../test/dev_certs/server.crt');
const DEV_SSL_KEY_PATH = exports.DEV_SSL_KEY_PATH = (0, _path.resolve)(__dirname, '../../test/dev_certs/server.key');
