'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = exports.getConfig = undefined;

var _fs = require('fs');

var _lodash = require('lodash');

var _utils = require('../../utils');

const CONFIG_PATHS = [process.env.CONFIG_PATH, (0, _utils.fromRoot)('config/kibana.yml'), '/etc/kibana/kibana.yml'].filter(Boolean);

const DATA_PATHS = [process.env.DATA_PATH, (0, _utils.fromRoot)('data'), '/var/lib/kibana'].filter(Boolean);

function findFile(paths) {
  const availablePath = (0, _lodash.find)(paths, configPath => {
    try {
      (0, _fs.accessSync)(configPath, _fs.R_OK);
      return true;
    } catch (e) {
      //Check the next path
    }
  });
  return availablePath || paths[0];
}

const getConfig = exports.getConfig = () => findFile(CONFIG_PATHS);
const getData = exports.getData = () => findFile(DATA_PATHS);
