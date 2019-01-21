'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHealth = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _flex = require('../flex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiHealth = function EuiHealth(_ref) {
  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'color']);

  var classes = (0, _classnames2.default)('euiHealth', className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      _flex.EuiFlexGroup,
      { gutterSize: 'xs', alignItems: 'center' },
      _react2.default.createElement(
        _flex.EuiFlexItem,
        { grow: false },
        _react2.default.createElement(_icon.EuiIcon, { type: 'dot', color: color })
      ),
      _react2.default.createElement(
        _flex.EuiFlexItem,
        { grow: false },
        children
      )
    )
  );
};

exports.EuiHealth = EuiHealth;
EuiHealth.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};