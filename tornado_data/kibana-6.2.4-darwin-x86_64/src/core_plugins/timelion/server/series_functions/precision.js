'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce = require('../lib/reduce.js');

var _reduce2 = _interopRequireDefault(_reduce);

var _alter = require('../lib/alter.js');

var _alter2 = _interopRequireDefault(_alter);

var _chainable = require('../lib/classes/chainable');

var _chainable2 = _interopRequireDefault(_chainable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _chainable2.default('precision', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'precision',
    types: ['number'],
    help: 'Number of digits to round each value to'
  }],
  help: 'number of digits to round the decimal portion of the value to',
  fn: (() => {
    var _ref = _asyncToGenerator(function* (args) {
      yield (0, _alter2.default)(args, function (eachSeries, precision) {
        eachSeries._meta = eachSeries._meta || {};
        eachSeries._meta.precision = precision;
        return eachSeries;
      });

      return (0, _reduce2.default)(args, function (a, b) {
        return parseInt(a * Math.pow(10, b), 10) / Math.pow(10, b);
      });
    });

    function precisionFn(_x) {
      return _ref.apply(this, arguments);
    }

    return precisionFn;
  })()
});
module.exports = exports['default'];
