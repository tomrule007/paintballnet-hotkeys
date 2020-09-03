import { savedHotkeys } from './model';

function createUI() {
  //TODO: convert to template literal
  //Menu link
  const menuLinkDiv = document.createElement('div');
  menuLinkDiv.classList.add(
    'TPBTOverlayScrollItem',
    'TPBTOverlayScrollInfoItem'
  );
  menuLinkDiv.style.cssText = `position: fixed; 
                     z-index: 1000;
                     top: 2px;
                     right: 2px;
                     color: red;
                     text-decoration: underline;
                     cursor: pointer;
                     `;
  const a = document.createElement('a');
  a.appendChild(document.createTextNode('PBN-Hotkeys'));
  a.title = `red = not connected
black = connected
hotkeys by tomrule007`;
  a.id = 'pbnHotkeysLink';
  menuLinkDiv.append(a);
  document.body.appendChild(menuLinkDiv);
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
  closeButtonEl.id = 'pbnHotkeysMenuCloseButton';
  //save changes button
  const saveButton = document.createElement('button');
  saveButton.append(document.createTextNode('Save Changes'));
  saveButton.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder'
  );
  saveButton.style.cssText = 'margin: 2px; font-size: 8pt;';
  saveButton.id = 'pbnHotkeysMenuSaveButton';

  const saveButtonContainerEl = document.createElement('div');
  saveButtonContainerEl.style.display = 'flex';
  saveButtonContainerEl.style.justifyContent = 'center';

  menuBarDiv.append(menuLabelEl, closeButtonEl);
  saveButtonContainerEl.append(saveButton);
  menuDiv.append(menuBarDiv, menuContentEl, saveButtonContainerEl);

  document.body.appendChild(menuDiv);
}

function createHotkeyCard(hotkey, command) {
  // TODO: remove event handlers and convert to template literal
  const hotkeyCard = document.createElement('div');
  hotkeyCard.classList.add('pbnHotkeyCard');
  hotkeyCard.style.position = 'relative';
  const hotkeyDivEl = document.createElement('div');
  hotkeyDivEl.style.cssText =
    'display: inline-block; min-width: 60px; textAlign: right; margin: 0px 2px';

  const hotkeyEl = document.createElement('a');
  hotkeyEl.dataset.hotkeyCode = hotkey;
  hotkeyEl.append(document.createTextNode(hotkeyCodeToText(hotkey)));
  hotkeyEl.onclick = setHotkeyClickHandler;
  hotkeyDivEl.append(hotkeyEl);
  const hotkeyCommandInput = document.createElement('input');
  hotkeyCommandInput.classList.add(
    'TW3EditBox',
    'TW3EditBorder',
    'TW3EditBackground'
  );
  hotkeyCommandInput.value = command;
  hotkeyCommandInput.style.width = '200px';
  hotkeyCommandInput.type = 'text';
  hotkeyCommandInput.setAttribute('placeholder', 'type commands here');
  hotkeyCommandInput.onkeydown = (e) => e.stopPropagation();

  hotkeyCard.append(hotkeyDivEl, hotkeyCommandInput);
  return hotkeyCard;
}

function saveUpdatedHotkey(e) {
  const newHotkey = window.hotkeySetContainer.childNodes[1].innerText;
  const newHotkeyCode =
    window.hotkeySetContainer.childNodes[1].dataset.hotkeyCode;
  if (newHotkey) {
    window.setHotkeyActive.childNodes[0].childNodes[0].innerText = newHotkey;
    window.setHotkeyActive.childNodes[0].childNodes[0].dataset.hotkeyCode = newHotkeyCode;
    window.hotkeySetContainer.remove();
    window.setHotkeyActive.style.border = '';
    window.setHotkeyActive.style.borderBottom = '';
    window.setHotkeyActive = undefined;
  }
}

function deleteHotkey(e) {
  const hotkeyCard = this.parentNode.parentNode;
  const hotkey = hotkeyCard.childNodes[0].childNodes[0].innerText;
  const command = hotkeyCard.childNodes[1].value;
  const confirmDelete = confirm(
    `Confirm deletion of selected hotkey: 
    ${hotkey}:   ${command}`
  );
  if (confirmDelete) {
    window.setHotkeyActive = undefined;
    hotkeyCard.remove();
  }
}

function setHotkeyClickHandler(e) {
  if (!window.hotkeySetContainer) {
    // create new div
    const hotkeySetContainer = document.createElement('div');
    window.hotkeySetContainer = hotkeySetContainer;
    hotkeySetContainer.style.cssText =
      'display: flex; text-align: center; font-weight: bold; background: white;';
    const hotkeySetText = document.createTextNode('New hotkey:');
    const hotkeyDiv = document.createElement('div');
    hotkeyDiv.style.flex = '1 1';
    const saveHotkeyButton = document.createElement('button');
    saveHotkeyButton.append(document.createTextNode('Save'));
    saveHotkeyButton.classList.add(
      'TW3Button',
      'TW3ButtonBackground',
      'TW3ButtonBorder '
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

function hotkeyCodeToText(hotkey) {
  const [shiftKey, altKey, ctrlKey] = hotkey
    .slice(-3)
    .split('')
    .map((keyString) => Boolean(+keyString));

  const key = hotkey.slice(0, -3);
  // TODO: add OS specific names
  // Example: Alt == Option on macs
  return (
    (shiftKey & (key !== 'Shift') ? 'Shift+' : '') +
    (altKey & (key !== 'Alt') ? 'Alt+' : '') +
    (ctrlKey & (key !== 'Control') ? 'Ctrl+' : '') +
    key
  );
}
const template = { createUI, createHotkeyCard };
export default template;
