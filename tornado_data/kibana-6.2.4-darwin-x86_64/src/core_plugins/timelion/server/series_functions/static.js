'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _datasource = require('../lib/classes/datasource');

var _datasource2 = _interopRequireDefault(_datasource);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _datasource2.default('static', {
  aliases: ['value'],
  args: [{
    name: 'value', // _test-data.users.*.data
    types: ['number', 'string'],
    help: 'The single value to to display, you can also pass several values and I will interpolate them evenly ' + 'across your time range.'
  }, {
    name: 'label',
    types: ['string', 'null'],
    help: 'A quick way to set the label for the series. You could also use the .label() function'
  }],
  help: 'Draws a single value across the chart',
  fn: function staticFn(args, tlConfig) {

    let data;
    const target = tlConfig.getTargetSeries();
    if (typeof args.byName.value === 'string') {
      const points = args.byName.value.split(':');
      const begin = _lodash2.default.first(target)[0];
      const end = _lodash2.default.last(target)[0];
      const step = (end - begin) / (points.length - 1);
      data = _lodash2.default.map(points, function (point, i) {
        return [begin + i * step, parseFloat(point)];
      });
    } else {
      data = _lodash2.default.map(target, function (bucket) {
        return [bucket[0], args.byName.value];
      });
    }

    return _bluebird2.default.resolve({
      type: 'seriesList',
      list: [{
        data: data,
        type: 'series',
        label: args.byName.label == null ? String(args.byName.value) : args.byName.label,
        fit: args.byName.fit || 'average'
      }]
    });
  }
});
module.exports = exports['default'];
