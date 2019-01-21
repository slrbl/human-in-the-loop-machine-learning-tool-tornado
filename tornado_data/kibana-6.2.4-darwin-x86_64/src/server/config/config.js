'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _override = require('./override');

var _override2 = _interopRequireDefault(_override);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = Symbol('Joi Schema');
const schemaExts = Symbol('Schema Extensions');
const vals = Symbol('config values');

class Config {
  static withDefaultSchema(settings = {}) {
    return new Config((0, _schema2.default)(), settings);
  }

  constructor(initialSchema, initialSettings) {
    this[schemaExts] = Object.create(null);
    this[vals] = Object.create(null);

    this.extendSchema(initialSchema, initialSettings);
  }

  extendSchema(extension, settings, key) {
    if (!extension) {
      return;
    }

    if (!key) {
      return _lodash2.default.each(extension._inner.children, child => {
        this.extendSchema(child.schema, _lodash2.default.get(settings, child.key), child.key);
      });
    }

    if (this.has(key)) {
      throw new Error(`Config schema already has key: ${key}`);
    }

    _lodash2.default.set(this[schemaExts], key, extension);
    this[schema] = null;

    this.set(key, settings);
  }

  removeSchema(key) {
    if (!_lodash2.default.has(this[schemaExts], key)) {
      throw new TypeError(`Unknown schema key: ${key}`);
    }

    this[schema] = null;
    (0, _utils.unset)(this[schemaExts], key);
    (0, _utils.unset)(this[vals], key);
  }

  resetTo(obj) {
    this._commit(obj);
  }

  set(key, value) {
    // clone and modify the config
    let config = (0, _utils.deepCloneWithBuffers)(this[vals]);
    if (_lodash2.default.isPlainObject(key)) {
      config = (0, _override2.default)(config, key);
    } else {
      _lodash2.default.set(config, key, value);
    }

    // attempt to validate the config value
    this._commit(config);
  }

  _commit(newVals) {
    // resolve the current environment
    let env = newVals.env;
    delete newVals.env;
    if (_lodash2.default.isObject(env)) env = env.name;
    if (!env) env = 'production';

    const dev = env === 'development';
    const prod = env === 'production';

    // pass the environment as context so that it can be refed in config
    const context = {
      env: env,
      prod: prod,
      dev: dev,
      notProd: !prod,
      notDev: !dev,
      version: _lodash2.default.get(_utils.pkg, 'version'),
      branch: _lodash2.default.get(_utils.pkg, 'branch'),
      buildNum: dev ? Math.pow(2, 53) - 1 : _lodash2.default.get(_utils.pkg, 'build.number', NaN),
      buildSha: dev ? 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' : _lodash2.default.get(_utils.pkg, 'build.sha', '')
    };

    if (!context.dev && !context.prod) {
      throw new TypeError(`Unexpected environment "${env}", expected one of "development" or "production"`);
    }

    const results = _joi2.default.validate(newVals, this.getSchema(), {
      context,
      abortEarly: false
    });

    if (results.error) {
      throw results.error;
    }

    this[vals] = results.value;
  }

  get(key) {
    if (!key) {
      return (0, _utils.deepCloneWithBuffers)(this[vals]);
    }

    const value = _lodash2.default.get(this[vals], key);
    if (value === undefined) {
      if (!this.has(key)) {
        throw new Error('Unknown config key: ' + key);
      }
    }
    return (0, _utils.deepCloneWithBuffers)(value);
  }

  has(key) {
    function has(key, schema, path) {
      path = path || [];
      // Catch the partial paths
      if (path.join('.') === key) return true;
      // Only go deep on inner objects with children
      if (_lodash2.default.size(schema._inner.children)) {
        for (let i = 0; i < schema._inner.children.length; i++) {
          const child = schema._inner.children[i];
          // If the child is an object recurse through it's children and return
          // true if there's a match
          if (child.schema._type === 'object') {
            if (has(key, child.schema, path.concat([child.key]))) return true;
            // if the child matches, return true
          } else if (path.concat([child.key]).join('.') === key) {
            return true;
          }
        }
      }
    }

    if (Array.isArray(key)) {
      // TODO: add .has() support for array keys
      key = key.join('.');
    }

    return !!has(key, this.getSchema());
  }

  getSchema() {
    if (!this[schema]) {
      this[schema] = function convertToSchema(children) {
        let schema = _joi2.default.object().keys({}).default();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const key = _step.value;

            const child = children[key];
            const childSchema = _lodash2.default.isPlainObject(child) ? convertToSchema(child) : child;

            if (!childSchema || !childSchema.isJoi) {
              throw new TypeError('Unable to convert configuration definition value to Joi schema: ' + childSchema);
            }

            schema = schema.keys({ [key]: childSchema });
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

        return schema;
      }(this[schemaExts]);
    }

    return this[schema];
  }
}
exports.Config = Config;
