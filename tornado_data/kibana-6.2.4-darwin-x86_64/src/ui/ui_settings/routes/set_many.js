'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setManyRoute = undefined;

let handleRequest = (() => {
  var _ref = _asyncToGenerator(function* (request) {
    const changes = request.payload.changes;

    const uiSettings = request.getUiSettingsService();

    yield uiSettings.setMany(changes);

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

const setManyRoute = exports.setManyRoute = {
  path: '/api/kibana/settings',
  method: 'POST',
  config: {
    validate: {
      payload: _joi2.default.object().keys({
        changes: _joi2.default.object().unknown(true).required()
      }).required()
    },
    handler(request, reply) {
      reply(handleRequest(request));
    }
  }
};
