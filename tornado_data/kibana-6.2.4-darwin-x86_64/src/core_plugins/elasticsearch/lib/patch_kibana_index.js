'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchKibanaIndex = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *  Checks that the root type in the kibana index has all of the
 *  root properties specified by the kibanaIndexMappings.
 *
 *  @param  {Object} options
 *  @property {Function} options.log
 *  @property {string} options.indexName
 *  @property {Function} options.callCluster
 *  @property {EsMappingsDsl} options.kibanaIndexMappingsDsl
 *  @return {Promise<undefined>}
 */
let patchKibanaIndex = exports.patchKibanaIndex = (() => {
  var _ref = _asyncToGenerator(function* (options) {
    const log = options.log,
          indexName = options.indexName,
          callCluster = options.callCluster,
          kibanaIndexMappingsDsl = options.kibanaIndexMappingsDsl;


    const rootEsType = (0, _mappings.getRootType)(kibanaIndexMappingsDsl);
    const currentMappingsDsl = yield getCurrentMappings(callCluster, indexName, rootEsType);

    // patchKibanaIndex() should do nothing if there are no current mappings
    if (!currentMappingsDsl) {
      return;
    }

    const missingProperties = yield getMissingRootProperties(currentMappingsDsl, kibanaIndexMappingsDsl);

    const missingPropertyNames = Object.keys(missingProperties);
    if (!missingPropertyNames.length) {
      // all expected properties are in current mapping
      return;
    }

    // log about new properties
    log(['info', 'elasticsearch'], {
      tmpl: `Adding mappings to kibana index for SavedObject types "<%= names.join('", "') %>"`,
      names: missingPropertyNames
    });

    // add the new properties to the index mapping
    yield callCluster('indices.putMapping', {
      index: indexName,
      type: rootEsType,
      body: {
        properties: missingProperties
      },
      update_all_types: true
    });
  });

  return function patchKibanaIndex(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *  Get the mappings dsl for the current Kibana index if it exists
 *  @param  {Function} callCluster
 *  @param  {string} indexName
 *  @param  {string} rootEsType
 *  @return {EsMappingsDsl|undefined}
 */


let getCurrentMappings = (() => {
  var _ref2 = _asyncToGenerator(function* (callCluster, indexName, rootEsType) {
    const response = yield callCluster('indices.get', {
      index: indexName,
      feature: '_mappings',
      ignore: [404]
    });

    if (response.status === 404) {
      return undefined;
    }

    // could be different if aliases were resolved by `indices.get`
    const resolvedName = Object.keys(response)[0];
    const currentMappingsDsl = response[resolvedName].mappings;
    const currentTypes = (0, _mappings.getTypes)(currentMappingsDsl);

    const isV5Index = currentTypes.length > 1 || currentTypes[0] !== rootEsType;
    if (isV5Index) {
      throw new Error('Your Kibana index is out of date, reset it or use the X-Pack upgrade assistant.');
    }

    return currentMappingsDsl;
  });

  return function getCurrentMappings(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 *  Get the properties that are in the expectedMappingsDsl but not the
 *  currentMappingsDsl. Properties will be an object of properties normally
 *  found at `[index]mappings[typeName].properties` is es mapping responses
 *
 *  @param  {EsMappingsDsl} currentMappingsDsl
 *  @param  {EsMappingsDsl} expectedMappingsDsl
 *  @return {PropertyMappings}
 */


let getMissingRootProperties = (() => {
  var _ref3 = _asyncToGenerator(function* (currentMappingsDsl, expectedMappingsDsl) {
    const expectedProps = (0, _mappings.getRootProperties)(expectedMappingsDsl);
    const existingProps = (0, _mappings.getRootProperties)(currentMappingsDsl);

    return Object.keys(expectedProps).reduce(function (acc, prop) {
      if (existingProps[prop]) {
        return acc;
      } else {
        return _extends({}, acc, { [prop]: expectedProps[prop] });
      }
    }, {});
  });

  return function getMissingRootProperties(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

var _mappings = require('../../../server/mappings');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
