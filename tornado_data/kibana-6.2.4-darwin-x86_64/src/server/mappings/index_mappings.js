'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexMappings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _utils = require('../../utils');

var _lib = require('./lib');

const DEFAULT_INITIAL_DSL = {
  rootType: {
    type: 'object',
    properties: {}
  }
};

class IndexMappings {
  constructor(initialDsl = DEFAULT_INITIAL_DSL, mappingExtensions = []) {
    this._dsl = (0, _lodash.cloneDeep)(initialDsl);
    if (!(0, _lodash.isPlainObject)(this._dsl)) {
      throw new TypeError('initial mapping must be an object');
    }

    // ensure that we have a properties object in the dsl
    // and that the dsl can be parsed with getRootProperties() and kin
    this._setProperties((0, _lib.getRootProperties)(this._dsl) || {});

    // extend this._dsl with each extension (which currently come from uiExports.savedObjectMappings)
    mappingExtensions.forEach(({ properties, pluginId }) => {
      const rootProperties = (0, _lib.getRootProperties)(this._dsl);

      const conflicts = Object.keys(properties).filter(key => rootProperties.hasOwnProperty(key));

      if (conflicts.length) {
        const props = (0, _utils.formatListAsProse)(conflicts);
        const owner = pluginId ? `registered by plugin ${pluginId} ` : '';
        throw new Error(`Mappings for ${props} ${owner}have already been defined`);
      }

      this._setProperties(_extends({}, rootProperties, properties));
    });
  }

  getDsl() {
    return (0, _lodash.cloneDeep)(this._dsl);
  }

  _setProperties(newProperties) {
    const rootType = (0, _lib.getRootType)(this._dsl);
    this._dsl = _extends({}, this._dsl, {
      [rootType]: _extends({}, this._dsl[rootType], {
        properties: newProperties
      })
    });
  }
}
exports.IndexMappings = IndexMappings;
