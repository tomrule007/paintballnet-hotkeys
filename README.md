# paintballnet-hotkeys 1.2.0

Bookmarklet that allows users to create hotkeys for paintballnet.net",

---

## HOW TO USE

1.  Goto [bookmarklet page](https://tomrule007.github.io/paintballnet-hotkeys/build/index.html) and copy `PBN-Hotkeys` link to your browser bookmarks.

    \* Also available [Beta bookmarklet page](./beta-build/index.html) with `combat-text and hotkeys`

2.  With `paintballnet.net/play` tab active click the `PBN-Hotkeys` bookmark

\*Must click on the `PBN-Hotkeys` bookmark before connecting to the server. (Menu link in upper right hand corner will turn black when connected)

---

## Development - Getting Started

### Setup

```bash
$git clone https://github.com/tomrule007/paintballnet-hotkeys.git
$cd paintballnet-hotkeys
$npm install
```

Development

```bash
$npm run start
```

that runs the script and with auto loading web-dev server. Also includes the paintballnet css classes for a better feel of actual ui interface on paintballnet and supports hot reloading for speedy development.

### Generate bookmarklet

Production build:

```bash
$npm run build
```

generates a single `build/index.html` file with bookmarklet link that can be hosted or opened directly in the browser.

---

## Future features

- [x] add status label to show hotkeys are working
- [x] add custom hotkey configure menu
  - [x] basic ui
  - [x] functioning save button
  - [x] working delete button
  - [x] working add new hotkey feature
- [ ] bulk export/import feature
- [ ] Add hotkey profiles that can be toggled via other hotkeys - this would allow players to make equipment specific key binds

## Version History

- 1.0.0: First version with hard bound hotkeys
- 1.1.0: Rough working UI (still missing lots of features and buggy)
- 1.2.0: UI is fully functioning! User can Create, Update, Save and Delete custom hotkeys
