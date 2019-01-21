'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timelion_function = require('./timelion_function');

var _timelion_function2 = _interopRequireDefault(_timelion_function);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Chainable extends _timelion_function2.default {
  constructor(name, config) {
    super(name, config);
    this.chainable = true;
    Object.freeze(this);
  }
}
exports.default = Chainable;
module.exports = exports['default'];
