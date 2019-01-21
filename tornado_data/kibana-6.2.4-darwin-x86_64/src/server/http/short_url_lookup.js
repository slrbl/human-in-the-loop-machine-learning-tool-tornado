'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (server) {
  let updateMetadata = (() => {
    var _ref = _asyncToGenerator(function* (doc, req) {
      try {
        yield req.getSavedObjectsClient().update('url', doc.id, {
          accessDate: new Date(),
          accessCount: (0, _lodash.get)(doc, 'attributes.accessCount', 0) + 1
        });
      } catch (err) {
        server.log('Warning: Error updating url metadata', err);
        //swallow errors. It isn't critical if there is no update.
      }
    });

    return function updateMetadata(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

  return {
    generateUrlId(url, req) {
      return _asyncToGenerator(function* () {
        const id = _crypto2.default.createHash('md5').update(url).digest('hex');
        const savedObjectsClient = req.getSavedObjectsClient();
        const isConflictError = savedObjectsClient.errors.isConflictError;


        try {
          const doc = yield savedObjectsClient.create('url', {
            url,
            accessCount: 0,
            createDate: new Date(),
            accessDate: new Date()
          }, { id });

          return doc.id;
        } catch (error) {
          if (isConflictError(error)) {
            return id;
          }

          throw error;
        }
      })();
    },

    getUrl(id, req) {
      return _asyncToGenerator(function* () {
        const doc = yield req.getSavedObjectsClient().get('url', id);
        updateMetadata(doc, req);

        return doc.attributes.url;
      })();
    }
  };
};

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = exports['default'];
