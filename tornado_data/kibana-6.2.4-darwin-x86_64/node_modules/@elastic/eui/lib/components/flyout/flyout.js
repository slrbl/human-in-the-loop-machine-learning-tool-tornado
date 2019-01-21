'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFlyout = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _services = require('../../services');

var _overlay_mask = require('../overlay_mask');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizeToClassNameMap = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var EuiFlyout = exports.EuiFlyout = function (_Component) {
  _inherits(EuiFlyout, _Component);

  function EuiFlyout() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiFlyout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiFlyout.__proto__ || Object.getPrototypeOf(EuiFlyout)).call.apply(_ref, [this].concat(args))), _this), _this.onKeyDown = function (event) {
      if (event.keyCode === _services.keyCodes.ESCAPE) {
        _this.props.onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiFlyout, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          children = _props.children,
          onClose = _props.onClose,
          ownFocus = _props.ownFocus,
          size = _props.size,
          rest = _objectWithoutProperties(_props, ['className', 'children', 'onClose', 'ownFocus', 'size']);

      var classes = (0, _classnames2.default)('euiFlyout', sizeToClassNameMap[size], className);

      var flyoutContent = _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(node) {
            _this2.flyout = node;
          },
          className: classes,
          tabIndex: 0,
          onKeyDown: this.onKeyDown
        }, rest),
        children
      );

      // If ownFocus is set, show an overlay behind the flyout and allow the user
      // to click it to close it.
      var optionalOverlay = void 0;
      if (ownFocus) {
        optionalOverlay = _react2.default.createElement(_overlay_mask.EuiOverlayMask, { onClick: onClose });
      }

      return _react2.default.createElement(
        'span',
        null,
        optionalOverlay,
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              fallbackFocus: function fallbackFocus() {
                return _this2.flyout;
              },
              clickOutsideDeactivates: true
            }
          },
          flyoutContent
        )
      );
    }
  }]);

  return EuiFlyout;
}(_react.Component);

EuiFlyout.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClose: _propTypes2.default.func.isRequired,
  size: _propTypes2.default.oneOf(SIZES)
};

EuiFlyout.defaultProps = {
  size: 'm'
};