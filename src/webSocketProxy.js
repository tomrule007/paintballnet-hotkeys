export function createWebSocketProxy() {
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
