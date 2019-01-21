'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _Stats = require('webpack/lib/Stats');

var _Stats2 = _interopRequireDefault(_Stats);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _lodash = require('lodash');

var _utils = require('../utils');

var _public_path_placeholder = require('./public_path_placeholder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const POSTCSS_CONFIG_PATH = require.resolve('./postcss.config');
const BABEL_PRESET_PATH = require.resolve('../babel-preset/webpack');
const BABEL_EXCLUDE_RE = [/[\/\\](webpackShims|node_modules|bower_components)[\/\\]/];

class BaseOptimizer {
  constructor(opts) {
    this.uiBundles = opts.uiBundles;
    this.profile = opts.profile || false;

    switch (opts.sourceMaps) {
      case true:
        this.sourceMaps = 'source-map';
        break;

      case 'fast':
        this.sourceMaps = 'cheap-module-eval-source-map';
        break;

      default:
        this.sourceMaps = opts.sourceMaps || false;
        break;
    }

    this.unsafeCache = opts.unsafeCache || false;
    if (typeof this.unsafeCache === 'string') {
      this.unsafeCache = [new RegExp(this.unsafeCache.slice(1, -1))];
    }
  }

  initCompiler() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.compiler) return _this.compiler;

      const compilerConfig = _this.getConfig();
      _this.compiler = (0, _webpack2.default)(compilerConfig);

      _this.compiler.plugin('done', function (stats) {
        if (!_this.profile) return;

        const path = _this.uiBundles.resolvePath('stats.json');
        const content = JSON.stringify(stats.toJson());
        (0, _fs.writeFile)(path, content, function (err) {
          if (err) throw err;
        });
      });

      return _this.compiler;
    })();
  }

  getConfig() {
    function getStyleLoaders(preProcessors = [], postProcessors = []) {
      return _extractTextWebpackPlugin2.default.extract({
        fallback: {
          loader: 'style-loader'
        },
        use: [...postProcessors, {
          loader: 'css-loader',
          options: {
            // importLoaders needs to know the number of loaders that follow this one,
            // so we add 1 (for the postcss-loader) to the length of the preProcessors
            // array that we merge into this array
            importLoaders: 1 + preProcessors.length
          }
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: POSTCSS_CONFIG_PATH
            }
          }
        }, ...preProcessors]
      });
    }

    const nodeModulesPath = (0, _utils.fromRoot)('node_modules');

    /**
     * Adds a cache loader if we're running in dev mode. The reason we're not adding
     * the cache-loader when running in production mode is that it creates cache
     * files in optimize/.cache that are not necessary for distributable versions
     * of Kibana and just make compressing and extracting it more difficult.
     */
    function maybeAddCacheLoader(uiBundles, cacheName, loaders) {
      if (!uiBundles.isDevMode()) {
        return loaders;
      }

      return [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: uiBundles.getCacheDirectory(cacheName)
        }
      }, ...loaders];
    }

    const commonConfig = {
      node: { fs: 'empty' },
      context: (0, _utils.fromRoot)('.'),
      entry: this.uiBundles.toWebpackEntries(),

      devtool: this.sourceMaps,
      profile: this.profile || false,

      output: {
        path: this.uiBundles.getWorkingDir(),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        publicPath: _public_path_placeholder.PUBLIC_PATH_PLACEHOLDER,
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
      },

      plugins: [new _extractTextWebpackPlugin2.default('[name].style.css', {
        allChunks: true
      }), new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.bundle.js',
        minChunks: 2
      }), new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.bundle.js',
        // only combine node_modules from Kibana
        minChunks: module => module.context && module.context.indexOf(nodeModulesPath) !== -1
      }), new _webpack2.default.NoEmitOnErrorsPlugin()],

      module: {
        rules: [{
          test: /\.less$/,
          use: getStyleLoaders(['less-loader'], maybeAddCacheLoader(this.uiBundles, 'less', []))
        }, {
          test: /\.css$/,
          use: getStyleLoaders()
        }, {
          // TODO: this doesn't seem to be used, remove?
          test: /\.jade$/,
          loader: 'jade-loader'
        }, {
          test: /\.(html|tmpl)$/,
          loader: 'raw-loader'
        }, {
          test: /\.png$/,
          loader: 'url-loader'
        }, {
          test: /\.(woff|woff2|ttf|eot|svg|ico)(\?|$)/,
          loader: 'file-loader'
        }, {
          test: /\.js$/,
          exclude: BABEL_EXCLUDE_RE.concat(this.uiBundles.getWebpackNoParseRules()),
          use: maybeAddCacheLoader(this.uiBundles, 'babel', [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [BABEL_PRESET_PATH]
            }
          }])
        }, ...this.uiBundles.getPostLoaders().map(loader => _extends({
          enforce: 'post'
        }, loader))],
        noParse: this.uiBundles.getWebpackNoParseRules()
      },

      resolve: {
        extensions: ['.js', '.json'],
        mainFields: ['browser', 'browserify', 'main'],
        modules: ['webpackShims', (0, _utils.fromRoot)('webpackShims'), 'node_modules', (0, _utils.fromRoot)('node_modules')],
        alias: this.uiBundles.getAliases(),
        unsafeCache: this.unsafeCache
      }
    };

    if (this.uiBundles.isDevMode()) {
      return (0, _webpackMerge2.default)(commonConfig, {
        // In the test env we need to add react-addons (and a few other bits) for the
        // enzyme tests to work.
        // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
        externals: {
          'mocha': 'mocha',
          'react/lib/ExecutionEnvironment': true,
          'react/addons': true,
          'react/lib/ReactContext': true
        }
      });
    }

    return (0, _webpackMerge2.default)(commonConfig, {
      plugins: [new _webpack2.default.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      }), new _webpack2.default.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false,
        mangle: false
      })]
    });
  }

  failedStatsToError(stats) {
    const details = stats.toString((0, _lodash.defaults)({ colors: true }, _Stats2.default.presetToOptions('minimal')));

    return _boom2.default.create(500, `Optimizations failure.\n${details.split('\n').join('\n    ')}\n`, stats.toJson(_Stats2.default.presetToOptions('detailed')));
  }
}
exports.default = BaseOptimizer;
module.exports = exports['default'];
