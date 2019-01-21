'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _required_props = require('../../test/required_props');

var _popover = require('./popover');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPopover', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, _extends({
      button: _react2.default.createElement('button', null),
      closePopover: () => {}
    }, _required_props.requiredProps)));

    expect(component).toMatchSnapshot();
  });

  test('children is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(
      _popover.KuiPopover,
      {
        button: _react2.default.createElement('button', null),
        closePopover: () => {}
      },
      'Children'
    ));

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('withTitle', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          withTitle: true,
          button: _react2.default.createElement('button', null),
          closePopover: () => {}
        }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('closePopover', () => {
      it('is called when ESC key is hit', () => {
        const closePopoverHandler = _sinon2.default.stub();

        const component = (0, _enzyme.mount)(_react2.default.createElement(_popover.KuiPopover, {
          withTitle: true,
          button: _react2.default.createElement('button', null),
          closePopover: closePopoverHandler
        }));

        component.simulate('keydown', { keyCode: _services.keyCodes.ESCAPE });
        _sinon2.default.assert.calledOnce(closePopoverHandler);
      });
    });

    describe('anchorPosition', () => {
      test('defaults to center', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {}
        }));

        expect(component).toMatchSnapshot();
      });

      test('left is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {},
          anchorPosition: 'left'
        }));

        expect(component).toMatchSnapshot();
      });

      test('right is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {},
          anchorPosition: 'right'
        }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('isOpen', () => {
      test('defaults to false', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {}
        }));

        expect(component).toMatchSnapshot();
      });

      test('renders true', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {},
          isOpen: true
        }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('ownFocus', () => {
      test('defaults to false', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          isOpen: true,
          button: _react2.default.createElement('button', null),
          closePopover: () => {}
        }));

        expect(component).toMatchSnapshot();
      });

      test('renders true', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          isOpen: true,
          ownFocus: true,
          button: _react2.default.createElement('button', null),
          closePopover: () => {}
        }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('panelClassName', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {},
          panelClassName: 'test',
          isOpen: true
        }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('panelPaddingSize', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_popover.KuiPopover, {
          button: _react2.default.createElement('button', null),
          closePopover: () => {},
          panelPaddingSize: 's',
          isOpen: true
        }));

        expect(component).toMatchSnapshot();
      });
    });
  });
});
