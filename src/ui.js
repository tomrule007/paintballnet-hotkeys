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
  const menuBarDiv = document.createElement('div');
  menuBarDiv.style.cssText = 'display: flex; justify-content:	space-between;';
  const menuLabelEl = document.createElement('span');
  menuLabelEl.append(
    document.createTextNode('Paintballnet-Hotkeys by tomrule007')
  );
  menuLabelEl.classList.add('tw3label');

  // menu content container
  const menuContentEl = document.createElement('div');
  menuContentEl.id = 'pbnHotkeyMenuDisplay';
  menuContentEl.classList.add('TPBTListBox');
  menuContentEl.style.cssText =
    'margin: 5px 2px; font-family: Lucida Console; font-size: 10pt; padding: 2px;';

  // menu close button
  const closeButtonEl = document.createElement('button');
  closeButtonEl.append(document.createTextNode('X'));
  closeButtonEl.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder'
  );
  closeButtonEl.style.cssText = 'margin: 2px; font-size: 8pt;';
  closeButtonEl.onclick = () => showMenu(false);

  //save changes button
  const saveButton = document.createElement('button');
  saveButton.append(document.createTextNode('Save Changes'));
  saveButton.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder'
  );
  saveButton.style.cssText = 'margin: 2px; font-size: 8pt;';
  saveButton.onclick = () => showMenu(false);

  const saveButtonContainerEl = document.createElement('div');
  saveButtonContainerEl.style.display = 'flex';
  saveButtonContainerEl.style.justifyContent = 'center';

  menuBarDiv.append(menuLabelEl, closeButtonEl);
  saveButtonContainerEl.append(saveButton);
  menuDiv.append(menuBarDiv, menuContentEl, saveButtonContainerEl);

  document.body.appendChild(menuDiv);

  Object.entries(savedHotkeys).forEach(([hotkey, command]) => {
    createHotkeyCard(hotkey, command);
  });
  createHotkeyCard('Click to set', '');

  return {
    setLinkEnabled,
  };
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
  const hotkeyCardContainer = document.createElement('div');
  const hotkeyCard = document.createElement('div');
  hotkeyCard.style.position = 'relative';
  const hotkeyDivEl = document.createElement('div');
  hotkeyDivEl.style.cssText =
    'display: inline-block; minWidth: 50px; textAlign: right; margin: 0px 2px';

  const hotkeyEl = document.createElement('a');
  hotkeyEl.append(document.createTextNode(hotkey));
  hotkeyEl.onclick = setHotkeyClickHandler;
  hotkeyDivEl.append(hotkeyEl);
  const hotkeyCommandEl = document.createElement('span');
  hotkeyCommandEl.append(document.createTextNode(command));
  hotkeyCommandEl.style.outline = 'none';
  hotkeyCommandEl.style.display = 'inline-block';

  hotkeyCommandEl.contentEditable = true;
  hotkeyCommandEl.onfocus = commandSpanOnFocus;
  hotkeyCommandEl.onblur = commandSpanOnBlur;

  hotkeyCardContainer.append(hotkeyCard);
  hotkeyCard.append(hotkeyDivEl, hotkeyCommandEl);

  window.pbnHotkeyMenuDisplay.appendChild(hotkeyCardContainer);
}

function showMenu(setVisible) {
  pbnHotkeysMenu.style.display = setVisible ? 'block' : 'none';
}
function setLinkEnabled() {
  pbnHotkeysLink.style.color = 'black';
}

function saveUpdatedHotkey(e) {
  console.log(
    this,
    e,
    window.hotkeySetContainer.childNodes[1].innerText,
    window.setHotkeyActive,
    window.setHotkeyActive.childNodes[0].childNodes[0]
  );
  const newHotkey = window.hotkeySetContainer.childNodes[1].innerText;
  if (newHotkey) {
    window.setHotkeyActive.childNodes[0].childNodes[0].innerText = newHotkey;
  }
  window.hotkeySetContainer.remove();
  window.setHotkeyActive.style.border = '';
  window.setHotkeyActive = undefined;
}

function deleteHotkey(e) {
  console.log(this, e);
}

function setHotkeyClickHandler(e) {
  console.log('GOO');
  if (!window.hotkeySetContainer) {
    console.log('create new div');
    // create new div
    const hotkeySetContainer = document.createElement('div');
    window.hotkeySetContainer = hotkeySetContainer;
    hotkeySetContainer.style.cssText =
      'display: flex; text-align: center; font-weight: bold; background: white;';
    const hotkeySetText = document.createTextNode(
      'Press key to set new hotkey:'
    );
    const hotkeyDiv = document.createElement('div');
    hotkeyDiv.style.flex = '1 1';
    const saveHotkeyButton = document.createElement('button');
    saveHotkeyButton.append(document.createTextNode('Save'));
    saveHotkeyButton.classList.add(
      'TW3Button',
      'TW3ButtonBackground',
      'TW3ButtonBorder'
    );
    saveHotkeyButton.style.cssText = 'font-size: 8pt;';
    saveHotkeyButton.onclick = saveUpdatedHotkey;

    const deleteHotkeyButton = document.createElement('button');
    deleteHotkeyButton.append(document.createTextNode('Delete'));
    deleteHotkeyButton.classList.add(
      'TW3Button',
      'TW3ButtonBackground',
      'TW3ButtonBorder'
    );
    deleteHotkeyButton.style.cssText = 'font-size: 8pt;';
    deleteHotkeyButton.onclick = deleteHotkey;

    hotkeySetContainer.append(
      hotkeySetText,
      hotkeyDiv,
      saveHotkeyButton,
      deleteHotkeyButton
    );
  }
  const newParent = this.parentNode.parentNode;

  //  reuse div
  const oldParent = window.hotkeySetContainer.parentNode;
  if (oldParent) {
    oldParent.style.border = '';
  }

  newParent.append(window.hotkeySetContainer);
  newParent.style.border = '1px solid black';
  window.setHotkeyActive = newParent;
}
