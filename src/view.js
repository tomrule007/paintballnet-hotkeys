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
    // DEBUGGING: Global this access
    window.pbnView = this;
    // Place holder handle message callback
    this._handleMessageCallback = () => {};
    // Setup webSocketProxy spy
    createWebSocketProxy(
      () => {
        this._setLinkEnabled();
      },
      (msgEvent) => this._handleMessageCallback(msgEvent)
    );

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
      this._onClickSetHotkey(this.$activeEditHotkeyCard)
    );
    this.$deleteHotkeyButton.addEventListener('click', () =>
      this._deleteHotkey(this.$activeEditHotkeyCard)
    );

    // Save DOM Refs
    this.$hud = template.createHUD();
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
    this.$menuCloseButton.addEventListener('click', () => {
      this._showMenu(false);
      this._clearAndRemoveEditHotkeyCard();
    });
  }

  // EditCard functions: Read | Update

  _readEditHotkeyCardData() {
    const $editCardHotkeyDisplay = this.$hotkeyEditCard.childNodes[1];

    const hotkey = $editCardHotkeyDisplay.dataset.hotkeyCode;
    const hotkeyText = $editCardHotkeyDisplay.innerText;
    return { hotkey, hotkeyText };
  }

  _updateEditHotkeyCard(hotkey) {
    const $editCardHotkeyDisplay = this.$hotkeyEditCard.childNodes[1];

    $editCardHotkeyDisplay.dataset.hotkeyCode = hotkey;
    $editCardHotkeyDisplay.innerText = this._hotkeyCodeToText(hotkey);
  }

  // hotkeyCard functions: CREATE | READ | UPDATE | DELETE
  _createHotkeyCard({ hotkey = '', command = '' } = {}) {
    const hotkeyText = hotkey ? this._hotkeyCodeToText(hotkey) : 'Hotkey';
    const [hotkeyCard, hotkeyEl] = template.createHotkeyCard(
      hotkey,
      hotkeyText,
      command
    );
    hotkeyEl.addEventListener('click', () =>
      this._onClickHotkeyHandler(hotkeyCard)
    );

    this.$hotkeys.append(hotkeyCard);
  }

  _readHotkeyCardData(hotkeyCard) {
    const hotkey = hotkeyCard.childNodes[0].childNodes[0].innerText;
    const command = hotkeyCard.childNodes[1].value;
    return { hotkey, command };
  }

  _updateHotkeyCardData(hotkeyCard, { hotkey, command }) {
    if (hotkey) {
      // TODO: remove create new card side effect
      // (current solution to insure new blank card exists)
      if (hotkeyCard.childNodes[0].childNodes[0].innerText === 'Hotkey') {
        this._createHotkeyCard();
      }

      hotkeyCard.childNodes[0].childNodes[0].dataset.hotkeyCode = hotkey;
      hotkeyCard.childNodes[0].childNodes[0].innerText = this._hotkeyCodeToText(
        hotkey
      );
    }
    if (command) {
      hotkeyCard.childNodes[1].value = command;
    }
  }

  _deleteHotkey(hotkeyCard) {
    const { hotkey, command } = this._readHotkeyCardData(hotkeyCard);

    if (hotkey === 'Hotkey') {
      alert('You can not delete the blank hotkey card');
      return;
    }
    if (confirm(`DELETE: ${hotkey}: ${command}`)) {
      this.$activeEditHotkeyCard = null;
      hotkeyCard.remove();
    }
  }

  // Menu Functions: show/hide | enableLink
  _showMenu(setVisible) {
    this.$menu.style.display = setVisible ? 'block' : 'none';
  }

  _setLinkEnabled() {
    this.$menuLink.style.color = 'black';
  }

  // HUD functions: _createHudMessage

  _createHudMessage({ text, time = 2000 } = {}) {
    const textEl = document.createElement('h1');
    textEl.innerText = text;
    this.$hud.appendChild(textEl);
    setTimeout(() => {
      this.$hud.removeChild(textEl);
    }, time);
  }

  // Other Functions
  _hotkeyCodeToText(hotkey) {
    if (hotkey === '') return '';
    const [shiftKey, altKey, ctrlKey] = hotkey
      .slice(-3)
      .split('')
      .map((keyString) => Boolean(+keyString));

    const key = hotkey.slice(0, -3);
    // TODO: add OS specific names
    // Example: Alt == Option on macs
    return (
      (shiftKey & (key !== 'Shift') ? 'Shift+' : '') +
      (altKey & (key !== 'Alt') ? 'Alt+' : '') +
      (ctrlKey & (key !== 'Control') ? 'Ctrl+' : '') +
      key
    );
  }

  _clearAndRemoveEditHotkeyCard() {
    // Clear and remove edit card
    this._updateEditHotkeyCard('');
    this.$hotkeyEditCard.remove();
    this.$activeEditHotkeyCard &&
      (this.$activeEditHotkeyCard.style.border = '');
    this.$activeEditHotkeyCard = null;
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

  // onClick Handlers
  _onClickSetHotkey(hotkeyCard) {
    // TODO: add validation to insure no duplicate hotkeys exist.
    const { hotkey, hotkeyText } = this._readEditHotkeyCardData();
    const currentHotkeys = this._getHotkeysFromMenu();

    if (currentHotkeys[hotkey] !== undefined) {
      alert('That hotkey is already assigned');
      return;
    }
    this._updateHotkeyCardData(hotkeyCard, { hotkey, hotkeyText });

    this._clearAndRemoveEditHotkeyCard();
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
      case 'hudMessage':
        this._createHudMessage(parameterObject);
        break;
      case 'addHotkey':
        this._createHotkeyCard(parameterObject);
        break;

      default:
        throw Error(`Invalid viewCommand: ${viewCommand} `);
    }
  }

  /**
   * Registers viewEvent handlers.
   * @param {'onSaveChanges'|'onKeydown'} eventName
   * @param {function} handler
   */
  bindEvent(eventName, handler) {
    switch (eventName) {
      case 'onMouseMove':
        this._handleMouseMove = handler;
        break;
      case 'onMessage':
        this._handleMessageCallback = handler;
        break;
      case 'onSaveChanges':
        this.$menuSaveButton.addEventListener('click', () => {
          const hotkeyData = this._getHotkeysFromMenu();
          handler(hotkeyData);
        });
        break;
      case 'onKeydown':
        document.addEventListener('keydown', handler);
        break;
      default:
        throw Error(`Invalid eventName: ${eventName} `);
    }
  }
}
