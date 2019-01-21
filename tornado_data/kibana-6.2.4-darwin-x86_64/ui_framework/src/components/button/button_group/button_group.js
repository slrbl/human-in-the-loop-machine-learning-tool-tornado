'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiButtonGroup = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KuiButtonGroup = props => {
  const classes = (0, _classnames2.default)('kuiButtonGroup', {
    'kuiButtonGroup--united': props.isUnited
  });

  return _react2.default.createElement(
    'div',
    { className: classes, role: 'group' },
    props.children
  );
};

KuiButtonGroup.propTypes = {
  children: _propTypes2.default.node,
  isUnited: _propTypes2.default.bool
};

exports.KuiButtonGroup = KuiButtonGroup;
