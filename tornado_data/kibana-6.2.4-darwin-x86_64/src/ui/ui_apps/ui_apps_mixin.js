'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiAppsMixin = uiAppsMixin;

var _ui_app = require('./ui_app');

function uiAppsMixin(kbnServer, server) {
  var _kbnServer$uiExports$ = kbnServer.uiExports.uiAppSpecs;
  const uiAppSpecs = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;

  const existingIds = new Set();
  const appsById = new Map();
  const hiddenAppsById = new Map();

  kbnServer.uiApps = uiAppSpecs.map(spec => {
    const app = new _ui_app.UiApp(kbnServer, spec);
    const id = app.getId();

    if (!existingIds.has(id)) {
      existingIds.add(id);
    } else {
      throw new Error(`Unable to create two apps with the id ${id}.`);
    }

    if (app.isHidden()) {
      hiddenAppsById.set(id, app);
    } else {
      appsById.set(id, app);
    }

    return app;
  });

  server.decorate('server', 'getAllUiApps', () => kbnServer.uiApps.slice(0));
  server.decorate('server', 'getUiAppById', id => appsById.get(id));
  server.decorate('server', 'getHiddenUiAppById', id => hiddenAppsById.get(id));
}
