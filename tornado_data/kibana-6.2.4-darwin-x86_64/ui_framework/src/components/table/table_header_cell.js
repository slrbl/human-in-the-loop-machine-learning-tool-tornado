'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiTableHeaderCell = undefined;

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

const KuiTableHeaderCell = (_ref) => {
  let children = _ref.children,
      onSort = _ref.onSort,
      isSorted = _ref.isSorted,
      isSortAscending = _ref.isSortAscending,
      className = _ref.className,
      ariaLabel = _ref.ariaLabel,
      align = _ref.align,
      scope = _ref.scope,
      rest = _objectWithoutProperties(_ref, ['children', 'onSort', 'isSorted', 'isSortAscending', 'className', 'ariaLabel', 'align', 'scope']);

  const classes = (0, _classnames2.default)('kuiTableHeaderCell', className, {
    'kuiTableHeaderCell--alignRight': align === _services.RIGHT_ALIGNMENT
  });
  if (onSort) {
    const sortIconClasses = (0, _classnames2.default)('kuiTableSortIcon kuiIcon', {
      'fa-long-arrow-up': isSortAscending,
      'fa-long-arrow-down': !isSortAscending
    });

    const sortIcon = _react2.default.createElement('span', { className: sortIconClasses, 'aria-hidden': 'true' });

    const buttonClasses = (0, _classnames2.default)('kuiTableHeaderCellButton', {
      'kuiTableHeaderCellButton-isSorted': isSorted
    });

    const columnTitle = ariaLabel ? ariaLabel : children;
    const statefulAriaLabel = `Sort ${columnTitle} ${isSortAscending ? 'descending' : 'ascending'}`;

    return _react2.default.createElement(
      'th',
      _extends({
        className: classes,
        scope: scope
      }, rest),
      _react2.default.createElement(
        'button',
        {
          className: buttonClasses,
          onClick: onSort,
          'aria-label': statefulAriaLabel
        },
        _react2.default.createElement(
          'span',
          { className: 'kuiTableHeaderCell__liner' },
          children,
          sortIcon
        )
      )
    );
  }

  return _react2.default.createElement(
    'th',
    _extends({
      className: classes,
      'aria-label': ariaLabel,
      scope: scope
    }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiTableHeaderCell__liner' },
      children
    )
  );
};

exports.KuiTableHeaderCell = KuiTableHeaderCell;
KuiTableHeaderCell.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onSort: _propTypes2.default.func,
  isSorted: _propTypes2.default.bool,
  isSortAscending: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf([_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT]),
  scope: _propTypes2.default.oneOf(['col', 'row', 'colgroup', 'rowgroup'])
};

KuiTableHeaderCell.defaultProps = {
  align: _services.LEFT_ALIGNMENT,
  scope: 'col'
};
