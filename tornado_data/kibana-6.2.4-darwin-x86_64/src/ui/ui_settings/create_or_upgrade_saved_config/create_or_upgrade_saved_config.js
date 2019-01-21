'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpgradeSavedConfig = undefined;

let createOrUpgradeSavedConfig = exports.createOrUpgradeSavedConfig = (() => {
  var _ref = _asyncToGenerator(function* (options) {
    const savedObjectsClient = options.savedObjectsClient,
          version = options.version,
          buildNum = options.buildNum,
          log = options.log;

    // try to find an older config we can upgrade

    const upgradeableConfig = yield (0, _get_upgradeable_config.getUpgradeableConfig)({
      savedObjectsClient,
      version
    });

    if (upgradeableConfig) {
      log(['plugin', 'elasticsearch'], {
        tmpl: 'Upgrade config from <%= prevVersion %> to <%= newVersion %>',
        prevVersion: upgradeableConfig.id,
        newVersion: version
      });
    }

    // default to the attributes of the upgradeableConfig if available
    const attributes = (0, _lodash.defaults)({ buildNum }, upgradeableConfig ? upgradeableConfig.attributes : {});

    // create the new SavedConfig
    yield savedObjectsClient.create('config', attributes, { id: version });
  });

  return function createOrUpgradeSavedConfig(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

var _get_upgradeable_config = require('./get_upgradeable_config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
