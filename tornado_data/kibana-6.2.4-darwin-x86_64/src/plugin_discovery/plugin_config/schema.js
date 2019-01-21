'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchema = undefined;

/**
 *  Get the config schema for a plugin spec
 *  @param  {PluginSpec} spec
 *  @return {Promise<Joi>}
 */
let getSchema = exports.getSchema = (() => {
  var _ref = _asyncToGenerator(function* (spec) {
    const provider = spec.getConfigSchemaProvider();
    return provider && (yield provider(_joi2.default)) || DEFAULT_CONFIG_SCHEMA;
  });

  return function getSchema(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.getStubSchema = getStubSchema;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const STUB_CONFIG_SCHEMA = _joi2.default.object().keys({
  enabled: _joi2.default.valid(false).default(false)
}).default();

const DEFAULT_CONFIG_SCHEMA = _joi2.default.object().keys({
  enabled: _joi2.default.boolean().default(true)
}).default();function getStubSchema() {
  return STUB_CONFIG_SCHEMA;
}
