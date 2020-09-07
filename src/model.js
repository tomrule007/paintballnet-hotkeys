// Todo: move saveHotkeys variable to Model class and update dependencies
export const savedHotkeys = JSON.parse(
  window.localStorage.getItem('pbn-hotkeys') || JSON.stringify({})
);
export default class Model {
  constructor() {
    this.hotkeys = savedHotkeys;
  }

  setHotkeys(hotkeyData) {
    this.hotkeys = hotkeyData;
    window.localStorage.setItem('pbn-hotkeys', JSON.stringify(hotkeyData));
  }
}
