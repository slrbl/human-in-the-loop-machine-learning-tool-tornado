'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectDashboards = undefined;

let collectDashboards = exports.collectDashboards = (() => {
  var _ref = _asyncToGenerator(function* (savedObjectsClient, ids) {

    if (ids.length === 0) return [];

    const objects = ids.map(function (id) {
      return {
        type: 'dashboard',
        id: id
      };
    });

    var _ref2 = yield savedObjectsClient.bulkGet(objects);

    const savedObjects = _ref2.saved_objects;

    const results = yield Promise.all(savedObjects.map(function (d) {
      return (0, _collect_panels.collectPanels)(savedObjectsClient, d);
    }));

    return results.reduce(function (acc, result) {
      return acc.concat(result);
    }, []).reduce(function (acc, obj) {
      if (!acc.find(function (o) {
        return o.id === obj.id;
      })) acc.push(obj);
      return acc;
    }, []);
  });

  return function collectDashboards(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _collect_panels = require('./collect_panels');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
