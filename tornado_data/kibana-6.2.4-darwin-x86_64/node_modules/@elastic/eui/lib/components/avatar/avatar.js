'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiAvatar = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _visualization_colors = require('../../services/colors/visualization_colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sizeToClassNameMap = {
  'none': null,
  's': 'euiAvatar--s',
  'm': 'euiAvatar--m',
  'l': 'euiAvatar--l',
  'xl': 'euiAvatar--xl'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var EuiAvatar = function EuiAvatar(_ref) {
  var imageUrl = _ref.imageUrl,
      name = _ref.name,
      className = _ref.className,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, ['imageUrl', 'name', 'className', 'size']);

  var classes = (0, _classnames2.default)('euiAvatar', sizeToClassNameMap[size], className);

  var optionalInitial = void 0;
  if (name && !imageUrl) {
    optionalInitial = _react2.default.createElement(
      'span',
      { 'aria-hidden': 'true' },
      name.substring(0, 1)
    );
  }

  var assignedColor = _visualization_colors.VISUALIZATION_COLORS[Math.floor(name.length % _visualization_colors.VISUALIZATION_COLORS.length)];

  var avatarStyle = {
    backgroundImage: imageUrl ? 'url(' + imageUrl + ')' : 'none',
    backgroundColor: assignedColor
  };

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes,
      style: avatarStyle,
      'aria-label': name
    }, rest),
    optionalInitial
  );
};

exports.EuiAvatar = EuiAvatar;
EuiAvatar.propTypes = {
  className: _propTypes2.default.string,
  imageUrl: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.oneOf(SIZES)
};

EuiAvatar.defaultProps = {
  size: 'm'
};