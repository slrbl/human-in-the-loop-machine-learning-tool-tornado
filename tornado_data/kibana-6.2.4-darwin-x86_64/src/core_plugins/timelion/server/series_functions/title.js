'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('title', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'title',
    types: ['string', 'null'],
    help: 'Title for the plot.'
  }],
  help: 'Adds a title to the top of the plot. If called on more than 1 seriesList the last call will be used.',
  fn: function hideFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, title) {
      eachSeries._title = title;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
