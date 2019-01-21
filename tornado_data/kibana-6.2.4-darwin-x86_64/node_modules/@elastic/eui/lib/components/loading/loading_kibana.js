'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiLoadingKibana = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sizeToClassNameMap = {
  m: 'euiLoadingKibana--medium',
  l: 'euiLoadingKibana--large',
  xl: 'euiLoadingKibana--xLarge'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var EuiLoadingKibana = function EuiLoadingKibana(_ref) {
  var children = _ref.children,
      size = _ref.size,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'size', 'className']);

  var classes = (0, _classnames2.default)('euiLoadingKibana', sizeToClassNameMap[size], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: 'euiLoadingKibana__icon' },
      _react2.default.createElement(_icon.EuiIcon, { type: 'logoKibana', size: size })
    ),
    children
  );
};

exports.EuiLoadingKibana = EuiLoadingKibana;
EuiLoadingKibana.propTypes = {
  size: _propTypes2.default.oneOf(SIZES)
};