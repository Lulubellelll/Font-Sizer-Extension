# Chrome Extension Starter

A minimal Chrome Extension (Manifest V3) starter.

## Load in Chrome
1. Open `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this folder.

## What’s inside
- `manifest.json` — MV3 manifest
- `src/service_worker.js` — background service worker
- `src/content.js` — sample content script
- `popup/` — popup UI (HTML/CSS/JS)

## Notes
- No build step; pure JavaScript/HTML/CSS.
- Icons are optional to start. You can add PNG icons (16/32/48/128) later via `icons` and `action.default_icon` in the manifest.
