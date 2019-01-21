'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCode = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _code_block = require('./_code_block');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiCode = function EuiCode(_ref) {
  var inline = _ref.inline,
      rest = _objectWithoutProperties(_ref, ['inline']);

  return _react2.default.createElement(_code_block.EuiCodeBlockImpl, _extends({
    inline: true
  }, rest));
};

exports.EuiCode = EuiCode;
EuiCode.propTypes = _extends({}, _code_block.EuiCodeBlockImpl.propTypes);