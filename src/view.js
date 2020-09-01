import { savedHotkeys } from './model';
import { createWebSocketProxy } from './webSocketProxy';
import template from './template';
export default class View {
  constructor(props) {
    // Setup webSocketProxy spy
    createWebSocketProxy((...args) => {
      console.log('WEB SOCKET: ', args);
      ui.setLinkEnabled();
    });

    // Create and Inject UI
    this.createUI = template.createUI;
    this.createUI();

    // Save DOM Refs
    const injectionRoot = document.body;
    const menuOpenEl = document.querySelector('#pbnHotkeysLink');
    const menuHotkeyContainerEl = document.querySelector(
      '#pbnHotkeyMenuDisplay'
    );
    console.log({ injectionRoot, menuOpenEl, menuHotkeyContainerEl });
  }
  bindOnKeydown(handler) {
    document.addEventListener('keydown', handler);
  }
  render(viewCommand, parameter) {
    switch (viewCommand) {
      case 'initilizeMenu':
        break;

      default:
        throw Error(`Invalid viewCommand: ${viewCommand} `);
        break;
    }
  }
  bind(event, handler) {}
}
