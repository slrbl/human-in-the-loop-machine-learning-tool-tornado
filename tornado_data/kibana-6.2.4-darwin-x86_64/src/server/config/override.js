'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target, source) {
  const _target = (0, _utils.getFlattenedObject)(target);
  const _source = (0, _utils.getFlattenedObject)(source);
  return (0, _explode_by2.default)('.', _lodash2.default.defaults(_source, _target));
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _explode_by = require('./explode_by');

var _explode_by2 = _interopRequireDefault(_explode_by);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
