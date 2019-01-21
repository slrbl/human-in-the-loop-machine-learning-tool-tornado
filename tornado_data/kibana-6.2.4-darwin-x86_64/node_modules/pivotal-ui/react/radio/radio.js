/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.RadioGroup = exports.Radio = undefined;

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

var _helpers = require('../helpers');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = exports.Radio = function (_React$Component) {
  (0, _inherits3.default)(Radio, _React$Component);

  function Radio() {
    (0, _classCallCheck3.default)(this, Radio);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Radio.prototype.componentDidMount = function componentDidMount() {
    require('../../css/forms');
  };

  Radio.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        disabled = _props.disabled,
        _props$id = _props.id,
        id = _props$id === undefined ? (0, _lodash2.default)('radio') : _props$id,
        others = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'children', 'disabled', 'id']);

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('radio', className), style: style },
      _react2.default.createElement('input', (0, _extends3.default)({ type: 'radio', disabled: disabled, 'aria-disabled': disabled, id: id }, others)),
      children
    );
  };

  return Radio;
}(_react2.default.Component);

Radio.propTypes = {
  checked: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  disabled: _propTypes2.default.bool
};

var RadioGroup = exports.RadioGroup = function (_React$Component2) {
  (0, _inherits3.default)(RadioGroup, _React$Component2);

  function RadioGroup() {
    (0, _classCallCheck3.default)(this, RadioGroup);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component2.apply(this, arguments));
  }

  RadioGroup.prototype.componentDidMount = function componentDidMount() {
    require('../../css/forms');
  };

  RadioGroup.prototype.render = function render() {
    var _props2 = this.props,
        name = _props2.name,
        children = _props2.children,
        onChange = _props2.onChange,
        others = (0, _objectWithoutProperties3.default)(_props2, ['name', 'children', 'onChange']);

    children = _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, { name: name, onChange: onChange });
    });
    var props = (0, _helpers.mergeProps)(others, { className: 'radio-group' });

    return _react2.default.createElement(
      'div',
      props,
      children
    );
  };

  return RadioGroup;
}(_react2.default.Component);

RadioGroup.propTypes = {
  id: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func
};