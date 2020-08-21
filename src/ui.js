import { savedHotkeys } from './savedHotkeys';
export function createUI() {
  //Menu link
  const a = document.createElement('a');
  a.appendChild(document.createTextNode('PBN-Hotkeys'));
  a.title = `red = not connected
black = connected
hotkeys by tomrule007`;
  a.id = 'pbnHotkeysLink';
  a.onclick = () => showMenu(true);
  a.style.cssText = `position: fixed; 
                     z-index: 1000;
                     top: 0;
                     right: 0;
                     color: red;
                     text-decoration: underline;
                     cursor: pointer;
                     `;

  document.body.appendChild(a);

  //Hotkey Setup Menu
  const menuDiv = document.createElement('div');
  menuDiv.id = 'pbnHotkeysMenu';
  menuDiv.classList.add(
    'TW3Panel',
    'TW3ContainerBorder',
    'TW3ContainerBackground'
  );
  menuDiv.style.cssText =
    'z-index: 8; right: 2px; top: 40px; position: fixed; display: none;';

  // menu label
  const menuLabelEl = document.createElement('span');
  menuLabelEl.append(
    document.createTextNode('Paintballnet-Hotkeys by tomrule007')
  );
  menuLabelEl.classList.add('tw3label');
  menuDiv.append(menuLabelEl);

  // menu content container
  const menuContentEl = document.createElement('div');
  menuContentEl.id = 'pbnHotkeyMenuDisplay';
  menuContentEl.classList.add('TPBTListBox');
  menuContentEl.style.cssText =
    'font-family: Lucida Console; font-size: 10pt; padding: 2px;';

  // menu close button
  const closeButtonEl = document.createElement('button');
  closeButtonEl.append(document.createTextNode('X'));
  closeButtonEl.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder'
  );
  closeButtonEl.style.cssText =
    'right: 2px; top: 2px; position: absolute; font-size: 8pt;';
  closeButtonEl.onclick = () => showMenu(false);

  menuDiv.append(menuLabelEl, closeButtonEl, menuContentEl);

  document.body.appendChild(menuDiv);

  Object.entries(savedHotkeys).forEach(([hotkey, command]) => {
    createHotkeyCard(hotkey, command);
  });
}

const DEFAULT_COMMAND_TEXT = 'Click to enter command';
function commandSpanOnFocus() {
  // Clear default text on focus
  if (this.innerText === DEFAULT_COMMAND_TEXT) {
    this.innerText = '';
  }
}
function commandSpanOnBlur() {
  // Remove all line breaks.
  this.childNodes.forEach((child) => {
    if (child.tagName === 'BR') {
      this.removeChild(child);
    }
  }, this);

  // Reset default text if blank
  if (this.innerText === '') {
    this.innerText = DEFAULT_COMMAND_TEXT;
  }
}
function createHotkeyCard(hotkey, command) {
  const hotkeyCard = document.createElement('div');
  const hotkeyDivEl = document.createElement('div');
  hotkeyDivEl.style.cssText =
    'display: inline-block; minWidth: 50px; textAlign: right; margin: 0px 2px';

  const hotkeyEl = document.createElement('a');
  hotkeyEl.append(document.createTextNode(hotkey));
  hotkeyDivEl.append(hotkeyEl);
  const hotkeyCommandEl = document.createElement('span');
  hotkeyCommandEl.append(document.createTextNode(command));
  hotkeyCommandEl.style.outline = 'none';
  hotkeyCommandEl.style.display = 'inline-block';

  hotkeyCommandEl.contentEditable = true;
  hotkeyCommandEl.onfocus = commandSpanOnFocus;
  hotkeyCommandEl.onblur = commandSpanOnBlur;

  hotkeyCard.append(hotkeyDivEl, hotkeyCommandEl);

  window.pbnHotkeyMenuDisplay.appendChild(hotkeyCard);
}

function showMenu(setVisible) {
  pbnHotkeysMenu.style.display = setVisible ? 'block' : 'none';
}
function setLinkEnabled() {
  pbnHotkeysLink.style.color = 'black';
}
