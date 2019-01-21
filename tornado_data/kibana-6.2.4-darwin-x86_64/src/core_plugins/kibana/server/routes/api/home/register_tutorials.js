'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTutorials = registerTutorials;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function registerTutorials(server) {
  server.route({
    path: '/api/kibana/home/tutorials',
    method: ['GET'],
    handler: (() => {
      var _ref = _asyncToGenerator(function* (req, reply) {
        reply(server.getTutorials());
      });

      function handler(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return handler;
    })()
  });
}
