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

var _arg_type = require('../handlers/lib/arg_type.js');

var _arg_type2 = _interopRequireDefault(_arg_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _chainable2.default('condition', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'operator', // <, <=, >, >=, ==, !=
    types: ['string'],
    help: 'comparision operator to use for comparison, valid operators are eq (equal), ne (not equal), lt (less than), lte ' + '(less than equal), gt (greater than), gte (greater than equal)',
    suggestions: [{
      name: 'eq',
      help: 'equal'
    }, {
      name: 'ne',
      help: 'not equal'
    }, {
      name: 'lt',
      help: 'less than'
    }, {
      name: 'lte',
      help: 'less than equal'
    }, {
      name: 'gt',
      help: 'greater than'
    }, {
      name: 'gte',
      help: 'greater than equal'
    }]
  }, {
    name: 'if',
    types: ['number', 'seriesList', 'null'],
    help: 'The value to which the point will be compared. If you pass a seriesList here the first series will be used'
  }, {
    name: 'then',
    types: ['number', 'seriesList', 'null'],
    help: 'The value the point will be set to if the comparison is true. If you pass a seriesList here the first series will be used'
  }, {
    name: 'else',
    types: ['number', 'seriesList', 'null'],
    help: 'The value the point will be set to if the comparison is false. If you pass a seriesList here the first series will be used'
  }],
  help: 'Compares each point to a number, or the same point in another series using an operator, then sets its value' + 'to the result if the condition proves true, with an optional else.',
  aliases: ['if'],
  fn: function conditionFn(args) {
    const config = args.byName;
    return (0, _alter2.default)(args, function (eachSeries) {
      const data = _lodash2.default.map(eachSeries.data, function (point, i) {
        function getNumber(source) {
          if ((0, _arg_type2.default)(source) === 'number') return source;
          if ((0, _arg_type2.default)(source) === 'null') return null;
          if ((0, _arg_type2.default)(source) === 'seriesList') return source.list[0].data[i][1];
          throw new Error('must be a number or a seriesList');
        }

        const ifVal = getNumber(config.if);
        const thenVal = getNumber(config.then);
        const elseVal = _lodash2.default.isUndefined(config.else) ? point[1] : getNumber(config.else);

        const newValue = function () {
          switch (config.operator) {
            case 'lt':
              return point[1] < ifVal ? thenVal : elseVal;
            case 'lte':
              return point[1] <= ifVal ? thenVal : elseVal;
            case 'gt':
              return point[1] > ifVal ? thenVal : elseVal;
            case 'gte':
              return point[1] >= ifVal ? thenVal : elseVal;
            case 'eq':
              return point[1] === ifVal ? thenVal : elseVal;
            case 'ne':
              return point[1] !== ifVal ? thenVal : elseVal;
            default:
              throw new Error('Unknown operator');
          }
        }();

        return [point[0], newValue];
      });
      eachSeries.data = data;
      return eachSeries;
    });
  }
});
module.exports = exports['default'];
