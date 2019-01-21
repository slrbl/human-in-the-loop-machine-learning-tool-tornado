'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (server) {
  //var config = server.config();
  require('./server/routes/run.js')(server);
  require('./server/routes/functions.js')(server);
  require('./server/routes/validate_es.js')(server);

  const functions = require('./server/lib/load_functions')('series_functions');

  function addFunction(func) {
    _lodash2.default.assign(functions, (0, _process_function_definition2.default)(func));
  }

  function getFunction(name) {
    if (!functions[name]) throw new Error('No such function: ' + name);
    return functions[name];
  }

  server.plugins.timelion = {
    functions: functions,
    addFunction: addFunction,
    getFunction: getFunction
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _process_function_definition = require('./server/lib/process_function_definition');

var _process_function_definition2 = _interopRequireDefault(_process_function_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
