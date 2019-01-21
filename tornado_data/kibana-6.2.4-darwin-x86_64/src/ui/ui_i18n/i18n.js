'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18n = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const asyncReadFile = _bluebird2.default.promisify(_fs.readFile);

const TRANSLATION_FILE_EXTENSION = '.json';

function getLocaleFromFileName(fullFileName) {
  if (_lodash2.default.isEmpty(fullFileName)) throw new Error('Filename empty');

  const fileExt = _path2.default.extname(fullFileName);
  if (fileExt.length <= 0 || fileExt !== TRANSLATION_FILE_EXTENSION) {
    throw new Error('Translations must be in a JSON file. File being registered is ' + fullFileName);
  }

  return _path2.default.basename(fullFileName, TRANSLATION_FILE_EXTENSION);
}

function getBestLocaleMatch(languageTag, registeredLocales) {
  if (_lodash2.default.contains(registeredLocales, languageTag)) {
    return languageTag;
  }

  // Find the first registered locale that begins with one of the language codes from the provided language tag.
  // For example, if there is an 'en' language code, it would match an 'en-US' registered locale.
  const languageCode = _lodash2.default.first(languageTag.split('-')) || [];
  return _lodash2.default.find(registeredLocales, locale => _lodash2.default.startsWith(locale, languageCode));
}

class I18n {
  static getAllTranslationsFromPaths(paths) {
    return _asyncToGenerator(function* () {
      const i18n = new I18n();

      paths.forEach(function (path) {
        i18n.registerTranslations(path);
      });

      return yield i18n.getAllTranslations();
    })();
  }

  constructor(defaultLocale = 'en') {
    this._registeredTranslations = {};

    this._defaultLocale = defaultLocale;
  }

  /**
   * Return all translations for registered locales
   * @return {Promise<Object>} translations - A Promise object where keys are
   *                                          the locale and values are Objects
   *                                          of translation keys and translations
   */
  getAllTranslations() {
    const localeTranslations = {};

    const locales = this._getRegisteredTranslationLocales();
    const translations = _lodash2.default.map(locales, locale => {
      return this._getTranslationsForLocale(locale).then(function (translations) {
        localeTranslations[locale] = translations;
      });
    });

    return _bluebird2.default.all(translations).then(() => _lodash2.default.assign({}, localeTranslations));
  }

  /**
   * Return translations for a suitable locale from a user side locale list
   * @param {...string} languageTags -  BCP 47 language tags. The tags are listed in priority order as set in the Accept-Language header.
   * @returns {Promise<Object>} translations - promise for an object where
   *                                           keys are translation keys and
   *                                           values are translations
   * This object will contain all registered translations for the highest priority locale which is registered with the i18n module.
   * This object can be empty if no locale in the language tags can be matched against the registered locales.
   */
  getTranslations(...languageTags) {
    const locale = this._getTranslationLocale(languageTags);
    return this._getTranslationsForLocale(locale);
  }

  /**
   * Return all translations registered for the default locale.
   * @returns {Promise<Object>} translations - promise for an object where
   *                                           keys are translation keys and
   *                                           values are translations
   */
  getTranslationsForDefaultLocale() {
    return this._getTranslationsForLocale(this._defaultLocale);
  }

  /**
   * The translation file is registered with i18n plugin. The plugin contains a list of registered translation file paths per language.
   * @param {String} absolutePluginTranslationFilePath - Absolute path to the translation file to register.
   */
  registerTranslations(absolutePluginTranslationFilePath) {
    if (!_path2.default.isAbsolute(absolutePluginTranslationFilePath)) {
      throw new TypeError('Paths to translation files must be absolute. ' + `Got relative path: "${absolutePluginTranslationFilePath}"`);
    }

    const locale = getLocaleFromFileName(absolutePluginTranslationFilePath);

    this._registeredTranslations[locale] = _lodash2.default.uniq(_lodash2.default.get(this._registeredTranslations, locale, []).concat(absolutePluginTranslationFilePath));
  }

  _getRegisteredTranslationLocales() {
    return Object.keys(this._registeredTranslations);
  }

  _getTranslationLocale(languageTags) {
    let locale = '';
    const registeredLocales = this._getRegisteredTranslationLocales();
    _lodash2.default.forEach(languageTags, tag => {
      locale = locale || getBestLocaleMatch(tag, registeredLocales);
    });
    return locale;
  }

  _getTranslationsForLocale(locale) {
    if (!this._registeredTranslations.hasOwnProperty(locale)) {
      return _bluebird2.default.resolve({});
    }

    const translationFiles = this._registeredTranslations[locale];
    const translations = _lodash2.default.map(translationFiles, filename => {
      return asyncReadFile(filename, 'utf8').then(fileContents => JSON.parse(fileContents)).catch(SyntaxError, function () {
        throw new Error('Invalid json in ' + filename);
      }).catch(function () {
        throw new Error('Cannot read file ' + filename);
      });
    });

    return _bluebird2.default.all(translations).then(translations => _lodash2.default.assign({}, ...translations));
  }
}
exports.I18n = I18n;
