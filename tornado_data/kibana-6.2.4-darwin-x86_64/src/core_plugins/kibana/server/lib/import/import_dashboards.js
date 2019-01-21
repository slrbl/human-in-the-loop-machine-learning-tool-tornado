'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importDashboards = undefined;

let importDashboards = exports.importDashboards = (() => {
  var _ref = _asyncToGenerator(function* (req) {
    const payload = req.payload;

    const overwrite = 'force' in req.query && req.query.force !== false;
    const exclude = (0, _lodash.flatten)([req.query.exclude]);

    const savedObjectsClient = req.getSavedObjectsClient();

    const docs = payload.objects.filter(function (item) {
      return !exclude.includes(item.type);
    });

    const objects = yield savedObjectsClient.bulkCreate(docs, { overwrite });
    return { objects };
  });

  return function importDashboards(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
