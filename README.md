# Font Sizer

A Chrome extension for controlling font size of selected text on web pages.

## Load in Chrome
1. Open `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this folder.

## Features
- **Font Size Control**: Increase, decrease, or reset font size of selected text
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Text Selection Based**: Works with any selected text on web pages
- **No Build Required**: Pure JavaScript/HTML/CSS

## How to Use
1. Select any text on a webpage
2. Click the Font Sizer extension icon
3. Use the + and - buttons to adjust font size
4. Use the reset button to restore original size
5. Toggle theme with the theme button

## What's inside
- `manifest.json` — MV3 manifest with Font Sizer configuration
- `src/service_worker.js` — background service worker
- `src/content.js` — content script for font manipulation
- `popup/` — popup UI with font controls and theme toggle

## Technical Details
- **Manifest V3** Chrome extension
- **No build step** required - pure JavaScript/HTML/CSS
- **Permissions**: storage, activeTab, scripting, and host permissions for all URLs
- **Font manipulation**: Wraps selected text in spans with inline styles
- **Theme persistence**: Uses chrome.storage.sync for dark/light mode preference
- **Minimum font size**: 8px to ensure readability
