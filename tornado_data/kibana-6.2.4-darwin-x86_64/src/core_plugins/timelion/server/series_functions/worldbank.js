'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _datasource = require('../lib/classes/datasource');

var _datasource2 = _interopRequireDefault(_datasource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _datasource2.default('worldbank', {
  args: [{
    name: 'code', // countries/all/indicators/SP.POP.TOTL
    types: ['string', 'null'],
    help: 'Worldbank API path.' + ' This is usually everything after the domain, before the querystring. Eg: ' + '/en/countries/ind;chn/indicators/DPANUSSPF.'
  }],
  aliases: ['wb'],
  help: `
    [experimental]
    Pull data from http://data.worldbank.org/ using path to series.
    The worldbank provides mostly yearly data, and often has no data for the current year.
    Try offset=-1y if you get no data for recent time ranges.`,
  fn: function worldbank(args, tlConfig) {
    // http://api.worldbank.org/en/countries/ind;chn/indicators/DPANUSSPF?date=2000:2006&MRV=5

    const config = _lodash2.default.defaults(args.byName, {
      code: 'countries/wld/indicators/SP.POP.TOTL'
    });

    const time = {
      min: (0, _moment2.default)(tlConfig.time.from).format('YYYY'),
      max: (0, _moment2.default)(tlConfig.time.to).format('YYYY')
    };

    const URL = 'http://api.worldbank.org/' + config.code + '?date=' + time.min + ':' + time.max + '&format=json' + '&per_page=1000';

    return (0, _nodeFetch2.default)(URL).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      let hasData = false;

      const respSeries = resp[1];

      const deduped = {};
      let description;
      _lodash2.default.each(respSeries, function (bucket) {
        if (bucket.value != null) hasData = true;
        description = bucket.country.value + ' ' + bucket.indicator.value;
        deduped[bucket.date] = bucket.value;
      });

      const data = _lodash2.default.compact(_lodash2.default.map(deduped, function (val, date) {
        // Discard nulls
        if (val == null) return;
        return [(0, _moment2.default)(date, 'YYYY').valueOf(), Number(val)];
      }));

      if (!hasData) throw new Error('Worldbank request succeeded, but there was no data for ' + config.code);

      return {
        type: 'seriesList',
        list: [{
          data: data,
          type: 'series',
          label: description,
          _meta: {
            worldbank_request: URL
          }
        }]
      };
    }).catch(function (e) {
      throw e;
    });
  }
});
module.exports = exports['default'];
