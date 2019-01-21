'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSteps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _step = require('./step');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function renderSteps(steps, firstStepNumber, headingElement) {
  return steps.map(function (step, index) {
    var className = step.className,
        children = step.children,
        title = step.title,
        rest = _objectWithoutProperties(step, ['className', 'children', 'title']);

    return _react2.default.createElement(
      _step.EuiStep,
      _extends({
        className: className,
        key: index,
        headingElement: headingElement,
        step: firstStepNumber + index,
        title: title
      }, rest),
      children
    );
  });
}

var EuiSteps = function EuiSteps(_ref) {
  var className = _ref.className,
      firstStepNumber = _ref.firstStepNumber,
      headingElement = _ref.headingElement,
      steps = _ref.steps,
      rest = _objectWithoutProperties(_ref, ['className', 'firstStepNumber', 'headingElement', 'steps']);

  var classes = (0, _classnames2.default)('euiSteps', className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    renderSteps(steps, firstStepNumber, headingElement)
  );
};

exports.EuiSteps = EuiSteps;
var stepPropType = _propTypes2.default.shape({
  title: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node
});

EuiSteps.propTypes = {
  className: _propTypes2.default.string,
  firstStepNumber: _propTypes2.default.number,
  headingElement: _propTypes2.default.string,
  steps: _propTypes2.default.arrayOf(stepPropType).isRequired
};

EuiSteps.defaultProps = {
  firstStepNumber: 1,
  headingElement: 'p'
};