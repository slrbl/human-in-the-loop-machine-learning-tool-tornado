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

_nodeFetch2.default.Promise = require('bluebird');

//var parseDateMath = require('../utils/date_math.js');


exports.default = new _datasource2.default('quandl', {
  dataSource: true,
  args: [{
    name: 'code',
    types: ['string', 'null'],
    help: 'The quandl code to plot. You can find these on quandl.com.'
  }, {
    name: 'position',
    types: ['number', 'null'],
    help: 'Some quandl sources return multiple series, which one should I use? 1 based index.'
  }],
  help: `
    [experimental]
    Pull data from quandl.com using the quandl code. Set "timelion:quandl.key" to your free API key in Kibana's
    Advanced Settings. The API has a really low rate limit without a key.`,
  fn: function quandlFn(args, tlConfig) {
    const intervalMap = {
      '1d': 'daily',
      '1w': 'weekly',
      '1M': 'monthly',
      '1y': 'annual'
    };

    const config = _lodash2.default.defaults(args.byName, {
      code: 'WIKI/AAPL',
      position: 1,
      interval: intervalMap[tlConfig.time.interval],
      apikey: tlConfig.settings['timelion:quandl.key']
    });

    if (!config.interval) {
      throw new Error('quandl() unsupported interval: ' + tlConfig.time.interval + '. quandl() supports: ' + _lodash2.default.keys(intervalMap).join(', '));
    }

    const time = {
      min: _moment2.default.utc(tlConfig.time.from).format('YYYY-MM-DD'),
      max: _moment2.default.utc(tlConfig.time.to).format('YYYY-MM-DD')
    };

    // POSITIONS
    // 1. open
    // 2. high
    // 3. low
    // 4. close
    // 5. volume

    const URL = 'https://www.quandl.com/api/v1/datasets/' + config.code + '.json' + '?sort_order=asc' + '&trim_start=' + time.min + '&trim_end=' + time.max + '&collapse=' + config.interval + '&auth_token=' + config.apikey;

    return (0, _nodeFetch2.default)(URL).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      const data = _lodash2.default.map(resp.data, function (bucket) {
        return [(0, _moment2.default)(bucket[0]).valueOf(), bucket[config.position]];
      });

      return {
        type: 'seriesList',
        list: [{
          data: data,
          type: 'series',
          fit: 'nearest',
          label: resp.name
        }]
      };
    }).catch(function (e) {
      throw e;
    });
  }
});
module.exports = exports['default'];
