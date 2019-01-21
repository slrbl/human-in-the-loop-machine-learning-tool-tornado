'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = list;

var _fs = require('fs');

var _path = require('path');

function list(settings, logger) {
  (0, _fs.readdirSync)(settings.pluginDir).forEach(filename => {
    const stat = (0, _fs.statSync)((0, _path.join)(settings.pluginDir, filename));

    if (stat.isDirectory() && filename[0] !== '.') {
      try {
        const packagePath = (0, _path.join)(settings.pluginDir, filename, 'package.json');

        var _JSON$parse = JSON.parse((0, _fs.readFileSync)(packagePath, 'utf8'));

        const version = _JSON$parse.version;

        logger.log(filename + '@' + version);
      } catch (e) {
        throw new Error('Unable to read package.json file for plugin ' + filename);
      }
    }
  });
  logger.log(''); //intentional blank line for aesthetics
}
module.exports = exports['default'];
