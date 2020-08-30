const defaultHotkeys = JSON.stringify({
  // key shift alt ctrl meta : cmd or alias (no slash needed)
  E100: 'get token jacket & sell token & get flag jacket & sell flag', // shift+E
  e000: 'get token & get flag & put token jacket & put flag jacket', // e
  R100: 'game ready auto', // shift+R
  r000: 'reload', // r
  q000: 'swap & get gun back & put %lhand back', // q
  Q100: 'game ready standby', // shift+Q
});

export let savedHotkeys = JSON.parse(
  window.localStorage.getItem('pbn-hotkeys') || defaultHotkeys
);
export class Model {
  constructor() {
    this.hotkeys = savedHotkeys;
  }
}
