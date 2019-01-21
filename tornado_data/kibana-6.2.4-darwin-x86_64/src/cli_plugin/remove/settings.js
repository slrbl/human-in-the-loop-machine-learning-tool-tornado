'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _path = require('path');

function parse(command, options) {
  const settings = {
    quiet: options.quiet || false,
    silent: options.silent || false,
    config: options.config || '',
    pluginDir: options.pluginDir || '',
    plugin: command
  };

  settings.pluginPath = (0, _path.resolve)(settings.pluginDir, settings.plugin);

  return settings;
}
