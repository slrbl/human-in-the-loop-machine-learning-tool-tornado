'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _button = require('./button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiSubmitButton', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiSubmitButton, null));

      expect($button).toMatchSnapshot();
    });

    test('HTML attributes are rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiSubmitButton, {
        'aria-label': 'aria label',
        className: 'testClass1 testClass2',
        'data-test-subj': 'test subject string',
        disabled: true
      }));

      expect($button).toMatchSnapshot();
    });
  });

  describe('Props', () => {
    describe('buttonType', () => {
      _button.BUTTON_TYPES.forEach(buttonType => {
        describe(buttonType, () => {
          test(`renders the ${buttonType} class`, () => {
            const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiSubmitButton, { buttonType: buttonType }));
            expect($button).toMatchSnapshot();
          });
        });
      });
    });

    describe('children', () => {
      test('is rendered as value', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiSubmitButton,
          null,
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = _sinon2.default.stub();

        (0, _enzyme.shallow)(_react2.default.createElement(_button.KuiSubmitButton, { onClick: onClickHandler }));

        _sinon2.default.assert.notCalled(onClickHandler);
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = _sinon2.default.stub();

        const $button = (0, _enzyme.shallow)(_react2.default.createElement(_button.KuiSubmitButton, { onClick: onClickHandler }));

        $button.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });
    });
  });
});
