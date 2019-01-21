'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiOutsideClickDetector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiOutsideClickDetector = exports.EuiOutsideClickDetector = function (_Component) {
  _inherits(EuiOutsideClickDetector, _Component);

  function EuiOutsideClickDetector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiOutsideClickDetector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiOutsideClickDetector.__proto__ || Object.getPrototypeOf(EuiOutsideClickDetector)).call.apply(_ref, [this].concat(args))), _this), _this.onClickOutside = function (event) {
      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          onOutsideClick = _this$props.onOutsideClick;


      if (isDisabled) {
        return;
      }

      if (!_this.wrapperRef) {
        return;
      }

      if (_this.wrapperRef === event.target) {
        return;
      }

      if (_this.wrapperRef.contains(event.target)) {
        return;
      }

      onOutsideClick();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiOutsideClickDetector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onClickOutside);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _extends({}, this.props.children.props, {
        ref: function ref(node) {
          _this2.wrapperRef = node;
          if (_this2.props.children.ref) {
            _this2.props.children.ref(node);
          }
        }
      });

      var child = _react.Children.only(this.props.children);
      return (0, _react.cloneElement)(child, props);
    }
  }]);

  return EuiOutsideClickDetector;
}(_react.Component);

EuiOutsideClickDetector.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onOutsideClick: _propTypes2.default.func.isRequired,
  isDisabled: _propTypes2.default.bool
};