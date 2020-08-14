# paintballnet-hotkeys

Bookmarklet that allows users to create hotkeys for paintballnet.net",

---

## Current hot keys

| KEY     | COMMAND                       |
| ------- | ----------------------------- |
| r       | reload                        |
| e       | get flag & get token          |
| q       | swap free gun & semi-auto gun |
| shift+E | sell flag & sell token        |
| shift+R | game ready auto               |
| shift+Q | game ready standby            |

## Using Bookmarklet

\*Link to current build [bookmarklet page](https://tomrule007.github.io/paintballnet-hotkeys/build/index.html)

1. Open [http://paintballnet.net/play](http://paintballnet.net/play)
2. Click `PBN-Hotkeys` bookmark

\*Must click on the bookmarklet before connecting to the server.

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

Modify `src/index.js` and redo `Generate bookmarklet` instructions

---

## Future features

- add status label to show hotkeys are working
- add custom hotkey configure menu

## Version History

- 1.0.0: First version with hard bound hotkeys
