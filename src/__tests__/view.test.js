import View from '../view';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('View', () => {
  let view;
  beforeEach(() => {
    // Set up blank mock dom
    document.body.innerHTML = '<div> </div>';

    // Run UI generating code
    view = new View();
    // view.createUI();
  });
  it('Initializes UI to matches snapshot', async () => {
    expect(document.body).toMatchSnapshot();
  });
  it("clicking 'PBN-Hotkeys' link shows the hotkey menu", async () => {
    expect(view.$menu).not.toBeVisible();

    const hotkeyLink = screen.getByText(/hotkeys$/i);
    hotkeyLink.click();

    expect(view.$menu).toBeVisible();
  });
  it("clicking close button '[x]' hides the hotkey menu ", async () => {
    // show the menu first and make sure that works
    expect(view.$menu).not.toBeVisible();

    const hotkeyLink = screen.getByText(/hotkeys$/i);
    hotkeyLink.click();

    expect(view.$menu).toBeVisible();
    // find close button and check that it hides the menu.
    const closeButton = screen.getByText(/x$/i);
    closeButton.click();
    expect(view.$menu).not.toBeVisible();
  });
});
