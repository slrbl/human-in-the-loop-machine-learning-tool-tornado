'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const functions = {
  avg: require('./avg'),
  cardinality: require('./cardinality'),
  min: require('./min'),
  max: require('./max'),
  last: require('./last'),
  first: require('./first'),
  sum: require('./sum')
};

exports.default = new _chainable2.default('aggregate', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'function',
    types: ['string'],
    help: 'One of ' + _lodash2.default.keys(functions).join(', ')
  }],
  help: 'Creates a static line based on result of processing all points in the series.' + ' Available functions: ' + _lodash2.default.keys(functions).join(', '),
  fn: function aggregateFn(args) {
    const fn = functions[args.byName.function];
    if (!fn) throw new Error('.aggregate() function must be one of: ' + _lodash2.default.keys(functions).join(', '));

    return (0, _alter2.default)(args, function (eachSeries) {
      const times = _lodash2.default.map(eachSeries.data, 0);
      const values = _lodash2.default.map(eachSeries.data, 1);

      eachSeries.data = _lodash2.default.zip(times, _lodash2.default.fill(values, fn(values)));
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
