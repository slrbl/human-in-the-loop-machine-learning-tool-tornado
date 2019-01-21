'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unset = unset;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _toPath = require('lodash/internal/toPath');

var _toPath2 = _interopRequireDefault(_toPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unset(object, rawPath) {
  if (!object) return;
  const path = (0, _toPath2.default)(rawPath);

  switch (path.length) {
    case 0:
      return;

    case 1:
      delete object[rawPath];
      break;

    default:
      const leaf = path.pop();
      const parentPath = path.slice();
      const parent = _lodash2.default.get(object, parentPath);
      unset(parent, leaf);
      if (!_lodash2.default.size(parent)) {
        unset(object, parentPath);
      }
      break;
  }
}
