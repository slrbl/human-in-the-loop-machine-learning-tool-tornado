'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _code_editor = require('./code_editor');

var _services = require('../../services');

var _test = require('../../test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => {
    return () => 42;
  }
}));

describe('KuiCodeEditor', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_code_editor.KuiCodeEditor, _test.requiredProps));
    expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isReadOnly', () => {
      test(`renders alternate hint text`, () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_code_editor.KuiCodeEditor, { isReadOnly: true }));
        expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();
      });
    });
  });

  describe('behavior', () => {
    let component;

    beforeEach(() => {
      component = (0, _enzyme.mount)(_react2.default.createElement(_code_editor.KuiCodeEditor, null));
    });

    describe('hint element', () => {
      test('should be tabable', () => {
        const hint = (0, _test.findTestSubject)(component, 'codeEditorHint').getDOMNode();
        expect(hint).toMatchSnapshot();
      });

      test('should be disabled when the ui ace box gains focus', () => {
        const hint = (0, _test.findTestSubject)(component, 'codeEditorHint');
        hint.simulate('keyup', { keyCode: _services.keyCodes.ENTER });
        expect((0, _test.findTestSubject)(component, 'codeEditorHint').getDOMNode()).toMatchSnapshot();
      });

      test('should be enabled when the ui ace box loses focus', () => {
        const hint = (0, _test.findTestSubject)(component, 'codeEditorHint');
        hint.simulate('keyup', { keyCode: _services.keyCodes.ENTER });
        component.instance().onBlurAce();
        expect((0, _test.findTestSubject)(component, 'codeEditorHint').getDOMNode()).toMatchSnapshot();
      });
    });

    describe('interaction', () => {
      test('bluring the ace textbox should call a passed onBlur prop', () => {
        const blurSpy = _sinon2.default.spy();
        const el = (0, _enzyme.mount)(_react2.default.createElement(_code_editor.KuiCodeEditor, { onBlur: blurSpy }));
        el.instance().onBlurAce();
        expect(blurSpy.called).toBe(true);
      });

      test('pressing escape in ace textbox will enable overlay', () => {
        component.instance().onKeydownAce({
          preventDefault: () => {},
          stopPropagation: () => {},
          keyCode: _services.keyCodes.ESCAPE
        });
        const hint = (0, _test.findTestSubject)(component, 'codeEditorHint').getDOMNode();
        expect(hint).toBe(document.activeElement);
      });
    });
  });
});
