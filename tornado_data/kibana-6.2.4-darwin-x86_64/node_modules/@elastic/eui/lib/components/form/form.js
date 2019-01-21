'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _call_out = require('../call_out');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiForm = function EuiForm(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isInvalid = _ref.isInvalid,
      error = _ref.error,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'isInvalid', 'error']);

  var classes = (0, _classnames2.default)('euiForm', className);

  var optionalErrors = void 0;

  if (error) {
    var errorTexts = Array.isArray(error) ? error : [error];
    optionalErrors = _react2.default.createElement(
      'ul',
      null,
      errorTexts.map(function (error) {
        return _react2.default.createElement(
          'li',
          { className: 'euiForm__error', key: error },
          error
        );
      })
    );
  }

  var optionalErrorAlert = void 0;

  if (isInvalid) {
    optionalErrorAlert = _react2.default.createElement(
      _call_out.EuiCallOut,
      {
        className: 'euiForm__errors',
        title: 'Please address the errors in your form.',
        color: 'danger'
      },
      optionalErrors
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    optionalErrorAlert,
    children
  );
};

exports.EuiForm = EuiForm;
EuiForm.propTypes = {
  isInvalid: _propTypes2.default.bool,
  error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)])
};