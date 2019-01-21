'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFields = undefined;

let getFields = exports.getFields = (() => {
  var _ref = _asyncToGenerator(function* (req) {
    const indexPatternsService = req.pre.indexPatternsService;

    const index = req.query.index || '*';
    const resp = yield indexPatternsService.getFieldsForWildcard({ pattern: index });
    const fields = resp.filter(function (field) {
      return field.aggregatable;
    });
    return (0, _lodash.uniq)(fields, function (field) {
      return field.name;
    });
  });

  return function getFields(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _lodash = require('lodash');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
