'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

const numericKeys = ['alpha', 'beta', 'gamma', 'period'];
const booleanKeys = ['pad'];
function castBasedOnKey(key, val) {
  if (~numericKeys.indexOf(key)) return Number(val);
  if (~booleanKeys.indexOf(key)) {
    switch (val) {
      case 'true':
      case 1:
      case '1':
        return true;
      default:
        return false;
    }
  }
  return val;
}

exports.default = settingsStr => {
  return settingsStr.split(/\s/).reduce((acc, value) => {
    var _value$split = value.split(/=/),
        _value$split2 = _slicedToArray(_value$split, 2);

    const key = _value$split2[0],
          val = _value$split2[1];

    acc[key] = castBasedOnKey(key, val);
    return acc;
  }, {});
};

module.exports = exports['default'];
