'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCodeEditor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class KuiCodeEditor extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _initialiseProps.call(this), _temp;
  }

  stopEditing() {
    this.setState({
      isHintActive: true,
      isEditing: false
    });
  }

  render() {
    var _props = this.props;

    const width = _props.width,
          height = _props.height,
          onBlur = _props.onBlur,
          isReadOnly = _props.isReadOnly,
          setOptions = _props.setOptions,
          cursorStart = _props.cursorStart,
          rest = _objectWithoutProperties(_props, ['width', 'height', 'onBlur', 'isReadOnly', 'setOptions', 'cursorStart']);

    const classes = (0, _classnames2.default)('kuiCodeEditorWrapper', {
      'kuiCodeEditorWrapper-isEditing': this.state.isEditing
    });

    const promptClasses = (0, _classnames2.default)('kuiCodeEditorKeyboardHint', {
      'kuiCodeEditorKeyboardHint-isInactive': !this.state.isHintActive
    });

    let filteredCursorStart;

    const options = _extends({}, setOptions);

    if (isReadOnly) {
      // Put the cursor at the beginning of the editor, so that it doesn't look like
      // a prompt to begin typing.
      filteredCursorStart = -1;

      Object.assign(options, {
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false
      });
    } else {
      filteredCursorStart = cursorStart;
    }

    const activity = isReadOnly ? 'interacting with the code' : 'editing';

    const prompt = _react2.default.createElement(
      'div',
      {
        className: promptClasses,
        id: this.idGenerator('codeEditor'),
        ref: hint => {
          this.editorHint = hint;
        },
        tabIndex: '0',
        role: 'button',
        onClick: this.startEditing,
        onKeyDown: this.onKeyDownHint,
        'data-test-subj': 'codeEditorHint'
      },
      _react2.default.createElement(
        'p',
        { className: 'kuiText kuiVerticalRhythmSmall' },
        'Press Enter to start ',
        activity,
        '.'
      ),
      _react2.default.createElement(
        'p',
        { className: 'kuiText kuiVerticalRhythmSmall' },
        'When you\u2019re done, press Escape to stop ',
        activity,
        '.'
      )
    );

    return _react2.default.createElement(
      'div',
      {
        className: classes,
        style: { width, height }
      },
      prompt,
      _react2.default.createElement(_reactAce2.default, _extends({
        ref: this.aceEditorRef,
        width: width,
        height: height,
        onFocus: this.onFocusAce,
        onBlur: this.onBlurAce,
        setOptions: options,
        cursorStart: filteredCursorStart
      }, rest))
    );
  }
}

exports.KuiCodeEditor = KuiCodeEditor;

var _initialiseProps = function _initialiseProps() {
  this.state = {
    isHintActive: true,
    isEditing: false
  };
  this.idGenerator = (0, _services.htmlIdGenerator)();

  this.aceEditorRef = aceEditor => {
    if (aceEditor) {
      this.aceEditor = aceEditor;
      aceEditor.editor.textInput.getElement().tabIndex = -1;
      aceEditor.editor.textInput.getElement().addEventListener('keydown', this.onKeydownAce);
    }
  };

  this.onKeydownAce = ev => {
    if (ev.keyCode === _services.keyCodes.ESCAPE) {
      ev.preventDefault();
      ev.stopPropagation();
      this.stopEditing();
      this.editorHint.focus();
    }
  };

  this.onFocusAce = (...args) => {
    this.setState({
      isEditing: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  this.onBlurAce = (...args) => {
    this.stopEditing();
    if (this.props.onBlur) {
      this.props.onBlur(...args);
    }
  };

  this.onKeyDownHint = ev => {
    if (ev.keyCode === _services.keyCodes.ENTER) {
      ev.preventDefault();
      this.startEditing();
    }
  };

  this.startEditing = () => {
    this.setState({
      isHintActive: false
    });
    this.aceEditor.editor.textInput.focus();
  };
};

KuiCodeEditor.propTypes = {
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  isReadOnly: _propTypes2.default.bool,
  setOptions: _propTypes2.default.object,
  cursorStart: _propTypes2.default.number
};

KuiCodeEditor.defaultProps = {
  setOptions: {}
};
