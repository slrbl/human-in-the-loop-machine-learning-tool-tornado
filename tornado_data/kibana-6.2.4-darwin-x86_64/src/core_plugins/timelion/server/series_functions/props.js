'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) return data;

  const regex = new RegExp(/\.?([^.\[\]]+)|\[(\d+)\]/g);
  const result = {};
  _lodash2.default.each(data, function (val, p) {
    let cur = result;
    let prop = '';
    let m;
    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  });

  return result[''] || result;
}

exports.default = new _chainable2.default('props', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'global',
    types: ['boolean', 'null'],
    help: 'Set props on the seriesList vs on each series'
  }],
  extended: {
    types: ['seriesList', 'number', 'string', 'boolean', 'null'],
    // Extended args can not currently be multivalued,
    // multi: false is not required and is shown here for demonstration purposes
    multi: false
  },
  // extended means you can pass arguments that aren't listed. They just won't be in the ordered array
  // They will be passed as args._extended:{}
  help: 'Use at your own risk, sets arbitrary properties on the series. For example .props(label=bears!)',
  fn: function firstFn(args) {
    const properties = unflatten(_lodash2.default.omit(args.byName, 'inputSeries', 'global'));

    if (args.byName.global) {
      _lodash2.default.assign(args.byName.inputSeries, properties);
      return args.byName.inputSeries;
    } else {
      return (0, _alter2.default)(args, function (eachSeries) {
        _lodash2.default.assign(eachSeries, properties);
        return eachSeries;
      });
    }
  }
});
module.exports = exports['default'];
