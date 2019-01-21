'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (server) {
  server.route({
    method: 'GET',
    path: '/api/timelion/functions',
    handler: function handler(request, reply) {
      const functionArray = _lodash2.default.map(server.plugins.timelion.functions, function (val, key) {
        // TODO: This won't work on frozen objects, it should be removed when everything is converted to datasources and chainables
        return _lodash2.default.extend({}, val, { name: key });
      });
      reply(_lodash2.default.sortBy(functionArray, 'name'));
    }
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
