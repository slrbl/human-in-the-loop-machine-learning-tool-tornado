'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _worldbank = require('./worldbank.js');

var _worldbank2 = _interopRequireDefault(_worldbank);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _datasource = require('../lib/classes/datasource');

var _datasource2 = _interopRequireDefault(_datasource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _datasource2.default('worldbank_indicators', {
  args: [{
    name: 'country', // countries/all/indicators/SP.POP.TOTL
    types: ['string', 'null'],
    help: 'Worldbank country identifier. Usually the country\'s 2 letter code'
  }, {
    name: 'indicator',
    types: ['string', 'null'],
    help: 'The indicator code to use. You\'ll have to look this up on data.worldbank.org.' + ' Often pretty obtuse. Eg SP.POP.TOTL is population'
  }],
  aliases: ['wbi'],
  help: `
    [experimental]
    Pull data from http://data.worldbank.org/ using the country name and indicator. The worldbank provides
    mostly yearly data, and often has no data for the current year. Try offset=-1y if you get no data for recent
    time ranges.`,
  fn: function worldbankIndicators(args, tlConfig) {
    const config = _lodash2.default.defaults(args.byName, {
      country: 'wld',
      indicator: 'SP.POP.TOTL'
    });

    const countries = config.country.split(':');
    const seriesLists = _lodash2.default.map(countries, function (country) {
      const code = 'countries/' + country + '/indicators/' + config.indicator;
      const wbArgs = [code];
      wbArgs.byName = { code: code };
      return _worldbank2.default.timelionFn(wbArgs, tlConfig);
    });

    return _bluebird2.default.map(seriesLists, function (seriesList) {
      return seriesList.list[0];
    }).then(function (list) {
      return {
        type: 'seriesList',
        list: list
      };
    });
  }
});
module.exports = exports['default'];
