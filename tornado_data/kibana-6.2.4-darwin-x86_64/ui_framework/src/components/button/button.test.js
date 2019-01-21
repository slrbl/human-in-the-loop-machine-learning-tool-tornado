'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _button = require('./button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiButton', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, { 'aria-label': 'aria label' }));

      expect($button).toMatchSnapshot();
    });

    test('HTML attributes are rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, {
        'aria-label': 'aria label',
        className: 'testClass1 testClass2',
        'data-test-subj': 'test subject string',
        type: 'submit',
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
            const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, {
              buttonType: buttonType,
              'aria-label': 'aria label'
            }));
            expect($button).toMatchSnapshot();
          });
        });
      });
    });

    describe('icon', () => {
      test('is rendered with children', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiButton,
          { icon: 'Icon' },
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });

      test('is rendered without children', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, {
          icon: 'Icon',
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });
    });

    describe('iconPosition', () => {
      test('moves the icon to the right', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiButton,
          {
            icon: 'Icon',
            iconPosition: 'right'
          },
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiButton,
          null,
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = _sinon2.default.stub();

        (0, _enzyme.shallow)(_react2.default.createElement(_button.KuiButton, {
          onClick: onClickHandler,
          'aria-label': 'aria label'
        }));

        _sinon2.default.assert.notCalled(onClickHandler);
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = _sinon2.default.stub();

        const $button = (0, _enzyme.shallow)(_react2.default.createElement(_button.KuiButton, {
          onClick: onClickHandler,
          'aria-label': 'aria label'
        }));

        $button.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });
    });

    describe('isLoading', () => {
      test('renders a spinner', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, {
          isLoading: true,
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });

      test(`doesn't render the icon prop`, () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiButton, {
          isLoading: true,
          icon: 'Icon',
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });
    });
  });
});
