'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let handleRequest = (() => {
  var _ref = _asyncToGenerator(function* (request) {
    const key = request.params.key;

    const uiSettings = request.getUiSettingsService();

    yield uiSettings.remove(key);
    return {
      settings: yield uiSettings.getUserProvided()
    };
  });

  return function handleRequest(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const deleteRoute = exports.deleteRoute = {
  path: '/api/kibana/settings/{key}',
  method: 'DELETE',
  handler(request, reply) {
    reply(handleRequest(request));
  }
};
