// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==
// proxy the window.WebSocket object
var WebSocketProxy = new Proxy(window.WebSocket, {
  construct: function (target, args) {
    // create WebSocket instance
    const instance = new target(...args);

    // WebSocket "onopen" handler
    const openHandler = (event) => {
      console.log('Open', event);
    };

    // WebSocket "onmessage" handler
    const messageHandler = (event) => {
      console.log('Message', event);
    };

    // WebSocket "onclose" handler
    const closeHandler = (event) => {
      console.log('Close', event);
      // remove event listeners
      instance.removeEventListener('open', openHandler);
      instance.removeEventListener('message', messageHandler);
      instance.removeEventListener('close', closeHandler);
    };

    // add event listeners
    instance.addEventListener('open', openHandler);
    instance.addEventListener('message', messageHandler);
    instance.addEventListener('close', closeHandler);

    // proxy the WebSocket.send() function
    const sendProxy = new Proxy(instance.send, {
      apply: function (target, thisArg, args) {
        console.log('target', target, 'thisArg', thisArg, 'Send', args);
        target.apply(thisArg, args);
      },
    });

    // replace the native send function with the proxy
    instance.send = sendProxy;
    window.sendPortal = instance.send.bind(instance);
    // return the WebSocket instance
    return instance;
  },
});

// replace the native WebSocket with the proxy
window.WebSocket = WebSocketProxy;
function keydown({ key, shiftKey, altKey, ctrlKey, metaKey }) {
  const modifierKey = '' + +shiftKey + +altKey + +ctrlKey + +metaKey;

  switch (key + modifierKey) {
    case 'E1000': // shift+E
      sendPortal('{"id":"05","text":"1"}');
      break;
    case 'e0000': // e
      sendPortal('{"id":"05","text":"1"}');
      break;
    case 'R1000': // shift+R
      sendPortal('{"id":"05","text":"game ready auto"}');
      break;
    case 'r0000': // r
      sendPortal('{"id":"05","text":"reload"}');
      break;
    case 'q0000': // q
      sendPortal('{"id":"05","text":"swap & get gun back & put %lhand back"}');
      break;
    case 'Q1000': // shift+Q
      sendPortal('{"id":"05","text":"game ready standby"}');
      break;
    default:
      break;
  }
}
document.addEventListener('keydown', keydown);

function createUI() {
  //Menu link
  const a = document.createElement('a');
  const linkText = document.createTextNode('PBN-Hotkeys');
  a.appendChild(linkText);
  a.title = 'hotkeys by tomrule007';
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
createUI();
