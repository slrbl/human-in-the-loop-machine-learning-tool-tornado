'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTableRowCell = exports.ALIGNMENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const ALIGNMENT = exports.ALIGNMENT = [_services.RIGHT_ALIGNMENT, _services.LEFT_ALIGNMENT];

const KuiTableRowCell = (_ref) => {
  let children = _ref.children,
      align = _ref.align,
      className = _ref.className,
      textOnly = _ref.textOnly,
      rest = _objectWithoutProperties(_ref, ['children', 'align', 'className', 'textOnly']);

  const classes = (0, _classnames2.default)('kuiTableRowCell', className, {
    'kuiTableRowCell--alignRight': align === _services.RIGHT_ALIGNMENT,
    // We're doing this rigamarole instead of creating kuiTabelRowCell--textOnly for BWC
    // purposes for the time-being.
    'kuiTableRowCell--overflowingContent': !textOnly
  });

  return _react2.default.createElement(
    'td',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiTableRowCell__liner' },
      children
    )
  );
};

exports.KuiTableRowCell = KuiTableRowCell;
KuiTableRowCell.propTypes = {
  align: _propTypes2.default.oneOf(ALIGNMENT),
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  textOnly: _propTypes2.default.bool
};

KuiTableRowCell.defaultProps = {
  align: _services.LEFT_ALIGNMENT,
  textOnly: true
};
