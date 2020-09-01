export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // bind event listeners
    document.addEventListener('keydown', this.handleKeydown);
  }
  render(viewCommand, parameters) {
    switch (viewCommand) {
      case value:
        break;

      default:
        break;
    }
  }
  handleKeydown = ({ key, shiftKey, altKey, ctrlKey }) => {
    console.log(this);
    const hotkey = key + +shiftKey + +altKey + +ctrlKey;
    console.log(hotkey);
    const chatboxIsNotActive = !(
      window.Component592 === document.activeElement
    );

    if (window.setHotkeyActive) {
      window.hotkeySetContainer.childNodes[1].dataset.hotkeyCode = hotkey;
      window.hotkeySetContainer.childNodes[1].innerText = hotkeyCodeToText(
        hotkey
      );

      return;
    }

    if (chatboxIsNotActive && this.model.hotkeys[hotkey]) {
      sendPortal(`{"id":"05","text":"${this.model.hotkeys[hotkey]}"}`);
    }
  };
}
