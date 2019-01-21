'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectDefaultVars = exports.replaceInjectedVars = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

const replaceInjectedVars = exports.replaceInjectedVars = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('injectedVarsReplacers'), _reduce.flatConcatAtType);

const injectDefaultVars = exports.injectDefaultVars = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('defaultInjectedVarProviders'), (0, _modify_reduce.mapSpec)((spec, type, pluginSpec) => ({
  pluginSpec,
  fn: spec
})), _reduce.flatConcatAtType);
