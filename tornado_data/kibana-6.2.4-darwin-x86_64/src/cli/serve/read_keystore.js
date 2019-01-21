'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadKeystore = loadKeystore;
exports.readKeystore = readKeystore;

var _path = require('path');

var _lodash = require('lodash');

var _keystore = require('../../server/keystore');

var _path2 = require('../../server/path');

function loadKeystore() {
  const path = (0, _path.join)((0, _path2.getData)(), 'kibana.keystore');

  const keystore = new _keystore.Keystore(path);
  keystore.load();

  return keystore;
}

function readKeystore() {
  const keystore = loadKeystore();
  const keys = Object.keys(keystore.data);

  const data = {};
  keys.forEach(key => {
    (0, _lodash.set)(data, key, keystore.data[key]);
  });

  return data;
}
