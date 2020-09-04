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
    console.log('create view');
    // Setup webSocketProxy spy
    createWebSocketProxy(() => {
      this._setLinkEnabled();
    });

    // Create and Inject UI
    this.createUI = template.createUI;
    this.createUI();

    // Create hotkey edit card and wire event listeners
    [
      this.$hotkeyEditCard,
      this.$setHotkeyButton,
      this.$deleteHotkeyButton,
    ] = template.createHotkeyEditCard();

    this.$setHotkeyButton.addEventListener('click', () =>
      this._setUpdatedHotkey(this.$activeEditHotkeyCard)
    );
    this.$deleteHotkeyButton.addEventListener('click', () =>
      this._deleteHotkey(this.$activeEditHotkeyCard)
    );

    // Save DOM Refs
    this.$activeEditHotkeyCard = null;
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
  _setUpdatedHotkey(hotkeyCard) {
    console.log('_setUpdatedHotkey', hotkeyCard);
    const newHotkey = window.hotkeySetContainer.childNodes[1].innerText;
    const newHotkeyCode =
      window.hotkeySetContainer.childNodes[1].dataset.hotkeyCode;
    if (newHotkey) {
      window.setHotkeyActive.childNodes[0].childNodes[0].innerText = newHotkey;
      window.setHotkeyActive.childNodes[0].childNodes[0].dataset.hotkeyCode = newHotkeyCode;
      window.hotkeySetContainer.remove();
      window.setHotkeyActive.style.border = '';
      window.setHotkeyActive.style.borderBottom = '';
      window.setHotkeyActive = undefined;
    }
  }
  _updateHotkeyCardData(hotkeyCard) {}
  _readHotkeyCardData(hotkeyCard) {
    const hotkey = hotkeyCard.childNodes[0].childNodes[0].innerText;
    const command = hotkeyCard.childNodes[1].value;
    return { hotkey, command };
  }
  _deleteHotkey(hotkeyCard) {
    const { hotkey, command } = this._readHotkeyCardData(hotkeyCard);

    if (confirm(`DELETE: ${hotkey}: ${command}`)) {
      this.$activeEditHotkeyCard = null;
      hotkeyCard.remove();
    }
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
  _onClickHotkeyHandler(hotkeyCard) {
    // Reset style on old activeEditHotkeyCard
    if (this.$activeEditHotkeyCard) {
      this.$activeEditHotkeyCard.style.border = '';
    }

    // Attach edit card to currently clicked card and set selected style
    hotkeyCard.append(this.$hotkeyEditCard);
    hotkeyCard.style.border = '1px solid black';

    // Update current active hotkey card
    this.$activeEditHotkeyCard = hotkeyCard;
  }
  _addHotkey({ hotkey, command }) {
    const [hotkeyCard, hotkeyEl] = template.createHotkeyCard(hotkey, command);
    hotkeyEl.addEventListener('click', () =>
      this._onClickHotkeyHandler(hotkeyCard)
    );

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
