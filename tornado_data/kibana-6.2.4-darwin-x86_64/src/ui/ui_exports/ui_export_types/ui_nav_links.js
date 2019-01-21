'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = exports.links = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

const links = exports.links = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('navLinkSpecs'), _reduce.flatConcatAtType);
const link = exports.link = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('navLinkSpecs'), _reduce.flatConcatAtType);
