'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('hide', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'hide',
    types: ['boolean', 'null'],
    help: 'Hide or unhide the series'
  }],
  help: 'Hide the series by default',
  fn: function hideFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, hide) {
      eachSeries._hide = hide == null ? true : hide;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
