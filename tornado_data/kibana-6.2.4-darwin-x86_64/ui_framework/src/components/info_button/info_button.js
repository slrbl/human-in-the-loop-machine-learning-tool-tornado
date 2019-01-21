'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiInfoButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KuiInfoButton = props => {
  const iconClasses = (0, _classnames2.default)('kuiInfoButton', props.className);

  return _react2.default.createElement(
    'button',
    _extends({ className: iconClasses }, props),
    _react2.default.createElement('span', { className: 'kuiIcon fa-info-circle' })
  );
};

KuiInfoButton.propTypes = {
  'aria-label': _propTypes2.default.string,
  className: _propTypes2.default.string
};

KuiInfoButton.defaultProps = {
  'aria-label': 'Info'
};

exports.KuiInfoButton = KuiInfoButton;
