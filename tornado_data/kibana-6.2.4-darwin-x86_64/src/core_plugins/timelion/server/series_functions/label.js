'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('label', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'label',
    types: ['string'],
    help: 'Legend value for series. You can use $1, $2, etc, in the string to match up with the regex capture groups'
  }, {
    name: 'regex',
    types: ['string', 'null'],
    help: 'A regex with capture group support'
  }],
  help: 'Change the label of the series. Use %s reference the existing label',
  fn: function labelFn(args) {
    const config = args.byName;
    return (0, _alter2.default)(args, function (eachSeries) {
      if (config.regex) {
        eachSeries.label = eachSeries.label.replace(new RegExp(config.regex), config.label);
      } else {
        eachSeries.label = config.label;
      }

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
