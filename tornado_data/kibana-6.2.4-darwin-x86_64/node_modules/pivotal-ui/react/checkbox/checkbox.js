/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.Checkbox = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = exports.Checkbox = function (_React$PureComponent) {
  (0, _inherits3.default)(Checkbox, _React$PureComponent);

  function Checkbox() {
    (0, _classCallCheck3.default)(this, Checkbox);
    return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
  }

  Checkbox.prototype.componentDidMount = function componentDidMount() {
    require('../../css/forms');
  };

  Checkbox.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        displayError = _props.displayError,
        errorMessage = _props.errorMessage,
        inputClassName = _props.inputClassName,
        label = _props.label,
        labelClassName = _props.labelClassName,
        inputProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'displayError', 'errorMessage', 'inputClassName', 'label', 'labelClassName']);
    var disabled = inputProps.disabled,
        id = inputProps.id;

    var componentClasses = (0, _classnames2.default)('form-group', className, { 'has-error': displayError });
    var labelClasses = (0, _classnames2.default)('control-label', labelClassName, { disabled: disabled });

    return _react2.default.createElement(
      'div',
      { className: componentClasses },
      _react2.default.createElement(
        'div',
        { className: 'checkbox' },
        _react2.default.createElement(
          'label',
          { className: labelClasses, htmlFor: id },
          _react2.default.createElement('input', (0, _extends3.default)({ className: inputClassName, type: 'checkbox' }, inputProps)),
          label
        ),
        displayError && _react2.default.createElement(
          'span',
          { className: 'help-block has-error' },
          errorMessage
        )
      )
    );
  };

  return Checkbox;
}(_react2.default.PureComponent);

Checkbox.propTypes = {
  displayError: _propTypes2.default.bool,
  errorMessage: _propTypes2.default.node,
  inputClassName: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  labelClassName: _propTypes2.default.string
};