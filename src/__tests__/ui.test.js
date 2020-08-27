import { createUI } from '../ui';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('CreateUI()', () => {
  beforeEach(() => {
    // Set up blank mock dom
    document.body.innerHTML = '<div> </div>';

    // Run UI generating code
    createUI();
  });
  it('Generates UI to matches snapshot', async () => {
    //make snapshot of modified dom
    expect(document.body).toMatchSnapshot();
  });
  it('clicking hotkeys link shows menu', async () => {
    const menuDiv = document.getElementById('pbnHotkeysMenu');

    expect(menuDiv).not.toBeVisible();

    const hotkeyLink = screen.getByText(/hotkeys$/i);
    hotkeyLink.click();

    expect(menuDiv).toBeVisible();
  });
});
