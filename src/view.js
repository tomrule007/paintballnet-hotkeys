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
    createWebSocketProxy(() => {
      this._setLinkEnabled();
    });

    // Create and Inject UI
    this.createUI = template.createUI;
    this.createUI();

    // Save DOM Refs
    this.$injectionRoot = document.body;
    this.$menuLink = document.querySelector('#pbnHotkeysLink');
    this.$menu = document.querySelector('#pbnHotkeysMenu');
    this.$menuSaveButton = document.querySelector('#pbnHotkeysMenuSaveButton');
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

  _getHotkeysFromMenu() {
    const hotkeyCards = Array.from(this.$hotkeys.childNodes);
    const newHotkeysAndCommands = Object.fromEntries(
      hotkeyCards.map((hotkeyCard) => {
        const hotkey =
          hotkeyCard.childNodes[0].childNodes[0].dataset.hotkeyCode;
        const command = hotkeyCard.childNodes[1].value;

        return [hotkey, command];
      })
    );

    return newHotkeysAndCommands;
  }
  _setLinkEnabled() {
    pbnHotkeysLink.style.color = 'black';
  }
  _addHotkey({ hotkey, command }) {
    const hotkeyCard = template.createHotkeyCard(hotkey, command);
    this.$hotkeys.append(hotkeyCard);
  }
  _showMenu(setVisible) {
    this.$menu.style.display = setVisible ? 'block' : 'none';
  }
  bindOnKeydown(handler) {
    document.addEventListener('keydown', handler);
  }
  /**
   * Renders the given command with the options
   * @param {'addHotkey'} viewCommand
   * @param {Object} parameterObject
   */
  render(viewCommand, parameterObject) {
    switch (viewCommand) {
      case 'addHotkey':
        this._addHotkey(parameterObject);
        break;

      default:
        throw Error(`Invalid viewCommand: ${viewCommand} `);
        break;
    }
  }

  /**
   * Registers viewEvent handlers.
   * @param {'onSaveChanges'|'onKeydown'} eventName
   * @param {function} handler
   */
  bindEvent(eventName, handler) {
    console.log(eventName, handler);
    switch (eventName) {
      case 'onSaveChanges':
        this.$menuSaveButton.addEventListener('click', () => {
          const hotkeyData = this._getHotkeysFromMenu();
          console.log('hotkeydaya', hotkeyData);
          handler(hotkeyData);
        });
        break;
      case 'onKeydown':
        document.addEventListener('keydown', handler);
        break;
      default:
        throw Error(`Invalid eventName: ${eventName} `);
        break;
    }
  }
}
