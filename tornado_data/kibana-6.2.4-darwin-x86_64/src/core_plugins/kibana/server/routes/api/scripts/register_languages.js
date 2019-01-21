'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLanguages = registerLanguages;
function registerLanguages(server) {
  server.route({
    path: '/api/kibana/scripts/languages',
    method: 'GET',
    handler: function handler(request, reply) {
      reply(['painless', 'expression']);
    }
  });
}
