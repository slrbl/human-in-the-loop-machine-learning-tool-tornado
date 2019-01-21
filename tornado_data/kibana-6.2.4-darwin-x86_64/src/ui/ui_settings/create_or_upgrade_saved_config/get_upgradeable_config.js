'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpgradeableConfig = undefined;

/**
 *  Find the most recent SavedConfig that is upgradeable to the specified version
 *  @param {Object} options
 *  @property {SavedObjectsClient} savedObjectsClient
 *  @property {string} version
 *  @return {Promise<SavedConfig|undefined>}
 */
let getUpgradeableConfig = exports.getUpgradeableConfig = (() => {
  var _ref = _asyncToGenerator(function* ({ savedObjectsClient, version }) {
    // attempt to find a config we can upgrade
    var _ref2 = yield savedObjectsClient.find({
      type: 'config',
      page: 1,
      perPage: 1000,
      sortField: 'buildNum',
      sortOrder: 'desc'
    });

    const savedConfigs = _ref2.saved_objects;

    // try to find a config that we can upgrade

    return savedConfigs.find(function (savedConfig) {
      return (0, _is_config_version_upgradeable.isConfigVersionUpgradeable)(savedConfig.id, version);
    });
  });

  return function getUpgradeableConfig(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _is_config_version_upgradeable = require('./is_config_version_upgradeable');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
