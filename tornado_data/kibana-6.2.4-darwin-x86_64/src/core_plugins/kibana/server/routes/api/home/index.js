'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeApi = homeApi;

var _register_tutorials = require('./register_tutorials');

function homeApi(server) {
  (0, _register_tutorials.registerTutorials)(server);
}
