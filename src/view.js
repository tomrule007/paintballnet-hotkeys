import { savedHotkeys } from './model';
import { createWebSocketProxy } from './webSocketProxy';
import template from './template';
/**
 * View handle all DOM interactions
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a pbn-hotkey application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 */
export default class View {
  constructor(props) {
    // Setup webSocketProxy spy
    createWebSocketProxy((...args) => {
      ui.setLinkEnabled();
    });

    // Create and Inject UI
    this.createUI = template.createUI;
    this.createUI();

    // Save DOM Refs
    this.$injectionRoot = document.body;
    this.$menuLink = document.querySelector('#pbnHotkeysLink');
    this.$menu = document.querySelector('#pbnHotkeysMenu');
    this.$menuCloseButton = document.querySelector(
      '#pbnHotkeysMenuCloseButton'
    );
    this.$hotkeys = document.querySelector('#pbnHotkeyMenuDisplay');

    // Temporary event wiring for testing.
    this.$menuLink.addEventListener('click', () => this._showMenu(true));
    this.$menuCloseButton.addEventListener('click', () =>
      this._showMenu(false)
    );
  }

  _showMenu(setVisible) {
    this.$menu.style.display = setVisible ? 'block' : 'none';
  }
  bindOnKeydown(handler) {
    document.addEventListener('keydown', handler);
  }
  /**
   * Renders the given command with the options
   * @param {String} viewCommand
   * @param {Object} parameterObject
   */
  render(viewCommand, parameterObject) {
    switch (viewCommand) {
      case 'initilizeMenu':
        break;

      default:
        throw Error(`Invalid viewCommand: ${viewCommand} `);
        break;
    }
  }

  /**
   * Registers viewEvent handlers.
   * @param {String} eventName
   * @param {function} handler
   */
  bind(eventName, handler) {
    if (eventName === 'showMenu')
      $menuLink.addEventListener('click', () => handler());
  }
}
