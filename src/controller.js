export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // bind event listeners
    view.bindEvent('onKeydown', (e) => this.handleKeydown(e));
    view.bindEvent('onSaveChanges', (hotkeyData) => {
      this.model.setHotkeys(hotkeyData);
    });
    view.bindEvent('onMessage', (e) => this.handleMessage(e));
    // Populate menu with saved hotkeys.
    Object.entries(model.hotkeys).forEach(([hotkey, command]) => {
      view.render('addHotkey', { hotkey, command });
    });
    // Add one blank hotkeyCard
    view.render('addHotkey');

    this.view.render('hudMessage', { text: 'PBN-Mod v1.0.0' });

    // TEMP Model data
    this.taggedMessagePreds = [
      {
        name: 'gameName',
        matchPhrase: 'GAME: You are in a ',
        replacePair: [/^GAME: You are in a ([a-z]* game)\.$/i, '$1'],
      },
      {
        name: 'splatMoney',
        matchPhrase: 'You are given an instant ',
        replacePair: [/^You are given an instant (\$\d+)!$/i, '+$1'],
      },
      {
        name: 'survivedMoney',
        matchPhrase: 'You earned ',
        replacePair: [/You earned (\$\d+).*/i, '+$1'],
      },
      {
        name: 'botRoster',
        matchPhrase: 'Bot Roster:',
        replacePair: [
          /^Bot Roster:((?:\r\n[a-z ]*)+)/im,
          (match, p1) => `${p1.split('\r\n').length - 1} Bots`,
        ],
      },
      {
        name: 'splattedYou',
        matchPhrase: 'splatted you in the',
        replacePair: [
          /^.*\((.*)\) splatted you in the.*$/i,
          '$1 splatted you!',
        ],
      },
      {
        name: 'soldItem',
        matchPhrase: 'You sell the',
        replacePair: [/You sell the (\w+) for (\$\d+)\./i, '+$2 ($1)'],
      },
      {
        name: 'youSplatted',
        matchPhrase: 'You splatted',
        replacePair: [/^You splatted (.*) in the (.*)/i, '$1 ($2)'],
      },
    ];
  }

  setView() {
    // Todo: move view ui setup calls here
  }

  handleMessage(msgEvent) {
    const id = msgEvent.data.slice(7, 9);
    if (id === '10') {
      const { text } = JSON.parse(msgEvent.data);
      const match = this.taggedMessagePreds.find(({ matchPhrase }) =>
        text.includes(matchPhrase)
      );
      if (match) {
        const response = text.replace(...match.replacePair);
        this.view.render('hudMessage', {
          text: response.trim(),
        });
      }
    }
  }

  handleKeydown({ key, shiftKey, altKey, ctrlKey }) {
    const hotkey = key + +shiftKey + +altKey + +ctrlKey;
    const chatboxIsNotActive = !(
      window.Component592 === document.activeElement
    );

    if (this.view.$activeEditHotkeyCard) {
      this.view._updateEditHotkeyCard(hotkey);
      return;
    }

    if (chatboxIsNotActive && this.model.hotkeys[hotkey]) {
      window.sendPortal(`{"id":"05","text":"${this.model.hotkeys[hotkey]}"}`);
    }
  }
}
