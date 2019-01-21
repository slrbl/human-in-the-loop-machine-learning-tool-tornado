'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ses;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ses(points, alpha) {
  let origin;
  let level;

  const smoothedPoints = _lodash2.default.reduce(points, (result, point, i) => {
    if (i === 0) {
      origin = point;
      level = point;
    } else {
      // In the case that point[1] is null, we keep origin the same
      // and forecast the point based on the previous smoothed point
      if (point != null) {
        origin = point;
      }
      if (origin == null) {
        level = null;
      } else {
        const prevSmoothed = result[i - 1];
        level = alpha * origin + (1 - alpha) * prevSmoothed;
      }
    }

    result.push(level);
    return result;
  }, []);

  return smoothedPoints;
} /*
    Single exponential smoothing. Assuming even interval
  */

module.exports = exports['default'];
