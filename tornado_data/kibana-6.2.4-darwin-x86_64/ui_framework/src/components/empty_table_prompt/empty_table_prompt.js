'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiEmptyTablePrompt = KuiEmptyTablePrompt;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _empty_table_prompt_message = require('./empty_table_prompt_message');

var _empty_table_prompt_actions = require('./empty_table_prompt_actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiEmptyTablePrompt(_ref) {
  let actions = _ref.actions,
      message = _ref.message,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['actions', 'message', 'className']);

  const classes = (0, _classnames2.default)('kuiEmptyTablePrompt', className);
  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      _empty_table_prompt_message.KuiEmptyTablePromptMessage,
      null,
      message
    ),
    _react2.default.createElement(
      _empty_table_prompt_actions.KuiEmptyTablePromptActions,
      null,
      actions
    )
  );
}

KuiEmptyTablePrompt.propTypes = {
  message: _propTypes2.default.string.isRequired,
  actions: _propTypes2.default.node,
  className: _propTypes2.default.string
};
