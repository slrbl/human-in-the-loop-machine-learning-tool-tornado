'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiSettingsServiceFactory = uiSettingsServiceFactory;

var _ui_settings_service = require('./ui_settings_service');

/**
 *  Create an instance of UiSettingsService that will use the
 *  passed `callCluster` function to communicate with elasticsearch
 *
 *  @param {Hapi.Server} server
 *  @param {Object} options
 *  @property {AsyncFunction} options.callCluster function that accepts a method name and
 *                            param object which causes a request via some elasticsearch client
 *  @property {AsyncFunction} [options.getDefaults] async function that returns defaults/details about
 *                            the uiSettings.
 *  @return {UiSettingsService}
 */
function uiSettingsServiceFactory(server, options) {
  const config = server.config();

  const savedObjectsClient = options.savedObjectsClient,
        getDefaults = options.getDefaults;


  return new _ui_settings_service.UiSettingsService({
    type: 'config',
    id: config.get('pkg.version'),
    buildNum: config.get('pkg.buildNum'),
    savedObjectsClient,
    getDefaults,
    log: (...args) => server.log(...args)
  });
}
