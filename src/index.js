import app from './app';
function createBookmarkletLink(mainFunction, linkText) {
  console.log({ mainFunction, inputType: typeof mainFunction });
  const encodedBookmarkletURI = `javascript:(${encodeURIComponent(
    mainFunction
  )})()`;
  const a = document.createElement('a');
  a.innerText = linkText;
  a.href = encodedBookmarkletURI;
  return a;
}
console.log('appString', app.toString());
function bookmarkletSize(bookmarkletURI) {
  return new Blob([bookmarkletURI]).size;
}
//app();
window.onload = function () {
  const test = function () {
    app();
  };
  const bookmarkletLink = createBookmarkletLink(app, 'PBN-Hotkeys');
  console.log(bookmarkletLink.href);
  const sizeTextEl = document.createElement('p');
  sizeTextEl.innerText = `(The bookmarklet is ${bookmarkletSize(
    bookmarkletLink.href
  )} Bytes)`;
  console.log();
  document.body.append(bookmarkletLink, sizeTextEl);
};
