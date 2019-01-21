'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableRowCell = undefined;

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

var ALIGNMENT = [_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT];

var EuiTableRowCell = function EuiTableRowCell(_ref) {
  var align = _ref.align,
      children = _ref.children,
      className = _ref.className,
      truncateText = _ref.truncateText,
      textOnly = _ref.textOnly,
      rest = _objectWithoutProperties(_ref, ['align', 'children', 'className', 'truncateText', 'textOnly']);

  var contentClasses = (0, _classnames2.default)('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === _services.RIGHT_ALIGNMENT,
    'euiTableCellContent--truncateText': truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': !textOnly
  });

  return _react2.default.createElement(
    'td',
    { className: 'euiTableRowCell' },
    _react2.default.createElement(
      'div',
      _extends({ className: contentClasses }, rest),
      textOnly === true ? _react2.default.createElement(
        'span',
        { className: 'euiTableCellContent__text' },
        children
      ) : children
    )
  );
};

exports.EuiTableRowCell = EuiTableRowCell;
EuiTableRowCell.propTypes = {
  align: _propTypes2.default.oneOf(ALIGNMENT),
  truncateText: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  textOnly: _propTypes2.default.bool
};

EuiTableRowCell.defaultProps = {
  align: _services.LEFT_ALIGNMENT,
  textOnly: true
};