'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiI18nMixin = uiI18nMixin;

var _lodash = require('lodash');

var _acceptLanguageParser = require('accept-language-parser');

var _acceptLanguageParser2 = _interopRequireDefault(_acceptLanguageParser);

var _i18n = require('./i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function acceptLanguageHeaderToBCP47Tags(header) {
  return _acceptLanguageParser2.default.parse(header).map(lang => (0, _lodash.compact)([lang.code, lang.region, lang.script]).join('-'));
}

function uiI18nMixin(kbnServer, server, config) {
  const defaultLocale = config.get('i18n.defaultLocale');

  const i18n = new _i18n.I18n(defaultLocale);
  var _kbnServer$uiExports$ = kbnServer.uiExports.translationPaths;
  const translationPaths = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;

  translationPaths.forEach(translationPath => {
    i18n.registerTranslations(translationPath);
  });

  /**
   *  Fetch the translations matching the Accept-Language header for a requests.
   *  @name request.getUiTranslations
   *  @returns {Promise<Object<id:string,value:string>>} translations
   */
  server.decorate('request', 'getUiTranslations', _asyncToGenerator(function* () {
    const header = this.headers['accept-language'];
    const tags = acceptLanguageHeaderToBCP47Tags(header);

    const requestedTranslations = yield i18n.getTranslations(...tags);
    const defaultTranslations = yield i18n.getTranslationsForDefaultLocale();

    return (0, _lodash.defaults)({}, requestedTranslations, defaultTranslations);
  }));

  /**
   *  Return all translations for registered locales
   *  @name server.getAllUiTranslations
   *  @return {Promise<Object<locale:string,Object<id:string,value:string>>>}
   */
  server.decorate('server', 'getAllUiTranslations', _asyncToGenerator(function* () {
    return yield i18n.getAllTranslations();
  }));
}
