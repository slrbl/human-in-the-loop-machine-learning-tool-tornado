'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiMixin = undefined;

let uiMixin = exports.uiMixin = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer) {
    yield kbnServer.mixin(_ui_exports.uiExportsMixin);
    yield kbnServer.mixin(_ui_apps.uiAppsMixin);
    yield kbnServer.mixin(_ui_bundles.uiBundlesMixin);
    yield kbnServer.mixin(_ui_settings.uiSettingsMixin);
    yield kbnServer.mixin(_field_formats.fieldFormatsMixin);
    yield kbnServer.mixin(_tutorials_mixin.tutorialsMixin);
    yield kbnServer.mixin(_ui_nav_links.uiNavLinksMixin);
    yield kbnServer.mixin(_ui_i18n.uiI18nMixin);
    yield kbnServer.mixin(_ui_render.uiRenderMixin);
  });

  return function uiMixin(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _ui_exports = require('./ui_exports');

var _field_formats = require('./field_formats');

var _tutorials_mixin = require('./tutorials_mixin');

var _ui_apps = require('./ui_apps');

var _ui_i18n = require('./ui_i18n');

var _ui_bundles = require('./ui_bundles');

var _ui_nav_links = require('./ui_nav_links');

var _ui_render = require('./ui_render');

var _ui_settings = require('./ui_settings');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
