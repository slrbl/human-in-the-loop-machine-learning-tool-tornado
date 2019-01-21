'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.isConfigVersionUpgradeable = isConfigVersionUpgradeable;

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rcVersionRegex = /^(\d+\.\d+\.\d+)\-rc(\d+)$/i;

function extractRcNumber(version) {
  const match = version.match(rcVersionRegex);
  return match ? [match[1], parseInt(match[2], 10)] : [version, Infinity];
}

function isConfigVersionUpgradeable(savedVersion, kibanaVersion) {
  if (typeof savedVersion !== 'string' || typeof kibanaVersion !== 'string' || savedVersion === kibanaVersion || /alpha|beta|snapshot/i.test(savedVersion)) {
    return false;
  }

  var _extractRcNumber = extractRcNumber(savedVersion),
      _extractRcNumber2 = _slicedToArray(_extractRcNumber, 2);

  const savedReleaseVersion = _extractRcNumber2[0],
        savedRcNumber = _extractRcNumber2[1];

  var _extractRcNumber3 = extractRcNumber(kibanaVersion),
      _extractRcNumber4 = _slicedToArray(_extractRcNumber3, 2);

  const kibanaReleaseVersion = _extractRcNumber4[0],
        kibanaRcNumber = _extractRcNumber4[1];

  // ensure that both release versions are valid, if not then abort

  if (!_semver2.default.valid(savedReleaseVersion) || !_semver2.default.valid(kibanaReleaseVersion)) {
    return false;
  }

  // ultimately if the saved config is from a previous kibana version
  // or from an earlier rc of the same version, then we can upgrade
  const savedIsLessThanKibana = _semver2.default.lt(savedReleaseVersion, kibanaReleaseVersion);
  const savedIsSameAsKibana = _semver2.default.eq(savedReleaseVersion, kibanaReleaseVersion);
  const savedRcIsLessThanKibana = savedRcNumber < kibanaRcNumber;
  return savedIsLessThanKibana || savedIsSameAsKibana && savedRcIsLessThanKibana;
}
