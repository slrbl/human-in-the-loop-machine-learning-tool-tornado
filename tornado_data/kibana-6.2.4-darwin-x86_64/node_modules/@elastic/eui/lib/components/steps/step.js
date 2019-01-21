'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiStep = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _accessibility = require('../accessibility');

var _title = require('../title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiStep = function EuiStep(_ref) {
  var className = _ref.className,
      children = _ref.children,
      headingElement = _ref.headingElement,
      step = _ref.step,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ['className', 'children', 'headingElement', 'step', 'title']);

  var classes = (0, _classnames2.default)('euiStep', className);
  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      _accessibility.EuiScreenReaderOnly,
      null,
      _react2.default.createElement(
        'span',
        null,
        'Step'
      )
    ),
    _react2.default.createElement(
      _title.EuiTitle,
      { className: 'euiStep__title', 'data-step-num': step },
      _react2.default.createElement(headingElement, null, title)
    ),
    _react2.default.createElement(
      'div',
      { className: 'euiStep__content' },
      children
    )
  );
};

exports.EuiStep = EuiStep;
EuiStep.propTypes = {
  children: _propTypes2.default.node.isRequired,
  step: _propTypes2.default.number.isRequired,
  title: _propTypes2.default.string.isRequired,
  headingElement: _propTypes2.default.string.isRequired
};

EuiStep.defaultProps = {
  headingElement: 'p'
};