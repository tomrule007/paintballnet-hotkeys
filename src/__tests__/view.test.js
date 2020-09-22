import View from '../view';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

xdescribe('View', () => {
  beforeEach(() => {
    // Set up blank mock dom
    document.body.innerHTML = '<div> </div>';

    // Run UI generating code
    const view = new View();
    // view.createUI();
  });
  it('Initializes UI to matches snapshot', async () => {
    //make snapshot of modified dom
    expect(document.body).toMatchSnapshot();
  });
  it("clicking 'PBN-Hotkeys' link shows the hotkey menu", async () => {
    const menuDiv = document.getElementById('pbnHotkeysMenu');

    expect(menuDiv).not.toBeVisible();

    const hotkeyLink = screen.getByText(/hotkeys$/i);
    hotkeyLink.click();

    expect(menuDiv).toBeVisible();
  });
  it("clicking close button '[x]' hides the hotkey menu ", async () => {
    //show the menu first and make sure that works
    const menuDiv = document.getElementById('pbnHotkeysMenu');
    expect(menuDiv).not.toBeVisible();

    const hotkeyLink = screen.getByText(/hotkeys$/i);
    hotkeyLink.click();

    expect(menuDiv).toBeVisible();
    // find close button and check that it hides the menu.
    const closeButton = screen.getByText(/x$/i);
    closeButton.click();
    expect(menuDiv).not.toBeVisible();
  });
});
