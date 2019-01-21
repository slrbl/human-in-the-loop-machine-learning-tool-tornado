'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSelect = exports.SELECT_SIZE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const sizeToClassNameMap = {
  small: 'kuiSelect--small',
  medium: undefined,
  large: 'kuiSelect--large'
};

const SELECT_SIZE = exports.SELECT_SIZE = Object.keys(sizeToClassNameMap);

const KuiSelect = (_ref) => {
  let className = _ref.className,
      onChange = _ref.onChange,
      isInvalid = _ref.isInvalid,
      isDisabled = _ref.isDisabled,
      size = _ref.size,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['className', 'onChange', 'isInvalid', 'isDisabled', 'size', 'children']);

  const classes = (0, _classnames2.default)('kuiSelect', className, {
    'kuiSelect-isInvalid': isInvalid
  }, sizeToClassNameMap[size]);

  return _react2.default.createElement(
    'select',
    _extends({
      className: classes,
      onChange: onChange,
      disabled: isDisabled
    }, rest),
    children
  );
};

exports.KuiSelect = KuiSelect;
KuiSelect.defaultProps = {
  isInvalid: false,
  isDisabled: false,
  size: 'medium'
};

KuiSelect.propTypes = {
  className: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  isInvalid: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(SELECT_SIZE),
  children: _propTypes2.default.node
};
