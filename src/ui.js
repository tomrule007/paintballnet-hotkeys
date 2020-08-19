export function createUI() {
  //Menu link
  const a = document.createElement('a');
  const linkText = document.createTextNode('PBN-Hotkeys');
  a.appendChild(linkText);
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

  //Main menu
  const menuTemplate = document.createElement('template');

  menuTemplate.innerHTML = `
<div class="TW3Panel TW3ContainerBorder TW3ContainerBackground"
style="z-index: 8; display: inline-block; overflow: hidden;
right: 2px; top: 40px; position: fixed; width: 350px; height: 53px;">
    <div class="TW3Label"
    style="z-index: 1; display: inline-block; overflow: hidden;
    left: 2px; top: 2px; position: absolute; width: 257px; height: 18px;">
        <div class="lbxcontent lbxcontent_h_left lbxdisableBreak lbxcontent_v_top">Paintballnet-Hotkeys</div>
    </div>
    <div class="TPBTListBox"
    style="z-index: 2; display: inline-block; overflow: hidden;
    left: 2px; top: 25px; position: absolute; width: 344px; height: 24px;">
        <div id="Component157" class="TW3ScrollContainer"
        style="z-index: 1; display: inline-block; overflow: hidden;
        left: 0px; top: 0px; position: absolute; width: 342px; height: 22px;">
            <div class="TPBTListBoxVisibleItems"
            style="z-index: 1; display: inline-block; overflow: hidden;
            left: 0px; top: 0px; position: absolute; will-change: transform; transform: translate(0px, 0px);
            width: 342px; height: 22px;">
                <div class="TPBTListBoxMonoSpaceItem TPBTListBoxItem"
                style="z-index: 22; display: inline-block; overflow: hidden;
                left: 0px; top: 0px; position: absolute; width: 342px;">
                    <span>tomrule007               |standby   | 1904|5| |Marauders</span>
                </div>
            </div>
        </div>
    </div>
    <button class="TW3Button TW3ButtonBackground TW3ButtonBorder" 
    style="z-index: 3; display: inline-block; overflow: hidden; 
    left: 333px; top: 2px; position: absolute; font-size: 8pt; width: 13px; height: 18px;">X</button>
</div>`;

  //menuContainer.id = 'pbnHotkeysMenu';
  document.body.appendChild(menuTemplate.content);
}

function createHotkey(hotkey) {
  const hotkeyWidget = document.createElement('div');
  const hotkeyText = document.createTextNode(hotkey);
  hotkeyWidget.appendChild(hotkeyText);
  // menu.id = 'pbnHotkeysMenu';
  // menu.style.cssText = `position: fixed;
  //                    z-index: 1000;
  //                    text-align: center;
  //                    border: solid black 1px;
  //                    width: 200px;
  //                    height: 200px;
  //                    margin: auto;
  //                    top: 50%;
  //                    left: 50%;
  //                    transform: translate(-50%, -50%);
  //                    display: none;
  //                    `;
  pbnHotkeysMenu.appendChild(hotkeyWidget);
  //hotkey key
  //hotkey command
  //hotkey edit button
  //hotkey save button
}
window.pbnHotkeysCapture = false;
function showMenu(setVisible) {
  pbnHotkeysMenu.style.display = setVisible ? 'block' : 'none';
  window.pbnHotkeysCapture = true;
}
function setLinkEnabled() {
  pbnHotkeysLink.style.color = 'black';
}
