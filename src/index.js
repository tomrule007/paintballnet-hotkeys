// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==
// proxy the window.WebSocket object

const savedHotkeys = {
  // key shift alt ctrl meta : cmd or alias (no slash needed)
  E1000: '1', // shift+E
  e0000: '2', // e
  R1000: 'game ready auto', // shift+R
  r0000: 'reload', // r
  q0000: 'swap & get gun back & put %lhand back', // q
  Q1000: 'game ready standby', // shift+Q
};

function createWebSocketProxy() {
  var WebSocketProxy = new Proxy(window.WebSocket, {
    construct: function (target, args) {
      // create WebSocket instance
      const instance = new target(...args);

      const closeHandler = (event) => {
        // remove event listeners
        instance.removeEventListener('open', setLinkEnabled);
        instance.removeEventListener('close', closeHandler);
      };

      // add event listeners
      instance.addEventListener('open', setLinkEnabled);
      instance.addEventListener('close', closeHandler);

      // proxy the WebSocket.send() function
      const sendProxy = new Proxy(instance.send, {
        apply: function (target, thisArg, args) {
          target.apply(thisArg, args);
        },
      });

      // replace the native send function with the proxy
      instance.send = sendProxy;

      // Add global reference to websocket send function
      window.sendPortal = instance.send.bind(instance);

      // return the WebSocket instance
      return instance;
    },
  });

  // replace the native WebSocket with the proxy
  window.WebSocket = WebSocketProxy;
}
function createHotkeyListener(hotkeys) {
  function handleKeydown({ key, shiftKey, altKey, ctrlKey, metaKey }) {
    const hotkey = key + +shiftKey + +altKey + +ctrlKey + +metaKey;
    const chatboxIsNotActive = !(
      window.Component592 === document.activeElement
    );
    if (chatboxIsNotActive && hotkeys[hotkey]) {
      sendPortal(`{"id":"05","text":"${hotkeys[hotkey]}"}`);
    }
  }
  document.addEventListener('keydown', handleKeydown);
}

function createUI() {
  //Menu link
  const a = document.createElement('a');
  const linkText = document.createTextNode('PBN-Hotkeys');
  a.appendChild(linkText);
  a.title = `red = not connected
black = connected
hotkeys by tomrule007`;
  a.id = 'pbnHotkeysLink';
  a.style.cssText = `position: fixed; 
                     z-index: 1000;
                     top: 0;
                     right: 0;
                     color: red;
                     text-decoration: underline;
                     cursor: pointer;
                     `;

  document.body.appendChild(a);
}
function setLinkEnabled() {
  pbnHotkeysLink.style.color = 'black';
}

createUI();
createWebSocketProxy();
createHotkeyListener(savedHotkeys);
