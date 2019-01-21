'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiButtonIcon = exports.ICON_TYPES = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ICON_TYPES = ['create', 'delete', 'previous', 'next', 'loading', 'settings', 'menu'];

const KuiButtonIcon = props => {
  const typeToClassNameMap = {
    create: 'fa-plus',
    delete: 'fa-trash',
    previous: 'fa-chevron-left',
    next: 'fa-chevron-right',
    loading: 'fa-spinner fa-spin',
    settings: 'fa-gear',
    menu: 'fa-bars'
  };

  const iconClasses = (0, _classnames2.default)('kuiButton__icon kuiIcon', props.className, {
    [typeToClassNameMap[props.type]]: props.type
  });

  // Purely decorative icons should be hidden from screen readers. Button icons are purely
  // decorate since assisted users will want to click on the button itself, not the icon within.
  // (https://www.w3.org/WAI/GL/wiki/Using_aria-hidden%3Dtrue_on_an_icon_font_that_AT_should_ignore)
  return _react2.default.createElement('span', { 'aria-hidden': 'true', className: iconClasses });
};

KuiButtonIcon.propTypes = {
  type: _propTypes2.default.oneOf(ICON_TYPES),
  className: _propTypes2.default.string
};

exports.ICON_TYPES = ICON_TYPES;
exports.KuiButtonIcon = KuiButtonIcon;
