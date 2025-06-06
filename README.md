# Steam Discussion Jester Award & Word Filter Hider

## About

This userscript enhances your Steam community discussion experience by automatically hiding posts you’d rather not see, while preserving important stickied threads. It targets posts with the Jester award or specific keywords, offering flexibility and control.

### Key Features
- **Jester Award Filter**: Hides non-stickied posts with the Jester award (reaction ID 19), leaving stickied posts visible.
- **Custom Word Filters**: Blocks posts matching editable regex patterns (e.g., `'homo|lesbian|lgbt|woke'` by default).
- **Toggle Visibility**: Click the “, X hidden” counter to show/hide filtered posts per page.
- **Dynamic Updates**: Adjusts automatically when navigating pages or loading new content.

### Details
- *Version*: 1.7.1
- *Author*: tmntanno
- *Compatibility*: Works on `https://steamcommunity.com/app/*/discussions/*` with Tampermonkey (or similar userscript managers).
- *Purpose*: Clean up discussion threads by filtering out unwanted content.

**Why Use It?** Whether you’re tired of Jester-awarded nonsense or specific topics, this script lets you curate your Steam discussions with ease. Its logic ensures stickied posts stay visible, so you never miss key announcements. Customize it to your liking and enjoy a tidier forum experience!

## Installation & Usage

### Install Tampermonkey
1. Install Tampermonkey:
   - *Chrome*: [Download here](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - *Firefox*: [Download here](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - *Other browsers*: Use Violentmonkey or Greasemonkey if supported.

### Add the Script
1. **Automatic Install**:
   - *Chrome Users*: Click the Chrome script file in this repo ([`script.js`](./script.js)). Click the "Raw" button to view the raw file. Tampermonkey will detect it and prompt you to install—click "Install".
   - *Firefox Users*: Click the Firefox script file in this repo ([`script_firefox.js`](./script_firefox.js)). Click the "Raw" button to view the raw file. Tampermonkey will detect it and prompt you to install—click "Install". This version is optimized to prevent page freezing in Firefox.
2. **Manual Install**:
   - Click the Tampermonkey icon in your browser toolbar > "Create a new script".
   - *Chrome Users*: Copy the full script (from `// ==UserScript==` to `})();`) from [the Chrome script file](./script.js) and paste it into the editor.
   - *Firefox Users*: Copy the full script (from `// ==UserScript==` to `})();`) from [the Firefox script file](./script_firefox.js) and paste it into the editor.
   - Press `Ctrl + S` or *File > Save* to activate it.

### Customize Filters (Optional)
1. Edit the `const filters = [` section:
   - *Default*: `'homo|lesbian|lgbt|woke'`
   - *Add*: e.g., `'spam|troll',`
   - *Remove*: Delete or comment out with `//`
2. Save changes (`Ctrl + S`).

### Use on Steam
1. Go to a Steam discussion page (e.g., `https://steamcommunity.com/app/APPID/discussions/`).
2. Posts with Jester awards (non-stickied) or matching filters hide automatically.
3. See “X hidden” at the page bottom (e.g., “5 hidden”).
4. Click “X hidden” to toggle showing/hiding filtered posts.

### Troubleshooting
- *Not working?* Check URL matches `https://steamcommunity.com/app/*/discussions/*`, Tampermonkey is on, refresh page.
- Adjust filters if too many/few posts are hidden, then save & refresh.

**Enjoy!** Filters out Jester-awarded or keyword-matched posts with a toggleable counter.
<br><br>
![steamcommunity_filter](https://github.com/user-attachments/assets/e80c6fc9-8b6a-4d3e-b874-cea21e83a40c)
