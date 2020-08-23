export let savedHotkeys = JSON.parse(
  window.localStorage.getItem('pbn-hotkeys') || '{}'
);

// {
//   // key shift alt ctrl meta : cmd or alias (no slash needed)
//   E1000: 'get token jacket & sell token & get flag jacket & sell flag', // shift+E
//   e0000: 'get token & get flag & put token jacket & put flag jacket', // e
//   R1000: 'game ready auto', // shift+R
//   r0000: 'reload', // r
//   q0000: 'swap & get gun back & put %lhand back', // q
//   Q1000: 'game ready standby', // shift+Q
// };
