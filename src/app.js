import Controller from './controller';
import View from './view';
import Model from './model';

// Prevent double loading bookmarklet
if (!window.pbnHotkeysLoaded) {
  window.pbnHotkeysLoaded = true;

  const view = new View();
  const model = new Model();
  const controller = new Controller(view, model);

  console.log('PBN-Hotkeys by tomrule007');
}
