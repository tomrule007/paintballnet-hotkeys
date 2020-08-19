export function createUI() {
  //Menu link
  const a = document.createElement('a');
  const linkText = document.createTextNode('PBN-Hotkeys');
  a.appendChild(linkText);
  a.title = `red = not connected
black = connected
hotkeys by tomrule007`;
  a.id = 'pbnHotkeysLink';
  a.style.cssText = `position: fixed; 
                     z-index: 1000;
                     top: 0;
                     right: 0;
                     color: red;
                     text-decoration: underline;
                     cursor: pointer;
                     `;

  document.body.appendChild(a);
}
function setLinkEnabled() {
  pbnHotkeysLink.style.color = 'black';
}
