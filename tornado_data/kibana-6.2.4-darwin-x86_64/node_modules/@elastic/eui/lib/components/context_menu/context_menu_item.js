'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiContextMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiContextMenuItem = exports.EuiContextMenuItem = function (_Component) {
  _inherits(EuiContextMenuItem, _Component);

  function EuiContextMenuItem() {
    _classCallCheck(this, EuiContextMenuItem);

    return _possibleConstructorReturn(this, (EuiContextMenuItem.__proto__ || Object.getPrototypeOf(EuiContextMenuItem)).apply(this, arguments));
  }

  _createClass(EuiContextMenuItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          hasPanel = _props.hasPanel,
          icon = _props.icon,
          buttonRef = _props.buttonRef,
          disabled = _props.disabled,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'hasPanel', 'icon', 'buttonRef', 'disabled']);

      var iconInstance = void 0;

      if (icon) {
        switch (typeof icon === 'undefined' ? 'undefined' : _typeof(icon)) {
          case 'string':
            iconInstance = _react2.default.createElement(_icon.EuiIcon, {
              type: icon,
              size: 'm',
              className: 'euiContextMenu__icon'
            });
            break;

          default:
            // Assume it's already an instance of an icon.
            iconInstance = (0, _react.cloneElement)(icon, {
              className: 'euiContextMenu__icon'
            });
        }
      }

      var arrow = void 0;

      if (hasPanel) {
        arrow = _react2.default.createElement(_icon.EuiIcon, {
          type: 'arrowRight',
          size: 'm',
          className: 'euiContextMenu__arrow'
        });
      }

      var classes = (0, _classnames2.default)('euiContextMenuItem', className, {
        'euiContextMenuItem-isDisabled': disabled
      });

      return _react2.default.createElement(
        'button',
        _extends({
          className: classes,
          type: 'button',
          ref: buttonRef,
          disabled: disabled
        }, rest),
        _react2.default.createElement(
          'span',
          { className: 'euiContextMenu__itemLayout' },
          iconInstance,
          _react2.default.createElement(
            'span',
            { className: 'euiContextMenuItem__text' },
            children
          ),
          arrow
        )
      );
    }
  }]);

  return EuiContextMenuItem;
}(_react.Component);

EuiContextMenuItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
  onClick: _propTypes2.default.func,
  hasPanel: _propTypes2.default.bool,
  buttonRef: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
};