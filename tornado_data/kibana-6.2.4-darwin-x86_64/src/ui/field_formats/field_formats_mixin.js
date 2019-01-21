'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldFormatsMixin = fieldFormatsMixin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _field_formats_service = require('./field_formats_service');

var _field_format = require('./field_format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function fieldFormatsMixin(kbnServer, server) {
  const fieldFormatClasses = [];

  // for use in the context of a request, the default context
  server.decorate('request', 'getFieldFormatService', _asyncToGenerator(function* () {
    return yield server.fieldFormatServiceFactory(this.getUiSettingsService());
  }));

  // for use outside of the request context, for special cases
  server.decorate('server', 'fieldFormatServiceFactory', (() => {
    var _ref2 = _asyncToGenerator(function* (uiSettings) {
      const uiConfigs = yield uiSettings.getAll();
      const uiSettingDefaults = yield uiSettings.getDefaults();
      Object.keys(uiSettingDefaults).forEach(function (key) {
        if (_lodash2.default.has(uiConfigs, key) && uiSettingDefaults[key].type === 'json') {
          uiConfigs[key] = JSON.parse(uiConfigs[key]);
        }
      });
      const getConfig = function getConfig(key) {
        return uiConfigs[key];
      };
      return new _field_formats_service.FieldFormatsService(fieldFormatClasses, getConfig);
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());

  server.decorate('server', 'registerFieldFormat', createFormat => {
    fieldFormatClasses.push(createFormat(_field_format.FieldFormat));
  });
}
