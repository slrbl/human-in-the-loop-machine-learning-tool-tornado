'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiPager = KuiPager;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pager_button_group = require('./pager_button_group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiPager(_ref) {
  let className = _ref.className,
      startNumber = _ref.startNumber,
      endNumber = _ref.endNumber,
      totalItems = _ref.totalItems,
      hasPreviousPage = _ref.hasPreviousPage,
      hasNextPage = _ref.hasNextPage,
      onNextPage = _ref.onNextPage,
      onPreviousPage = _ref.onPreviousPage,
      rest = _objectWithoutProperties(_ref, ['className', 'startNumber', 'endNumber', 'totalItems', 'hasPreviousPage', 'hasNextPage', 'onNextPage', 'onPreviousPage']);

  const classes = (0, _classnames2.default)('kuiPager', className);
  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiPagerText' },
      startNumber,
      '\u2013',
      endNumber,
      ' of ',
      totalItems
    ),
    startNumber === 1 && endNumber === totalItems ? null : _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
      hasNext: hasNextPage,
      hasPrevious: hasPreviousPage,
      onNext: onNextPage,
      onPrevious: onPreviousPage
    })
  );
}

KuiPager.propTypes = {
  startNumber: _propTypes2.default.number.isRequired,
  endNumber: _propTypes2.default.number.isRequired,
  totalItems: _propTypes2.default.number.isRequired,
  hasPreviousPage: _propTypes2.default.bool.isRequired,
  hasNextPage: _propTypes2.default.bool.isRequired,
  onNextPage: _propTypes2.default.func.isRequired,
  onPreviousPage: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};
