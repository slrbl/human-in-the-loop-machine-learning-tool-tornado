'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.uiSettingsMixin = uiSettingsMixin;

var _ui_settings_service_factory = require('./ui_settings_service_factory');

var _ui_settings_service_for_request = require('./ui_settings_service_for_request');

var _routes = require('./routes');

function uiSettingsMixin(kbnServer, server) {
  const getDefaults = () => kbnServer.uiExports.uiSettingDefaults;

  server.decorate('server', 'uiSettingsServiceFactory', (options = {}) => {
    return (0, _ui_settings_service_factory.uiSettingsServiceFactory)(server, _extends({
      getDefaults
    }, options));
  });

  server.addMemoizedFactoryToRequest('getUiSettingsService', request => {
    return (0, _ui_settings_service_for_request.getUiSettingsServiceForRequest)(server, request, {
      getDefaults
    });
  });

  server.decorate('server', 'uiSettings', () => {
    throw new Error(`
      server.uiSettings has been removed, see https://github.com/elastic/kibana/pull/12243.
    `);
  });

  server.route(_routes.deleteRoute);
  server.route(_routes.getRoute);
  server.route(_routes.setManyRoute);
  server.route(_routes.setRoute);
}
