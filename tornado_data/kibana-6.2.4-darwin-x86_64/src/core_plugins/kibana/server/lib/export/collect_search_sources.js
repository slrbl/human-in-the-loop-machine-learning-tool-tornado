'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectSearchSources = undefined;

let collectSearchSources = exports.collectSearchSources = (() => {
  var _ref = _asyncToGenerator(function* (savedObjectsClient, panels) {
    const docs = panels.reduce(function (acc, panel) {
      const savedSearchId = panel.attributes.savedSearchId;

      if (savedSearchId) {
        if (!acc.find(function (s) {
          return s.id === savedSearchId;
        }) && !panels.find(function (p) {
          return p.id === savedSearchId;
        })) {
          acc.push({ type: 'search', id: savedSearchId });
        }
      }
      return acc;
    }, []);

    if (docs.length === 0) return [];

    var _ref2 = yield savedObjectsClient.bulkGet(docs);

    const savedObjects = _ref2.saved_objects;

    const indexPatterns = yield (0, _collect_index_patterns.collectIndexPatterns)(savedObjectsClient, savedObjects);

    return savedObjects.concat(indexPatterns);
  });

  return function collectSearchSources(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _collect_index_patterns = require('./collect_index_patterns');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
