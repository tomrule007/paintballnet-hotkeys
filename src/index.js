// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==

import { savedHotkeys } from './savedHotkeys';
import { createUI } from './ui';
import { createWebSocketProxy } from './webSocketProxy';

function createHotkeyListener(hotkeys) {
  function handleKeydown({ key, shiftKey, altKey, ctrlKey, metaKey }) {
    const hotkey = key + +shiftKey + +altKey + +ctrlKey + +metaKey;
    const chatboxIsNotActive = !(
      window.Component592 === document.activeElement
    );

    if (window.setHotkeyActive) {
      console.log('key capture', hotkey, 'activeHotkeyCard', setHotkeyActive);
      window.hotkeySetContainer.childNodes[1].innerText = hotkey;
      return;
    }

    if (chatboxIsNotActive && hotkeys[hotkey]) {
      sendPortal(`{"id":"05","text":"${hotkeys[hotkey]}"}`);
    }
  }
  document.addEventListener('keydown', handleKeydown);
}

const ui = createUI();
createWebSocketProxy((...args) => {
  console.log(args);
  ui.setLinkEnabled();
});
createHotkeyListener(savedHotkeys);
console.log('ENDD');
