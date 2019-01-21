'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBundlesController = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _crypto = require('crypto');

var _path = require('path');

var _ui_bundle = require('./ui_bundle');

var _bluebird = require('bluebird');

var _minimatch = require('minimatch');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _app_entry_template = require('./app_entry_template');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getWebpackAliases(pluginSpecs) {
  return pluginSpecs.reduce((aliases, spec) => {
    const publicDir = spec.getPublicDir();

    if (!publicDir) {
      return aliases;
    }

    return _extends({}, aliases, {
      [`plugins/${spec.getId()}`]: publicDir
    });
  }, {});
}

class UiBundlesController {
  constructor(kbnServer) {
    const config = kbnServer.config,
          uiApps = kbnServer.uiApps,
          uiExports = kbnServer.uiExports,
          pluginSpecs = kbnServer.pluginSpecs;


    this._workingDir = config.get('optimize.bundleDir');
    this._env = config.get('env.name');
    this._context = {
      env: config.get('env.name'),
      sourceMaps: config.get('optimize.sourceMaps'),
      kbnVersion: config.get('pkg.version'),
      buildNum: config.get('pkg.buildNum'),
      plugins: pluginSpecs.map(spec => spec.getId()).sort((a, b) => a.localeCompare(b))
    };

    this._filter = (0, _minimatch.makeRe)(config.get('optimize.bundleFilter') || '*', {
      noglobstar: true,
      noext: true,
      matchBase: true
    });

    this._webpackAliases = _extends({}, getWebpackAliases(pluginSpecs), uiExports.webpackAliases);
    this._webpackNoParseRules = uiExports.webpackNoParseRules;
    this._postLoaders = [];
    this._bundles = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = uiApps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const uiApp = _step.value;

        this.add({
          id: uiApp.getId(),
          modules: uiApp.getModules(),
          template: _app_entry_template.appEntryTemplate
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  add(bundleSpec) {
    const id = bundleSpec.id,
          modules = bundleSpec.modules,
          template = bundleSpec.template;


    if (this._filter.test(id)) {
      this._bundles.push(new _ui_bundle.UiBundle({
        id,
        modules,
        template,
        controller: this
      }));
    }
  }

  getWebpackNoParseRules() {
    return this._webpackNoParseRules;
  }

  getWorkingDir() {
    return this._workingDir;
  }

  addPostLoader(loaderSpec) {
    this._postLoaders.push(loaderSpec);
  }

  getPostLoaders() {
    return this._postLoaders;
  }

  getAliases() {
    return this._webpackAliases;
  }

  isDevMode() {
    return this._env === 'development';
  }

  getContext() {
    return JSON.stringify(this._context, null, '  ');
  }

  resolvePath(...args) {
    return (0, _path.resolve)(this._workingDir, ...args);
  }

  getCacheDirectory(...subPath) {
    return this.resolvePath('../.cache', this.hashBundleEntries(), ...subPath);
  }

  getDescription() {
    switch (this._bundles.length) {
      case 0:
        return '0 bundles';
      case 1:
        return `bundle for ${this._bundles[0].id}`;
      default:
        const ids = this.getIds();
        const last = ids.pop();
        const commas = ids.join(', ');
        return `bundles for ${commas} and ${last}`;
    }
  }

  ensureDir() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _mkdirp2.default)(_this._workingDir, cb);
      });
    })();
  }

  writeEntryFiles() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.ensureDir();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this2._bundles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          const bundle = _step2.value;

          const existing = yield bundle.readEntryFile();
          const expected = bundle.renderContent();

          if (existing !== expected) {
            yield bundle.writeEntryFile();
            yield bundle.clearBundleFile();
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    })();
  }

  ensureStyleFiles() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.ensureDir();

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _this3._bundles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          const bundle = _step3.value;

          if (!(yield bundle.hasStyleFile())) {
            yield bundle.touchStyleFile();
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    })();
  }

  hashBundleEntries() {
    const hash = (0, _crypto.createHash)('sha1');
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = this._bundles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        const bundle = _step4.value;

        hash.update(`bundleEntryPath:${bundle.getEntryPath()}`);
        hash.update(`bundleEntryContent:${bundle.renderContent()}`);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return hash.digest('hex');
  }

  areAllBundleCachesValid() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _this4._bundles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          const bundle = _step5.value;

          if (!(yield bundle.isCacheValid())) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return true;
    })();
  }

  toWebpackEntries() {
    return this._bundles.reduce((entries, bundle) => _extends({}, entries, {
      [bundle.getId()]: bundle.getEntryPath()
    }), {});
  }

  getIds() {
    return this._bundles.map(bundle => bundle.getId());
  }

  toJSON() {
    return this._bundles;
  }
}
exports.UiBundlesController = UiBundlesController;
