export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // bind event listeners
    view.bindEvent('onKeydown', (e) => this.handleKeydown(e));
    view.bindEvent('onSaveChanges', (hotkeyData) => {
      this.model.setHotkeys(hotkeyData);
    });

    // Populate menu with saved hotkeys.
    Object.entries(model.hotkeys).forEach(([hotkey, command]) => {
      view.render('addHotkey', { hotkey, command });
    });
    // Add one blank hotkeyCard
    view.render('addHotkey');
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
      sendPortal(`{"id":"05","text":"${this.model.hotkeys[hotkey]}"}`);
    }
  }
}
