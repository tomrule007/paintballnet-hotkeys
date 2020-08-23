# paintballnet-hotkeys

Bookmarklet that allows users to create hotkeys for paintballnet.net",

---

## Default hotkeys

| KEY     | COMMAND                                                     |
| ------- | ----------------------------------------------------------- |
| r       | reload                                                      |
| e       | get token & get flag & put token jacket & put flag jacket   |
| q       | swap & get gun back & put %lhand back                       |
| shift+E | get token jacket & sell token & get flag jacket & sell flag |
| shift+R | game ready auto                                             |
| shift+Q | game ready standby                                          |

## Using Bookmarklet

1.  make sure to have the bookmarklet added to your bookmarkbar.

    \*Link to current build [bookmarklet page](https://tomrule007.github.io/paintballnet-hotkeys/build/index.html)\*

2.  Open [http://paintballnet.net/play](http://paintballnet.net/play)
3.  Click the `Bookmarklet` bookmark

\*Must click on the bookmarklet before connecting to the server. (display in upper righthand corner will turn black when connected)

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
- [ ] add custom hotkey configure menu
  - [x] basic ui
  - [x] functioning save button
  - [ ] working delete button
  - [ ] working add new hotkey feature
  - [ ] bulk export/import feature

## Version History

- 1.0.0: First version with hard bound hotkeys
- 1.1.0: Rough working UI (still missing lots of features and buggy)
