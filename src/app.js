import Controller from './controller';
import View from './view';
import Model from './model';

import { createWebSocketProxy } from './webSocketProxy';
const view = new View();
const model = new Model();

export default function () {
  const controller = new Controller(view, model);

  createWebSocketProxy((...args) => {
    console.log(args);
    ui.setLinkEnabled();
  });

  console.log('ENDD');
}
