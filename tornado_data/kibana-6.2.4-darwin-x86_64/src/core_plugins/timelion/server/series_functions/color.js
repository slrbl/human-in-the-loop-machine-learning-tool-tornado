'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

var _tinygradient = require('tinygradient');

var _tinygradient2 = _interopRequireDefault(_tinygradient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('color', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'color',
    types: ['string'],
    help: 'Color of series, as hex, eg #c6c6c6 is a lovely light grey. If you specify multiple colors, and have ' + 'multiple series, you will get a gradient, eg "#00B1CC:#00FF94:#FF3A39:#CC1A6F"'
  }],
  help: 'Change the color of the series',
  fn: function colorFn(args) {
    const colors = args.byName.color.split(':');
    const gradientStops = args.byName.inputSeries.list.length;
    let gradient;
    if (colors.length > 1 && gradientStops > 1) {
      // trim number of colors to avoid exception thrown by having more colors than gradient stops
      let trimmedColors = colors;
      if (colors.length > gradientStops) {
        trimmedColors = colors.slice(0, gradientStops);
      }
      gradient = (0, _tinygradient2.default)(trimmedColors).rgb(gradientStops);
    }

    let i = 0;
    return (0, _alter2.default)(args, function (eachSeries) {
      if (gradient) {
        eachSeries.color = gradient[i++].toHexString();
      } else if (colors.length === 1) {
        eachSeries.color = colors[0];
      } else {
        throw new Error('color not provided');
      }

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
