import Controller from './controller';
import View from './view';
import Model from './model';

// Prevent double loading bookmarklet
export default function () {
  if (!window.pbnHotkeysLoaded) {
    window.pbnHotkeysLoaded = true;

    const view = new View();
    const model = new Model();
    const controller = new Controller(view, model);

    controller.setView();
  }
}
