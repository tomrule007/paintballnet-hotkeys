# paintballnet-hotkeys 1.2.0

Bookmarklet that allows users to create hotkeys for paintballnet.net",

---

## HOW TO USE

1.  Goto [bookmarklet page](https://tomrule007.github.io/paintballnet-hotkeys/build/index.html) and copy `Bookmarklet` link to your browser bookmarks.

2.  Open [http://paintballnet.net/play](http://paintballnet.net/play)
3.  With `paintballnet.net/play` tab active click the `Bookmarklet` bookmark

\*Must click on the `Bookmarklet` before connecting to the server. (display in upper righthand corner will turn black when connected)

---

## Development - Getting Started

### Setup

```bash
$git clone https://github.com/tomrule007/paintballnet-hotkeys.git
$cd paintballnet-hotkeys
$npm install
```

### Generate bookmarklet

```bash
$npm run build
```

Open --->`build/index.html` & add bookmarklet to bookmark bar.

### To change hotkeys

Use the in game UI to set the hotkeys and commands (\*This is still a work in progress and may be a little buggy)

Modify `src/savedHotkeys.js` and redo `Generate bookmarklet` instructions

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
