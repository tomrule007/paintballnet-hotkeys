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

    //test message
    this.view.render('hudMessage', { text: 'test text' });
  }

  setView() {
    // Todo: move view ui setup calls here
  }

  handleMessage(msgEvent) {
    // should probably parse after some basic checking like slicing for ID
    const data = JSON.parse(msgEvent.data);
    switch (data.id) {
      case '10':
        console.log(data.text);
        const gameName = data.text.match(
          /^GAME\: You are in a ([a-z]* game)\.$/i
        );
        if (gameName) {
          this.view.render('hudMessage', { text: gameName[1] });
        }
        const splatMoney = data.text.match(
          /^You are given an instant (\$\d+)\!$/i
        );
        if (splatMoney) {
          this.view.render('hudMessage', { text: `+${splatMoney[1]}` });
        }
        const survivedMoney = data.text.match(
          /You earned (\$\d+) for surviving!/i
        );
        if (survivedMoney) {
          console.log({ survivedMoney });
          this.view.render('hudMessage', { text: `+${survivedMoney[1]}` });
        }
        const botRoster = data.text.match(/^Bot Roster\:((?:\r\n[a-z ]*)+)/im);
        if (botRoster) {
          console.log({ botRoster });
          const botCount = botRoster[0].split('\r\n').length - 1;
          this.view.render('hudMessage', { text: `${botCount} Bots` });
          return;
        }
        const splattedYou = data.text.match(/\((.*)\) splatted you in the/i);
        if (splattedYou) {
          this.view.render('hudMessage', {
            text: `${splattedYou[1]} splatted you!`,
            time: 5000,
          });
          return;
        }
        const soldItem = data.text.match(/You sell the (\w+) for (\$\d+)\./i);
        if (soldItem) {
          this.view.render('hudMessage', {
            text: `+${soldItem[2]} (${soldItem[1]})`,
          });
          return;
        }
        const youSplatted = data.text.match(/^You splatted (.*) in the (.*)/i);
        if (youSplatted) {
          this.view.render('hudMessage', {
            text: `${youSplatted[1]} (${youSplatted[2]})`,
          });
          return;
        }
        break;

      default:
        // console.log('rest', { id, data });
        break;
    }
    // console.log('after switch', data);
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
