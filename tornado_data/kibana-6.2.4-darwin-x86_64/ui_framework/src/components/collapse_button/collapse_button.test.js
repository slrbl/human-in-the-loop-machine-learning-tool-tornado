'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _collapse_button = require('./collapse_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiCollapseButton', () => {
  describe('Props', () => {
    describe('direction', () => {
      _collapse_button.DIRECTIONS.forEach(direction => {
        describe(direction, () => {
          test(`renders the ${direction} class`, () => {
            const component = _react2.default.createElement(_collapse_button.KuiCollapseButton, _extends({ direction: direction }, _required_props.requiredProps));
            expect((0, _enzyme.render)(component)).toMatchSnapshot();
          });
        });
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = _sinon2.default.stub();

        (0, _enzyme.shallow)(_react2.default.createElement(_collapse_button.KuiCollapseButton, { direction: 'left', onClick: onClickHandler }));

        _sinon2.default.assert.notCalled(onClickHandler);
      });

      test('is called when the button is clicked', () => {
        const onClickHandler = _sinon2.default.stub();

        const $button = (0, _enzyme.shallow)(_react2.default.createElement(_collapse_button.KuiCollapseButton, { direction: 'left', onClick: onClickHandler }));

        $button.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });
    });
  });
});
