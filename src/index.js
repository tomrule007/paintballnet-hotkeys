// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==

import { savedHotkeys } from './savedHotkeys';
import { createUI } from './ui';
import { createWebSocketProxy } from './webSocketProxy';

export const pbnHotkeys = {
  hotkeys: savedHotkeys,
  createHotkeyListener() {
    const handleKeydown = ({ key, shiftKey, altKey, ctrlKey, metaKey }) => {
      console.log('what is this', this);
      const hotkey = key + +shiftKey + +altKey + +ctrlKey + +metaKey;
      const chatboxIsNotActive = !(
        window.Component592 === document.activeElement
      );

      if (window.setHotkeyActive) {
        console.log('key capture', hotkey, 'activeHotkeyCard', setHotkeyActive);
        window.hotkeySetContainer.childNodes[1].innerText = hotkey;
        return;
      }

      if (chatboxIsNotActive && this.hotkeys[hotkey]) {
        sendPortal(`{"id":"05","text":"${this.hotkeys[hotkey]}"}`);
      }
    };
    document.addEventListener('keydown', handleKeydown);
  },
};

const ui = createUI();
createWebSocketProxy((...args) => {
  console.log(args);
  ui.setLinkEnabled();
});
pbnHotkeys.createHotkeyListener(savedHotkeys);
console.log('ENDD');
