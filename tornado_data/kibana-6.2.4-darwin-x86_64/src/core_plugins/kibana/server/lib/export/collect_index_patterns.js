'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let collectIndexPatterns = exports.collectIndexPatterns = (() => {
  var _ref = _asyncToGenerator(function* (savedObjectsClient, panels) {
    const docs = panels.reduce(function (acc, panel) {
      var _panel$attributes = panel.attributes;
      const kibanaSavedObjectMeta = _panel$attributes.kibanaSavedObjectMeta,
            savedSearchId = _panel$attributes.savedSearchId;


      if (kibanaSavedObjectMeta && kibanaSavedObjectMeta.searchSourceJSON && !savedSearchId) {
        let searchSource;
        try {
          searchSource = JSON.parse(kibanaSavedObjectMeta.searchSourceJSON);
        } catch (err) {
          return acc;
        }

        if (searchSource.index && !acc.find(function (s) {
          return s.id === searchSource.index;
        })) {
          acc.push({ type: 'index-pattern', id: searchSource.index });
        }
      }
      return acc;
    }, []);

    if (docs.length === 0) return [];

    var _ref2 = yield savedObjectsClient.bulkGet(docs);

    const savedObjects = _ref2.saved_objects;

    return savedObjects;
  });

  return function collectIndexPatterns(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
