'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let handleRequest = (() => {
  var _ref = _asyncToGenerator(function* (request) {
    const uiSettings = request.getUiSettingsService();
    return {
      settings: yield uiSettings.getUserProvided()
    };
  });

  return function handleRequest(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getRoute = exports.getRoute = {
  path: '/api/kibana/settings',
  method: 'GET',
  handler: function handler(request, reply) {
    reply(handleRequest(request));
  }
};
