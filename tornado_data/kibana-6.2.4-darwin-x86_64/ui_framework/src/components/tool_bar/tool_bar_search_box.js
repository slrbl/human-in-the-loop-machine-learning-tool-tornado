'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiToolBarSearchBox = KuiToolBarSearchBox;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiToolBarSearchBox(_ref) {
  let defaultValue = _ref.defaultValue,
      filter = _ref.filter,
      onFilter = _ref.onFilter,
      placeholder = _ref.placeholder,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['defaultValue', 'filter', 'onFilter', 'placeholder', 'className']);

  function onChange(event) {
    onFilter(event.target.value);
  }
  const classes = (0, _classnames2.default)('kuiToolBarSearch', className);
  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: 'kuiToolBarSearchBox' },
      _react2.default.createElement('div', { className: 'kuiToolBarSearchBox__icon kuiIcon fa-search' }),
      _react2.default.createElement('input', {
        defaultValue: defaultValue,
        className: 'kuiToolBarSearchBox__input',
        type: 'text',
        placeholder: placeholder,
        'aria-label': 'Filter',
        value: filter,
        onChange: onChange
      })
    )
  );
}

KuiToolBarSearchBox.propTypes = {
  defaultValue: _propTypes2.default.string,
  filter: _propTypes2.default.string,
  onFilter: _propTypes2.default.func.isRequired
};

KuiToolBarSearchBox.defaultProps = {
  placeholder: 'Search...'
};
