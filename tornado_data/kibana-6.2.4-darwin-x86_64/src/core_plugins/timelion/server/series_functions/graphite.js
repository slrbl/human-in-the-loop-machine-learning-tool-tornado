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

exports.default = new _datasource2.default('graphite', {
  args: [{
    name: 'metric', // _test-data.users.*.data
    types: ['string'],
    help: 'Graphite metric to pull, eg _test-data.users.*.data'
  }],
  help: `[experimental] Pull data from graphite. Configure your graphite server in Kibana's Advanced Settings`,
  fn: function graphite(args, tlConfig) {

    const config = args.byName;

    const time = {
      min: (0, _moment2.default)(tlConfig.time.from).format('HH:mm[_]YYYYMMDD'),
      max: (0, _moment2.default)(tlConfig.time.to).format('HH:mm[_]YYYYMMDD')
    };

    const URL = tlConfig.settings['timelion:graphite.url'] + '/render/' + '?format=json' + '&from=' + time.min + '&until=' + time.max + '&target=' + config.metric;

    return (0, _nodeFetch2.default)(URL).then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      const list = _lodash2.default.map(resp, function (series) {
        const data = _lodash2.default.map(series.datapoints, function (point) {
          return [point[1] * 1000, point[0]];
        });
        return {
          data: data,
          type: 'series',
          fit: 'nearest', // TODO make this customizable
          label: series.target
        };
      });

      return {
        type: 'seriesList',
        list: list
      };
    }).catch(function (e) {
      throw e;
    });
  }
});
module.exports = exports['default'];
