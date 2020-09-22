import style from './template.module.css';

function createUI() {
  // TODO: convert to template literal
  // Menu link
  const menuLinkDiv = document.createElement('div');
  menuLinkDiv.classList.add(
    'TPBTOverlayScrollItem',
    'TPBTOverlayScrollInfoItem',
    style.pbnMenuLink
  );
  const a = document.createElement('a');
  a.appendChild(document.createTextNode('PBN-Hotkeys'));
  a.title = `red = not connected
black = connected
hotkeys by tomrule007`;
  a.id = 'pbnHotkeysLink';
  menuLinkDiv.append(a);
  document.body.appendChild(menuLinkDiv);
  // Hotkey Setup Menu
  const menuDiv = document.createElement('div');
  menuDiv.id = 'pbnHotkeysMenu';
  menuDiv.classList.add(
    'TW3Panel',
    'TW3ContainerBorder',
    'TW3ContainerBackground',
    style.pbnMenu,
    style.hidden
  );

  // menu label
  const menuBarDiv = document.createElement('div');
  menuBarDiv.classList.add(style.pbnMenuBar);
  const menuLabelEl = document.createElement('span');
  menuLabelEl.append(
    document.createTextNode('Paintballnet-Hotkeys by tomrule007')
  );
  menuLabelEl.classList.add('tw3label');

  // menu content container
  const menuContentEl = document.createElement('div');
  menuContentEl.id = 'pbnHotkeyMenuDisplay';
  menuContentEl.classList.add('TPBTListBox', style.pbnMenuContent);
  // menu close button
  const closeButtonEl = document.createElement('button');
  closeButtonEl.append(document.createTextNode('X'));
  closeButtonEl.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder',
    style.pbnMenuButton
  );
  closeButtonEl.id = 'pbnHotkeysMenuCloseButton';
  // save changes button
  const saveButton = document.createElement('button');
  saveButton.append(document.createTextNode('Save Changes'));
  saveButton.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder',
    style.pbnMenuButton
  );
  saveButton.id = 'pbnHotkeysMenuSaveButton';

  const saveButtonContainerEl = document.createElement('div');
  saveButtonContainerEl.classList.add(style.pbnMenuFooter);

  menuBarDiv.append(menuLabelEl, closeButtonEl);
  saveButtonContainerEl.append(saveButton);
  menuDiv.append(menuBarDiv, menuContentEl, saveButtonContainerEl);

  document.body.appendChild(menuDiv);
}

function createHotkeyCard(hotkey, hotkeyText, command) {
  // TODO: convert to template literal
  const hotkeyCard = document.createElement('div');
  hotkeyCard.classList.add(style.pbnHotkeyCard);
  const hotkeyDivEl = document.createElement('div');
  hotkeyDivEl.classList.add(style.pbnHotkeyDiv);

  const hotkeyEl = document.createElement('a');
  hotkeyEl.dataset.hotkeyCode = hotkey;
  hotkeyEl.append(document.createTextNode(hotkeyText));
  hotkeyDivEl.append(hotkeyEl);
  const hotkeyCommandInput = document.createElement('input');
  hotkeyCommandInput.classList.add(
    'TW3EditBox',
    'TW3EditBorder',
    'TW3EditBackground',
    style.pbnCommandInput
  );
  hotkeyCommandInput.value = command;
  hotkeyCommandInput.type = 'text';
  hotkeyCommandInput.setAttribute('placeholder', 'type commands here');
  hotkeyCommandInput.onkeydown = (e) => e.stopPropagation();

  hotkeyCard.append(hotkeyDivEl, hotkeyCommandInput);
  return [hotkeyCard, hotkeyEl];
}

function createHotkeyEditCard() {
  // TODO: convert to template literal
  const hotkeySetContainer = document.createElement('div');
  hotkeySetContainer.classList.add(style.pbnHotkeyEditCard);
  const hotkeySetText = document.createTextNode('New hotkey:');
  const hotkeyDiv = document.createElement('div');
  hotkeyDiv.classList.add(style.pbnHotkeyEditCardEl);
  const setHotkeyButton = document.createElement('button');
  setHotkeyButton.append(document.createTextNode('Set'));
  setHotkeyButton.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder',
    style.pbnMenuButton
  );

  const deleteHotkeyButton = document.createElement('button');
  deleteHotkeyButton.append(document.createTextNode('Delete'));
  deleteHotkeyButton.classList.add(
    'TW3Button',
    'TW3ButtonBackground',
    'TW3ButtonBorder',
    style.pbnMenuButton
  );

  hotkeySetContainer.append(
    hotkeySetText,
    hotkeyDiv,
    setHotkeyButton,
    deleteHotkeyButton
  );

  return [hotkeySetContainer, setHotkeyButton, deleteHotkeyButton];
}

function createHUD() {
  const hud = document.createElement('div');
  hud.classList.add(style.pbnHud);
  document.body.append(hud);
  return hud;
}

const template = {
  createUI,
  createHotkeyCard,
  createHotkeyEditCard,
  createHUD,
};
export default template;
