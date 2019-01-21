'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keysToSnakeCaseShallow = keysToSnakeCaseShallow;
exports.keysToCamelCaseShallow = keysToCamelCaseShallow;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keysToSnakeCaseShallow(object) {
  return _lodash2.default.mapKeys(object, (value, key) => {
    return _lodash2.default.snakeCase(key);
  });
}

function keysToCamelCaseShallow(object) {
  return _lodash2.default.mapKeys(object, (value, key) => {
    return _lodash2.default.camelCase(key);
  });
}
