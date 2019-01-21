'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsClient = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _mappings = require('../../mappings');

var _lib = require('./lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class SavedObjectsClient {
  constructor(options) {
    this.errors = _lib.errors;
    const index = options.index,
          mappings = options.mappings,
          callCluster = options.callCluster;
    var _options$onBeforeWrit = options.onBeforeWrite;
    const onBeforeWrite = _options$onBeforeWrit === undefined ? () => {} : _options$onBeforeWrit;


    this._index = index;
    this._mappings = mappings;
    this._type = (0, _mappings.getRootType)(this._mappings);
    this._onBeforeWrite = onBeforeWrite;
    this._unwrappedCallCluster = callCluster;
  }

  /**
   * ## SavedObjectsClient errors
   *
   * Since the SavedObjectsClient has its hands in everything we
   * are a little paranoid about the way we present errors back to
   * to application code. Ideally, all errors will be either:
   *
   *   1. Caused by bad implementation (ie. undefined is not a function) and
   *      as such unpredictable
   *   2. An error that has been classified and decorated appropriately
   *      by the decorators in `./lib/errors`
   *
   * Type 1 errors are inevitable, but since all expected/handle-able errors
   * should be Type 2 the `isXYZError()` helpers exposed at
   * `savedObjectsClient.errors` should be used to understand and manage error
   * responses from the `SavedObjectsClient`.
   *
   * Type 2 errors are decorated versions of the source error, so if
   * the elasticsearch client threw an error it will be decorated based
   * on its type. That means that rather than looking for `error.body.error.type` or
   * doing substring checks on `error.body.error.reason`, just use the helpers to
   * understand the meaning of the error:
   *
   *   ```js
   *   if (savedObjectsClient.errors.isNotFoundError(error)) {
   *      // handle 404
   *   }
   *
   *   if (savedObjectsClient.errors.isNotAuthorizedError(error)) {
   *      // 401 handling should be automatic, but in case you wanted to know
   *   }
   *
   *   // always rethrow the error unless you handle it
   *   throw error;
   *   ```
   *
   * ### 404s from missing index
   *
   * From the perspective of application code and APIs the SavedObjectsClient is
   * a black box that persists objects. One of the internal details that users have
   * no control over is that we use an elasticsearch index for persistance and that
   * index might be missing.
   *
   * At the time of writing we are in the process of transitioning away from the
   * operating assumption that the SavedObjects index is always available. Part of
   * this transition is handling errors resulting from an index missing. These used
   * to trigger a 500 error in most cases, and in others cause 404s with different
   * error messages.
   *
   * From my (Spencer) perspective, a 404 from the SavedObjectsApi is a 404; The
   * object the request/call was targetting could not be found. This is why #14141
   * takes special care to ensure that 404 errors are generic and don't distinguish
   * between index missing or document missing.
   *
   * ### 503s from missing index
   *
   * Unlike all other methods, create requests are supposed to succeed even when
   * the Kibana index does not exist because it will be automatically created by
   * elasticsearch. When that is not the case it is because Elasticsearch's
   * `action.auto_create_index` setting prevents it from being created automatically
   * so we throw a special 503 with the intention of informing the user that their
   * Elasticsearch settings need to be updated.
   *
   * @type {ErrorHelpers} see ./lib/errors
   */


  /**
   * Persists an object
   *
   * @param {string} type
   * @param {object} attributes
   * @param {object} [options={}]
   * @property {string} [options.id] - force id on creation, not recommended
   * @property {boolean} [options.overwrite=false]
   * @returns {promise} - { id, type, version, attributes }
  */
  create(type, attributes = {}, options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const id = options.id;
      var _options$overwrite = options.overwrite;
      const overwrite = _options$overwrite === undefined ? false : _options$overwrite;


      const method = id && !overwrite ? 'create' : 'index';
      const time = _this._getCurrentTime();

      try {
        const response = yield _this._writeToCluster(method, {
          id: _this._generateEsId(type, id),
          type: _this._type,
          index: _this._index,
          refresh: 'wait_for',
          body: {
            type,
            updated_at: time,
            [type]: attributes
          }
        });

        return {
          id: (0, _lib.trimIdPrefix)(response._id, type),
          type,
          updated_at: time,
          version: response._version,
          attributes
        };
      } catch (error) {
        if (_lib.errors.isNotFoundError(error)) {
          // See "503s from missing index" above
          throw _lib.errors.createEsAutoCreateIndexError();
        }

        throw error;
      }
    })();
  }

  /**
   * Creates multiple documents at once
   *
   * @param {array} objects - [{ type, id, attributes }]
   * @param {object} [options={}]
   * @property {boolean} [options.overwrite=false] - overwrites existing documents
   * @returns {promise} - [{ id, type, version, attributes, error: { message } }]
   */
  bulkCreate(objects, options = {}) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var _options$overwrite2 = options.overwrite;
      const overwrite = _options$overwrite2 === undefined ? false : _options$overwrite2;

      const time = _this2._getCurrentTime();
      const objectToBulkRequest = function objectToBulkRequest(object) {
        const method = object.id && !overwrite ? 'create' : 'index';

        return [{
          [method]: {
            _id: _this2._generateEsId(object.type, object.id),
            _type: _this2._type
          }
        }, {
          type: object.type,
          updated_at: time,
          [object.type]: object.attributes
        }];
      };

      var _ref = yield _this2._writeToCluster('bulk', {
        index: _this2._index,
        refresh: 'wait_for',
        body: objects.reduce(function (acc, object) {
          return [...acc, ...objectToBulkRequest(object)];
        }, [])
      });

      const items = _ref.items;


      return items.map(function (response, i) {
        var _Object$values$ = Object.values(response)[0];
        const error = _Object$values$.error,
              responseId = _Object$values$._id,
              version = _Object$values$._version;
        var _objects$i = objects[i],
            _objects$i$id = _objects$i.id;
        const id = _objects$i$id === undefined ? responseId : _objects$i$id,
              type = _objects$i.type,
              attributes = _objects$i.attributes;


        if (error) {
          return {
            id,
            type,
            error: {
              message: error.reason || JSON.stringify(error)
            }
          };
        }

        return {
          id,
          type,
          updated_at: time,
          version,
          attributes
        };
      });
    })();
  }

  /**
   * Deletes an object
   *
   * @param {string} type
   * @param {string} id
   * @returns {promise}
   */
  delete(type, id) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const response = yield _this3._writeToCluster('delete', {
        id: _this3._generateEsId(type, id),
        type: _this3._type,
        index: _this3._index,
        refresh: 'wait_for',
        ignore: [404]
      });

      const deleted = response.result === 'deleted';
      if (deleted) {
        return {};
      }

      const docNotFound = response.result === 'not_found';
      const indexNotFound = response.error && response.error.type === 'index_not_found_exception';
      if (docNotFound || indexNotFound) {
        // see "404s from missing index" above
        throw _lib.errors.createGenericNotFoundError();
      }

      throw new Error(`Unexpected Elasticsearch DELETE response: ${JSON.stringify({ type, id, response })}`);
    })();
  }

  /**
   * @param {object} [options={}]
   * @property {string} [options.type]
   * @property {string} [options.search]
   * @property {Array<string>} [options.searchFields] - see Elasticsearch Simple Query String
   *                                        Query field argument for more information
   * @property {integer} [options.page=1]
   * @property {integer} [options.perPage=20]
   * @property {string} [options.sortField]
   * @property {string} [options.sortOrder]
   * @property {Array<string>} [options.fields]
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }], total, per_page, page }
   */
  find(options = {}) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const type = options.type,
            search = options.search,
            searchFields = options.searchFields;
      var _options$page = options.page;
      const page = _options$page === undefined ? 1 : _options$page;
      var _options$perPage = options.perPage;
      const perPage = _options$perPage === undefined ? 20 : _options$perPage,
            sortField = options.sortField,
            sortOrder = options.sortOrder,
            fields = options.fields;


      if (searchFields && !Array.isArray(searchFields)) {
        throw new TypeError('options.searchFields must be an array');
      }

      if (fields && !Array.isArray(fields)) {
        throw new TypeError('options.searchFields must be an array');
      }

      const esOptions = {
        index: _this4._index,
        size: perPage,
        from: perPage * (page - 1),
        _source: (0, _lib.includedFields)(type, fields),
        ignore: [404],
        body: _extends({
          version: true
        }, (0, _lib.getSearchDsl)(_this4._mappings, {
          search,
          searchFields,
          type,
          sortField,
          sortOrder
        }))
      };

      const response = yield _this4._callCluster('search', esOptions);

      if (response.status === 404) {
        // 404 is only possible here if the index is missing, which
        // we don't want to leak, see "404s from missing index" above
        return {
          page,
          per_page: perPage,
          total: 0,
          saved_objects: []
        };
      }

      return {
        page,
        per_page: perPage,
        total: response.hits.total,
        saved_objects: response.hits.hits.map(function (hit) {
          var _hit$_source = hit._source;
          const type = _hit$_source.type,
                updatedAt = _hit$_source.updated_at;

          return _extends({
            id: (0, _lib.trimIdPrefix)(hit._id, type),
            type
          }, updatedAt && { updated_at: updatedAt }, {
            version: hit._version,
            attributes: hit._source[type]
          });
        })
      };
    })();
  }

  /**
   * Returns an array of objects by id
   *
   * @param {array} objects - an array ids, or an array of objects containing id and optionally type
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }] }
   * @example
   *
   * bulkGet([
   *   { id: 'one', type: 'config' },
   *   { id: 'foo', type: 'index-pattern' }
   * ])
   */
  bulkGet(objects = []) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (objects.length === 0) {
        return { saved_objects: [] };
      }

      const response = yield _this5._callCluster('mget', {
        index: _this5._index,
        body: {
          docs: objects.map(function (object) {
            return {
              _id: _this5._generateEsId(object.type, object.id),
              _type: _this5._type
            };
          })
        }
      });

      return {
        saved_objects: response.docs.map(function (doc, i) {
          var _objects$i2 = objects[i];
          const id = _objects$i2.id,
                type = _objects$i2.type;


          if (!doc.found) {
            return {
              id,
              type,
              error: { statusCode: 404, message: 'Not found' }
            };
          }

          const time = doc._source.updated_at;
          return _extends({
            id,
            type
          }, time && { updated_at: time }, {
            version: doc._version,
            attributes: doc._source[type]
          });
        })
      };
    })();
  }

  /**
   * Gets a single object
   *
   * @param {string} type
   * @param {string} id
   * @returns {promise} - { id, type, version, attributes }
   */
  get(type, id) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const response = yield _this6._callCluster('get', {
        id: _this6._generateEsId(type, id),
        type: _this6._type,
        index: _this6._index,
        ignore: [404]
      });

      const docNotFound = response.found === false;
      const indexNotFound = response.status === 404;
      if (docNotFound || indexNotFound) {
        // see "404s from missing index" above
        throw _lib.errors.createGenericNotFoundError();
      }

      const updatedAt = response._source.updated_at;


      return _extends({
        id,
        type
      }, updatedAt && { updated_at: updatedAt }, {
        version: response._version,
        attributes: response._source[type]
      });
    })();
  }

  /**
   * Updates an object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {integer} options.version - ensures version matches that of persisted object
   * @returns {promise}
   */
  update(type, id, attributes, options = {}) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const time = _this7._getCurrentTime();
      const response = yield _this7._writeToCluster('update', {
        id: _this7._generateEsId(type, id),
        type: _this7._type,
        index: _this7._index,
        version: options.version,
        refresh: 'wait_for',
        ignore: [404],
        body: {
          doc: {
            updated_at: time,
            [type]: attributes
          }
        }
      });

      if (response.status === 404) {
        // see "404s from missing index" above
        throw _lib.errors.createGenericNotFoundError();
      }

      return {
        id,
        type,
        updated_at: time,
        version: response._version,
        attributes
      };
    })();
  }

  _writeToCluster(method, params) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      try {
        yield _this8._onBeforeWrite();
        return yield _this8._callCluster(method, params);
      } catch (err) {
        throw (0, _lib.decorateEsError)(err);
      }
    })();
  }

  _callCluster(method, params) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      try {
        return yield _this9._unwrappedCallCluster(method, params);
      } catch (err) {
        throw (0, _lib.decorateEsError)(err);
      }
    })();
  }

  _generateEsId(type, id) {
    return `${type}:${id || _uuid2.default.v1()}`;
  }

  _getCurrentTime() {
    return new Date().toISOString();
  }
}
exports.SavedObjectsClient = SavedObjectsClient;
SavedObjectsClient.errors = _lib.errors;
