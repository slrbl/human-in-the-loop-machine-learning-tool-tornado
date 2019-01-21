'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenuItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class KuiContextMenuItem extends _react.Component {

  render() {
    var _props = this.props;

    const children = _props.children,
          className = _props.className,
          hasPanel = _props.hasPanel,
          icon = _props.icon,
          buttonRef = _props.buttonRef,
          disabled = _props.disabled,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'hasPanel', 'icon', 'buttonRef', 'disabled']);

    let iconInstance;

    if (icon) {
      iconInstance = (0, _react.cloneElement)(icon, {
        className: (0, _classnames2.default)(icon.props.className, 'kuiContextMenu__icon')
      });
    }

    let arrow;

    if (hasPanel) {
      arrow = _react2.default.createElement('span', { className: 'kuiContextMenu__arrow kuiIcon fa-angle-right' });
    }

    const classes = (0, _classnames2.default)('kuiContextMenuItem', className, {
      'kuiContextMenuItem-disabled': disabled
    });

    return _react2.default.createElement(
      'button',
      _extends({
        className: classes,
        ref: buttonRef,
        disabled: disabled
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'kuiContextMenu__itemLayout' },
        iconInstance,
        _react2.default.createElement(
          'span',
          { className: 'kuiContextMenuItem__text' },
          children
        ),
        arrow
      )
    );
  }
}
exports.KuiContextMenuItem = KuiContextMenuItem;
KuiContextMenuItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  icon: _propTypes2.default.element,
  onClick: _propTypes2.default.func,
  hasPanel: _propTypes2.default.bool,
  buttonRef: _propTypes2.default.func,
  disabled: _propTypes2.default.bool
};
