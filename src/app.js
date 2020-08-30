// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==

import { savedHotkeys } from './model';
import { createUI, hotkeyCodeToText } from './view';
import { createWebSocketProxy } from './webSocketProxy';

export const pbnHotkeys = {
  hotkeys: savedHotkeys,
  createHotkeyListener() {
    const handleKeydown = ({ key, shiftKey, altKey, ctrlKey }) => {
      const hotkey = key + +shiftKey + +altKey + +ctrlKey;
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
pbnHotkeys.createHotkeyListener();
console.log('ENDD');
