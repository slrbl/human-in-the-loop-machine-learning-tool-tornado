'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDeprecations = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _deprecation = require('../../deprecation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rename = _deprecation.Deprecations.rename,
      unused = _deprecation.Deprecations.unused;


const serverSslEnabled = (settings, log) => {
  const has = (0, _lodash.partial)(_lodash2.default.has, settings);
  const set = (0, _lodash.partial)(_lodash2.default.set, settings);

  if (!has('server.ssl.enabled') && has('server.ssl.certificate') && has('server.ssl.key')) {
    set('server.ssl.enabled', true);
    log('Enabling ssl by only specifying server.ssl.certificate and server.ssl.key is deprecated. Please set server.ssl.enabled to true');
  }
};

const savedObjectsIndexCheckTimeout = (settings, log) => {
  if (_lodash2.default.has(settings, 'savedObjects.indexCheckTimeout')) {
    log('savedObjects.indexCheckTimeout is no longer necessary.');

    if (Object.keys(settings.savedObjects).length > 1) {
      delete settings.savedObjects.indexCheckTimeout;
    } else {
      delete settings.savedObjects;
    }
  }
};

const deprecations = [
//server
rename('server.ssl.cert', 'server.ssl.certificate'), unused('server.xsrf.token'), unused('uiSettings.enabled'), rename('optimize.lazy', 'optimize.watch'), rename('optimize.lazyPort', 'optimize.watchPort'), rename('optimize.lazyHost', 'optimize.watchHost'), rename('optimize.lazyPrebuild', 'optimize.watchPrebuild'), rename('optimize.lazyProxyTimeout', 'optimize.watchProxyTimeout'), serverSslEnabled, savedObjectsIndexCheckTimeout];

const transformDeprecations = exports.transformDeprecations = (0, _deprecation.createTransform)(deprecations);
