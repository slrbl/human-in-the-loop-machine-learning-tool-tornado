'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _load_functions = require('../load_functions.js');

var _load_functions2 = _interopRequireDefault(_load_functions);

var _timelion_function = require('./timelion_function');

var _timelion_function2 = _interopRequireDefault(_timelion_function);

var _offset_time = require('../offset_time');

var _offset_time2 = _interopRequireDefault(_offset_time);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fitFunctions = (0, _load_functions2.default)('fit_functions');


function offsetSeries(response, offset) {
  if (offset) {
    response = _lodash2.default.map(response, function (point) {
      return [(0, _offset_time2.default)(point[0], offset, true), point[1]];
    });
  }
  return response;
}

class Datasource extends _timelion_function2.default {
  constructor(name, config) {

    // Additional arguments that every dataSource take
    config.args.push({
      name: 'offset',
      types: ['string', 'null'],
      help: 'Offset the series retrieval by a date expression. Eg -1M to make events from one month ago appear as if they are happening now'
    });

    config.args.push({
      name: 'fit',
      types: ['string', 'null'],
      help: 'Algorithm to use for fitting series to the target time span and interval. Available: ' + _lodash2.default.keys(fitFunctions).join(', ')
    });

    // Wrap the original function so we can modify inputs/outputs with offset & fit
    const originalFunction = config.fn;
    config.fn = function (args, tlConfig) {
      const config = _lodash2.default.clone(tlConfig);
      if (args.byName.offset) {
        config.time = _lodash2.default.cloneDeep(tlConfig.time);
        config.time.from = (0, _offset_time2.default)(config.time.from, args.byName.offset);
        config.time.to = (0, _offset_time2.default)(config.time.to, args.byName.offset);
      }

      return Promise.resolve(originalFunction(args, config)).then(function (seriesList) {
        seriesList.list = _lodash2.default.map(seriesList.list, function (series) {
          if (series.data.length === 0) throw new Error(name + '() returned no results');
          series.data = offsetSeries(series.data, args.byName.offset);
          series.fit = args.byName.fit || series.fit || 'nearest';
          return series;
        });
        return seriesList;
      });
    };

    super(name, config);

    // You  need to call timelionFn if calling up a datasource from another datasource,
    // otherwise teh series will end up being offset twice.
    this.timelionFn = originalFunction;
    this.datasource = true;
    this.cacheKey = function (item) {
      return item.text;
    };
    Object.freeze(this);
  }

}
exports.default = Datasource;
module.exports = exports['default'];
