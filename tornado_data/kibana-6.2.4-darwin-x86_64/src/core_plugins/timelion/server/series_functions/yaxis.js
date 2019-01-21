'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tickFormatters = {
  'bits': 'bits',
  'bits/s': 'bits/s',
  'bytes': 'bytes',
  'bytes/s': 'bytes/s',
  'currency': 'currency(:ISO 4217 currency code)',
  'percent': 'percent',
  'custom': 'custom(:prefix:suffix)'
};

exports.default = new _chainable2.default('yaxis', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'yaxis',
    types: ['number', 'null'],
    help: 'The numbered y-axis to plot this series on, eg .yaxis(2) for a 2nd y-axis.'
  }, {
    name: 'min',
    types: ['number', 'null'],
    help: 'Min value'
  }, {
    name: 'max',
    types: ['number', 'null'],
    help: 'Max value'
  }, {
    name: 'position',
    types: ['string', 'null'],
    help: 'left or right'
  }, {
    name: 'label',
    types: ['string', 'null'],
    help: 'Label for axis'
  }, {
    name: 'color',
    types: ['string', 'null'],
    help: 'Color of axis label'
  }, {
    name: 'units',
    types: ['string', 'null'],
    help: `The function to use for formatting y-axis labels. One of: ${_lodash2.default.values(tickFormatters).join(', ')}`,
    suggestions: _lodash2.default.keys(tickFormatters).map(key => {
      return { name: key, help: tickFormatters[key] };
    })
  }, {
    name: 'tickDecimals',
    types: ['number', 'null'],
    help: 'tick decimal precision'
  }],
  help: 'Configures a variety of y-axis options, the most important likely being the ability to add an Nth (eg 2nd) y-axis',
  fn: function yaxisFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, yaxis, min, max, position, label, color, units, tickDecimals) {
      yaxis = yaxis || 1;

      eachSeries.yaxis = yaxis;
      eachSeries._global = eachSeries._global || {};

      eachSeries._global.yaxes = eachSeries._global.yaxes || [];
      eachSeries._global.yaxes[yaxis - 1] = eachSeries._global.yaxes[yaxis - 1] || {};

      const myAxis = eachSeries._global.yaxes[yaxis - 1];
      myAxis.position = position || (yaxis % 2 ? 'left' : 'right');
      myAxis.min = min;
      myAxis.max = max;
      myAxis.axisLabelFontSizePixels = 11;
      myAxis.axisLabel = label;
      myAxis.axisLabelColour = color;
      myAxis.axisLabelUseCanvas = true;

      if (tickDecimals) {
        myAxis.tickDecimals = tickDecimals < 0 ? 0 : tickDecimals;
      }

      if (units) {
        const unitTokens = units.split(':');
        const unitType = unitTokens[0];
        if (!tickFormatters[unitType]) {
          throw new Error(`${units} is not a supported unit type.`);
        }
        if (unitType === 'currency') {
          const threeLetterCode = /^[A-Za-z]{3}$/;
          const currency = unitTokens[1];
          if (currency && !threeLetterCode.test(currency)) {
            throw new Error('Currency must be a three letter code');
          }
        }

        myAxis.units = {
          type: unitType,
          prefix: unitTokens[1] || '',
          suffix: unitTokens[2] || ''
        };

        if (unitType === 'percent') {
          // jquery.flot uses axis.tickDecimals to generate tick values
          // need 2 extra decimal places to perserve percision when percent shifts value to left
          myAxis.units.tickDecimalsShift = 2;
          if (tickDecimals) {
            myAxis.tickDecimals += myAxis.units.tickDecimalsShift;
          } else {
            myAxis.tickDecimals = myAxis.units.tickDecimalsShift;
          }
        }
      }

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
