// ==Bookmarklet==
// @name PBN-Hotkeys
// @author Thomas Herzog
// ==/Bookmarklet==

import Controller from './controller';
import View from './view';
import Model from './model';

import { createWebSocketProxy } from './webSocketProxy';
const view = new View();
const model = new Model();
const controller = new Controller(view, model);

console.log('PBN-Hotkeys by tomrule007');
