'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer, server, config) {

  server.decorate('server', 'config', function () {
    return kbnServer.config;
  });

  const unusedKeys = getUnusedConfigKeys(kbnServer.settings, config.get()).map(key => `"${key}"`);

  if (!unusedKeys.length) {
    return;
  }

  const desc = unusedKeys.length === 1 ? 'setting was' : 'settings were';

  const error = new Error(`${(0, _utils.formatListAsProse)(unusedKeys)} ${desc} not applied. ` + 'Check for spelling errors and ensure that expected ' + 'plugins are installed and enabled.');

  error.code = 'InvalidConfig';
  error.processExitCode = 64;
  throw error;
};

var _lodash = require('lodash');

var _transform_deprecations = require('./transform_deprecations');

var _utils = require('../../utils');

const getFlattenedKeys = object => Object.keys((0, _utils.getFlattenedObject)(object));

const getUnusedConfigKeys = (settings, configValues) => {
  const inputKeys = getFlattenedKeys((0, _transform_deprecations.transformDeprecations)(settings));
  const appliedKeys = getFlattenedKeys(configValues);

  if (inputKeys.includes('env')) {
    // env is a special case key, see https://github.com/elastic/kibana/blob/848bf17b/src/server/config/config.js#L74
    // where it is deleted from the settings before being injected into the schema via context and
    // then renamed to `env.name` https://github.com/elastic/kibana/blob/848bf17/src/server/config/schema.js#L17
    inputKeys[inputKeys.indexOf('env')] = 'env.name';
  }

  return (0, _lodash.difference)(inputKeys, appliedKeys);
};

module.exports = exports['default'];
