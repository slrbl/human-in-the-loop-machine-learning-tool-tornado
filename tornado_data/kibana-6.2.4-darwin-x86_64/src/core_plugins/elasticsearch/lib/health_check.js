'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (plugin, server) {
  const config = server.config();
  const callAdminAsKibanaUser = server.plugins.elasticsearch.getCluster('admin').callWithInternalUser;
  const callDataAsKibanaUser = server.plugins.elasticsearch.getCluster('data').callWithInternalUser;
  const REQUEST_DELAY = config.get('elasticsearch.healthCheck.delay');

  plugin.status.yellow('Waiting for Elasticsearch');
  function waitForPong(callWithInternalUser, url) {
    return callWithInternalUser('ping').catch(function (err) {
      if (!(err instanceof NoConnections)) throw err;
      plugin.status.red(`Unable to connect to Elasticsearch at ${url}.`);

      return _bluebird2.default.delay(REQUEST_DELAY).then(waitForPong.bind(null, callWithInternalUser, url));
    });
  }

  function waitUntilReady() {
    return new _bluebird2.default(resolve => {
      plugin.status.once('green', resolve);
    });
  }

  function waitForEsVersion() {
    return (0, _ensure_es_version.ensureEsVersion)(server, _kibana_version2.default.get()).catch(err => {
      plugin.status.red(err);
      return _bluebird2.default.delay(REQUEST_DELAY).then(waitForEsVersion);
    });
  }

  function setGreenStatus() {
    return plugin.status.green('Ready');
  }

  function check() {
    const healthCheck = waitForPong(callAdminAsKibanaUser, config.get('elasticsearch.url')).then(waitForEsVersion).then(() => (0, _ensure_not_tribe.ensureNotTribe)(callAdminAsKibanaUser)).then(() => (0, _patch_kibana_index.patchKibanaIndex)({
      callCluster: callAdminAsKibanaUser,
      log: (...args) => server.log(...args),
      indexName: config.get('kibana.index'),
      kibanaIndexMappingsDsl: server.getKibanaIndexMappingsDsl()
    })).then(() => {
      const tribeUrl = config.get('elasticsearch.tribe.url');
      if (tribeUrl) {
        return waitForPong(callDataAsKibanaUser, tribeUrl).then(() => (0, _ensure_es_version.ensureEsVersion)(server, _kibana_version2.default.get(), callDataAsKibanaUser));
      }
    });

    return healthCheck.then(setGreenStatus).catch(err => plugin.status.red(err));
  }

  let timeoutId = null;

  function scheduleCheck(ms) {
    if (timeoutId) return;

    const myId = setTimeout(function () {
      check().finally(function () {
        if (timeoutId === myId) startorRestartChecking();
      });
    }, ms);

    timeoutId = myId;
  }

  function startorRestartChecking() {
    scheduleCheck(stopChecking() ? REQUEST_DELAY : 1);
  }

  function stopChecking() {
    if (!timeoutId) return false;
    clearTimeout(timeoutId);
    timeoutId = null;
    return true;
  }

  server.ext('onPreStop', (request, reply) => {
    stopChecking();
    reply();
  });

  return {
    waitUntilReady: waitUntilReady,
    run: check,
    start: startorRestartChecking,
    stop: stopChecking,
    isRunning: function isRunning() {
      return !!timeoutId;
    }
  };
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _kibana_version = require('./kibana_version');

var _kibana_version2 = _interopRequireDefault(_kibana_version);

var _ensure_es_version = require('./ensure_es_version');

var _ensure_not_tribe = require('./ensure_not_tribe');

var _patch_kibana_index = require('./patch_kibana_index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoConnections = _elasticsearch2.default.errors.NoConnections;

module.exports = exports['default'];
