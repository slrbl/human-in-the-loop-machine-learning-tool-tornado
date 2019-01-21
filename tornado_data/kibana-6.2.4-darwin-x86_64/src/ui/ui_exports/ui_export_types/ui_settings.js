'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiSettingDefaults = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

const uiSettingDefaults = exports.uiSettingDefaults = (0, _modify_reduce.wrap)((0, _modify_reduce.uniqueKeys)(), _reduce.mergeAtType);
