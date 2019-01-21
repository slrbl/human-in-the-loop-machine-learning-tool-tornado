'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknown = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

const unknown = exports.unknown = (0, _modify_reduce.wrap)(_modify_reduce.debug, (0, _modify_reduce.alias)('unknown'), _reduce.flatConcatAtType);
