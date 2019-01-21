'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRoute = undefined;

let handleRequest = (() => {
  var _ref = _asyncToGenerator(function* (request) {
    const key = request.params.key;
    const value = request.payload.value;

    const uiSettings = request.getUiSettingsService();

    yield uiSettings.set(key, value);

    return {
      settings: yield uiSettings.getUserProvided()
    };
  });

  return function handleRequest(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const setRoute = exports.setRoute = {
  path: '/api/kibana/settings/{key}',
  method: 'POST',
  config: {
    validate: {
      params: _joi2.default.object().keys({
        key: _joi2.default.string().required()
      }).default(),

      payload: _joi2.default.object().keys({
        value: _joi2.default.any().required()
      }).required()
    },
    handler(request, reply) {
      reply(handleRequest(request));
    }
  }
};
