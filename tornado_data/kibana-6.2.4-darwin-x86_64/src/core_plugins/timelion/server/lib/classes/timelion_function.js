'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _load_functions = require('../load_functions.js');

var _load_functions2 = _interopRequireDefault(_load_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fitFunctions = (0, _load_functions2.default)('fit_functions');

class TimelionFunction {
  constructor(name, config) {
    this.name = name;
    this.args = config.args || [];
    this.argsByName = _lodash2.default.indexBy(this.args, 'name');
    this.help = config.help || '';
    this.aliases = config.aliases || [];
    this.extended = config.extended || false;

    // WTF is this? How could you not have a fn? Wtf would the thing be used for?
    const originalFunction = config.fn || function (input) {
      return input;
    };

    // Currently only re-fits the series.
    this.originalFn = originalFunction;

    this.fn = function (args, tlConfig) {
      const config = _lodash2.default.clone(tlConfig);
      return Promise.resolve(originalFunction(args, config)).then(function (seriesList) {
        seriesList.list = _lodash2.default.map(seriesList.list, function (series) {
          const target = tlConfig.getTargetSeries();

          // Don't fit if the series are already the same
          if (_lodash2.default.isEqual(_lodash2.default.map(series.data, 0), _lodash2.default.map(target, 0))) return series;

          let fit;
          if (args.byName.fit) {
            fit = args.byName.fit;
          } else if (series.fit) {
            fit = series.fit;
          } else {
            fit = 'nearest';
          }

          series.data = fitFunctions[fit](series.data, tlConfig.getTargetSeries());
          return series;
        });
        return seriesList;
      });
    };
  }
}
exports.default = TimelionFunction;
module.exports = exports['default'];
