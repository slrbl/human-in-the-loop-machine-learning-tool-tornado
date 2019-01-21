'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('first', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }],
  help: 'This is an internal function that simply returns the input seriesList. Don\'t use this',
  fn: function firstFn(args) {
    return (0, _alter2.default)(args, function (eachSeries) {
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
