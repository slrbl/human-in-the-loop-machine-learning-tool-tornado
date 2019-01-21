'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _test = require('../../test');

var _context_menu_panel = require('./context_menu_panel');

var _context_menu_item = require('./context_menu_item');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const items = [_react2.default.createElement(
  _context_menu_item.KuiContextMenuItem,
  {
    key: 'A',
    'data-test-subj': 'itemA'
  },
  'Option A'
), _react2.default.createElement(
  _context_menu_item.KuiContextMenuItem,
  {
    key: 'B',
    'data-test-subj': 'itemB'
  },
  'Option B'
), _react2.default.createElement(
  _context_menu_item.KuiContextMenuItem,
  {
    key: 'C',
    'data-test-subj': 'itemC'
  },
  'Option C'
)];

describe('KuiContextMenuPanel', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(
      _context_menu_panel.KuiContextMenuPanel,
      _test.requiredProps,
      'Hello'
    ));

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { title: 'Title' }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('renders a button as a title', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { title: 'Title', onClose: () => {} }));

        expect(component).toMatchSnapshot();
      });

      test(`isn't called upon instantiation`, () => {
        const onCloseHandler = _sinon2.default.stub();

        (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { title: 'Title', onClose: onCloseHandler }));

        _sinon2.default.assert.notCalled(onCloseHandler);
      });

      test('is called when the title is clicked', () => {
        const onCloseHandler = _sinon2.default.stub();

        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { title: 'Title', onClose: onCloseHandler }));

        component.find('button').simulate('click');

        _sinon2.default.assert.calledOnce(onCloseHandler);
      });
    });

    describe('onHeightChange', () => {
      it('is called with a height value', () => {
        const onHeightChange = _sinon2.default.stub();

        (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { onHeightChange: onHeightChange }));

        _sinon2.default.assert.calledWith(onHeightChange, 0);
      });
    });

    describe('transitionDirection', () => {
      describe('next', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { transitionDirection: 'next', transitionType: 'in' }));

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { transitionDirection: 'next', transitionType: 'out' }));

              expect(component).toMatchSnapshot();
            });
          });
        });
      });

      describe('previous', () => {
        describe('with transitionType', () => {
          describe('in', () => {
            test('is rendered', () => {
              const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { transitionDirection: 'previous', transitionType: 'in' }));

              expect(component).toMatchSnapshot();
            });
          });

          describe('out', () => {
            test('is rendered', () => {
              const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, { transitionDirection: 'previous', transitionType: 'out' }));

              expect(component).toMatchSnapshot();
            });
          });
        });
      });
    });

    describe('initialFocusedItemIndex', () => {
      it('sets focus on the item occupying that index', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
          items: items,
          initialFocusedItemIndex: 1
        }));

        expect((0, _test.findTestSubject)(component, 'itemB').getDOMNode()).toBe(document.activeElement);
      });
    });

    describe('onUseKeyboardToNavigate', () => {
      it('is called when up arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
          items: items,
          onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
        }));

        component.simulate('keydown', { keyCode: _services.keyCodes.UP });
        _sinon2.default.assert.calledOnce(onUseKeyboardToNavigateHandler);
      });

      it('is called when down arrow is pressed', () => {
        const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
          items: items,
          onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
        }));

        component.simulate('keydown', { keyCode: _services.keyCodes.UP });
        _sinon2.default.assert.calledOnce(onUseKeyboardToNavigateHandler);
      });

      describe('left arrow', () => {
        it('calls handler if showPreviousPanel exists', () => {
          const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

          const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
            items: items,
            showPreviousPanel: () => {},
            onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
          }));

          component.simulate('keydown', { keyCode: _services.keyCodes.LEFT });
          _sinon2.default.assert.calledOnce(onUseKeyboardToNavigateHandler);
        });

        it(`doesn't call handler if showPreviousPanel doesn't exist`, () => {
          const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

          const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
            items: items,
            onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
          }));

          component.simulate('keydown', { keyCode: _services.keyCodes.LEFT });
          _sinon2.default.assert.notCalled(onUseKeyboardToNavigateHandler);
        });
      });

      describe('right arrow', () => {
        it('calls handler if showNextPanel exists', () => {
          const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

          const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
            items: items,
            showNextPanel: () => {},
            onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
          }));

          component.simulate('keydown', { keyCode: _services.keyCodes.RIGHT });
          _sinon2.default.assert.calledOnce(onUseKeyboardToNavigateHandler);
        });

        it(`doesn't call handler if showNextPanel doesn't exist`, () => {
          const onUseKeyboardToNavigateHandler = _sinon2.default.stub();

          const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
            items: items,
            onUseKeyboardToNavigate: onUseKeyboardToNavigateHandler
          }));

          component.simulate('keydown', { keyCode: _services.keyCodes.RIGHT });
          _sinon2.default.assert.notCalled(onUseKeyboardToNavigateHandler);
        });
      });
    });
  });

  describe('behavior', () => {
    describe('focus', () => {
      it('is set on the first focusable element by default if there are no items and hasFocus is true', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(
          _context_menu_panel.KuiContextMenuPanel,
          null,
          _react2.default.createElement('button', { 'data-test-subj': 'button' })
        ));

        expect((0, _test.findTestSubject)(component, 'button').getDOMNode()).toBe(document.activeElement);
      });

      it('is not set on anything if hasFocus is false', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(
          _context_menu_panel.KuiContextMenuPanel,
          { hasFocus: false },
          _react2.default.createElement('button', { 'data-test-subj': 'button' })
        ));

        expect((0, _test.findTestSubject)(component, 'button').getDOMNode()).not.toBe(document.activeElement);
      });
    });

    describe('keyboard navigation of items', () => {
      let component;
      let showNextPanelHandler;
      let showPreviousPanelHandler;

      beforeEach(() => {
        showNextPanelHandler = _sinon2.default.stub();
        showPreviousPanelHandler = _sinon2.default.stub();

        component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_panel.KuiContextMenuPanel, {
          items: items,
          showNextPanel: showNextPanelHandler,
          showPreviousPanel: showPreviousPanelHandler
        }));
      });

      it(`focuses the panel by default`, () => {
        expect(component.getDOMNode()).toBe(document.activeElement);
      });

      it('down arrow key focuses the first menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });

        expect((0, _test.findTestSubject)(component, 'itemA').getDOMNode()).toBe(document.activeElement);
      });

      it('subsequently, down arrow key focuses the next menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });

        expect((0, _test.findTestSubject)(component, 'itemB').getDOMNode()).toBe(document.activeElement);
      });

      it('down arrow key wraps to first menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.UP });
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });

        expect((0, _test.findTestSubject)(component, 'itemA').getDOMNode()).toBe(document.activeElement);
      });

      it('up arrow key focuses the last menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.UP });

        expect((0, _test.findTestSubject)(component, 'itemC').getDOMNode()).toBe(document.activeElement);
      });

      it('subsequently, up arrow key focuses the previous menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.UP });
        component.simulate('keydown', { keyCode: _services.keyCodes.UP });

        expect((0, _test.findTestSubject)(component, 'itemB').getDOMNode()).toBe(document.activeElement);
      });

      it('up arrow key wraps to last menu item', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });
        component.simulate('keydown', { keyCode: _services.keyCodes.UP });

        expect((0, _test.findTestSubject)(component, 'itemC').getDOMNode()).toBe(document.activeElement);
      });

      it(`right arrow key shows next panel with focused item's index`, () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.DOWN });
        component.simulate('keydown', { keyCode: _services.keyCodes.RIGHT });
        _sinon2.default.assert.calledWith(showNextPanelHandler, 0);
      });

      it('left arrow key shows previous panel', () => {
        component.simulate('keydown', { keyCode: _services.keyCodes.LEFT });
        _sinon2.default.assert.calledOnce(showPreviousPanelHandler);
      });
    });
  });
});
