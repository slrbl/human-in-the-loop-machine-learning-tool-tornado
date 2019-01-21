'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiNavLinksMixin = uiNavLinksMixin;

var _ui_nav_link = require('./ui_nav_link');

function uiNavLinksMixin(kbnServer, server, config) {
  const uiApps = server.getAllUiApps();

  var _kbnServer$uiExports$ = kbnServer.uiExports.navLinkSpecs;
  const navLinkSpecs = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;

  const urlBasePath = config.get('server.basePath');

  const fromSpecs = navLinkSpecs.map(navLinkSpec => new _ui_nav_link.UiNavLink(urlBasePath, navLinkSpec));

  const fromApps = uiApps.map(app => app.getNavLink()).filter(Boolean);

  const uiNavLinks = fromSpecs.concat(fromApps).sort((a, b) => a.getOrder() - b.getOrder());

  server.decorate('server', 'getUiNavLinks', () => uiNavLinks.slice(0));
}
