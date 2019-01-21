'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

var _load_functions = require('../lib/load_functions.js');

var _load_functions2 = _interopRequireDefault(_load_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fitFunctions = (0, _load_functions2.default)('fit_functions');

exports.default = new _chainable2.default('fit', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'mode',
    types: ['string'],
    help: `The algorithm to use for fitting the series to the target. One of: ${_lodash2.default.keys(fitFunctions).join(', ')}`,
    suggestions: _lodash2.default.keys(fitFunctions).map(key => {
      return { name: key };
    })
  }],
  help: 'Fills null values using a defined fit function',
  fn: function absFn(args) {
    return (0, _alter2.default)(args, function (eachSeries, mode) {

      const noNulls = eachSeries.data.filter(item => item[1] === 0 || item[1]);

      if (noNulls.length === 0) {
        return eachSeries;
      }

      eachSeries.data = fitFunctions[mode](noNulls, eachSeries.data);
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
