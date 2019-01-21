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

var _to_milliseconds = require('../lib/to_milliseconds.js');

var _to_milliseconds2 = _interopRequireDefault(_to_milliseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validPositions = ['left', 'right', 'center'];
const defaultPosition = 'center';

exports.default = new _chainable2.default('movingaverage', {
  args: [{
    name: 'inputSeries',
    types: ['seriesList']
  }, {
    name: 'window',
    types: ['number', 'string'],
    help: 'Number of points, or a date math expression (eg 1d, 1M) to average over. ' + 'If a date math expression is specified, the function will get as close as possible given the currently select interval' + 'If the date math expression is not evenly divisible by the interval the results may appear abnormal.'
  }, {
    name: 'position',
    types: ['string', 'null'],
    help: `Position of the averaged points relative to the result time. One of: ${validPositions.join(', ')}`,
    suggestions: validPositions.map(position => {
      const suggestion = { name: position };
      if (position === defaultPosition) {
        suggestion.help = 'default';
      }
      return suggestion;
    })
  }],
  aliases: ['mvavg'],
  help: 'Calculate the moving average over a given window. Nice for smoothing noisey series',
  fn: function movingaverageFn(args, tlConfig) {
    return (0, _alter2.default)(args, function (eachSeries, _window, _position) {

      // _window always needs to be a number, if isn't we have to make it into one.
      if (typeof _window !== 'number') {
        // Ok, I guess its a datemath expression
        const windowMilliseconds = (0, _to_milliseconds2.default)(_window);

        // calculate how many buckets that _window represents
        const intervalMilliseconds = (0, _to_milliseconds2.default)(tlConfig.time.interval);

        // Round, floor, ceil? We're going with round because it splits the difference.
        _window = Math.round(windowMilliseconds / intervalMilliseconds) || 1;
      }

      _position = _position || defaultPosition;
      if (!_lodash2.default.contains(validPositions, _position)) throw new Error('Valid positions are: ' + validPositions.join(', '));

      const pairs = eachSeries.data;
      const pairsLen = pairs.length;
      eachSeries.label = eachSeries.label + ' mvavg=' + _window;

      function toPoint(point, pairSlice) {
        const average = _lodash2.default.chain(pairSlice).map(1).reduce(function (memo, num) {
          return memo + num;
        }).value() / _window;

        return [point[0], average];
      }

      if (_position === 'center') {
        const windowLeft = Math.floor(_window / 2);
        const windowRight = _window - windowLeft;
        eachSeries.data = _lodash2.default.map(pairs, function (point, i) {
          if (i < windowLeft || i > pairsLen - windowRight) return [point[0], null];
          return toPoint(point, pairs.slice(i - windowLeft, i + windowRight));
        });
      } else if (_position === 'left') {
        eachSeries.data = _lodash2.default.map(pairs, function (point, i) {
          const cursor = i + 1;
          if (cursor < _window) return [point[0], null];
          return toPoint(point, pairs.slice(cursor - _window, cursor));
        });
      } else if (_position === 'right') {
        eachSeries.data = _lodash2.default.map(pairs, function (point, i) {
          if (i > pairsLen - _window) return [point[0], null];
          return toPoint(point, pairs.slice(i, i + _window));
        });
      }

      return eachSeries;
    });
  }
});
module.exports = exports['default'];
