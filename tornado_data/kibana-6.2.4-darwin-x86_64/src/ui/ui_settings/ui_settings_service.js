'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsService = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _create_or_upgrade_saved_config = require('./create_or_upgrade_saved_config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function hydrateUserSettings(userSettings) {
  return Object.keys(userSettings).map(key => ({ key, userValue: userSettings[key] })).filter(({ userValue }) => userValue !== null).reduce((acc, { key, userValue }) => _extends({}, acc, { [key]: { userValue } }), {});
}

/**
 *  Service that provides access to the UiSettings stored in elasticsearch.
 *  @class UiSettingsService
 */
class UiSettingsService {
  /**
   *  @constructor
   *  @param {Object} options
   *  @property {string} options.type type of SavedConfig object
   *  @property {string} options.id id of SavedConfig object
   *  @property {number} options.buildNum
   *  @property {SavedObjectsClient} options.savedObjectsClient
   *  @property {Function} [options.getDefaults]
   *  @property {Function} [options.log]
   */
  constructor(options) {
    const type = options.type,
          id = options.id,
          buildNum = options.buildNum,
          savedObjectsClient = options.savedObjectsClient;
    var _options$getDefaults = options.getDefaults;
    const getDefaults = _options$getDefaults === undefined ? () => ({}) : _options$getDefaults;
    var _options$log = options.log;
    const log = _options$log === undefined ? () => {} : _options$log;


    this._type = type;
    this._id = id;
    this._buildNum = buildNum;
    this._savedObjectsClient = savedObjectsClient;
    this._getDefaults = getDefaults;
    this._log = log;
  }

  getDefaults() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return yield _this._getDefaults();
    })();
  }

  // returns a Promise for the value of the requested setting
  get(key) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const all = yield _this2.getAll();
      return all[key];
    })();
  }

  getAll() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const raw = yield _this3.getRaw();

      return Object.keys(raw).reduce(function (all, key) {
        const item = raw[key];
        const hasUserValue = 'userValue' in item;
        all[key] = hasUserValue ? item.userValue : item.value;
        return all;
      }, {});
    })();
  }

  getRaw() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const userProvided = yield _this4.getUserProvided();
      return (0, _lodash.defaultsDeep)(userProvided, (yield _this4.getDefaults()));
    })();
  }

  getUserProvided(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      return hydrateUserSettings((yield _this5._read(options)));
    })();
  }

  setMany(changes) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      yield _this6._write({ changes });
    })();
  }

  set(key, value) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      yield _this7.setMany({ [key]: value });
    })();
  }

  remove(key) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      yield _this8.set(key, null);
    })();
  }

  removeMany(keys) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      const changes = {};
      keys.forEach(function (key) {
        changes[key] = null;
      });
      yield _this9.setMany(changes);
    })();
  }

  _write({ changes, autoCreateOrUpgradeIfMissing = true }) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      try {
        yield _this10._savedObjectsClient.update(_this10._type, _this10._id, changes);
      } catch (error) {
        const isNotFoundError = _this10._savedObjectsClient.errors.isNotFoundError;

        if (!isNotFoundError(error) || !autoCreateOrUpgradeIfMissing) {
          throw error;
        }

        yield (0, _create_or_upgrade_saved_config.createOrUpgradeSavedConfig)({
          savedObjectsClient: _this10._savedObjectsClient,
          version: _this10._id,
          buildNum: _this10._buildNum,
          log: _this10._log
        });

        yield _this10._write({
          changes,
          autoCreateOrUpgradeIfMissing: false
        });
      }
    })();
  }

  _read(options = {}) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      var _options$ignore401Err = options.ignore401Errors;
      const ignore401Errors = _options$ignore401Err === undefined ? false : _options$ignore401Err;
      var _savedObjectsClient$e = _this11._savedObjectsClient.errors;
      const isNotFoundError = _savedObjectsClient$e.isNotFoundError,
            isForbiddenError = _savedObjectsClient$e.isForbiddenError,
            isEsUnavailableError = _savedObjectsClient$e.isEsUnavailableError,
            isNotAuthorizedError = _savedObjectsClient$e.isNotAuthorizedError;


      const isIgnorableError = function isIgnorableError(error) {
        return isNotFoundError(error) || isForbiddenError(error) || isEsUnavailableError(error) || ignore401Errors && isNotAuthorizedError(error);
      };

      try {
        const resp = yield _this11._savedObjectsClient.get(_this11._type, _this11._id);
        return resp.attributes;
      } catch (error) {
        if (isIgnorableError(error)) {
          return {};
        }

        throw error;
      }
    })();
  }
}
exports.UiSettingsService = UiSettingsService;
