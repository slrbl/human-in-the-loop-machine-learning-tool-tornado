'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSuggestionsApi = registerSuggestionsApi;

var _register_value_suggestions = require('./register_value_suggestions');

function registerSuggestionsApi(server) {
  (0, _register_value_suggestions.registerValueSuggestions)(server);
}
