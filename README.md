# 🔤 Font Sizer

> A Chrome extension for controlling font size of selected text on web pages.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome&logoColor=white)](https://github.com/Lulubellelll/Font-Sizer-Exten)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)](https://developer.chrome.com/docs/extensions/mv3/)

## 🚀 Load in Chrome
1. Open `chrome://extensions` 🌐
2. Enable "Developer mode" ⚙️
3. Click "Load unpacked" and select this folder 📁

## ✨ Features

- 📈 **Font Size Control**: Increase, decrease, or reset font size of selected text
- 🎨 **Dark/Light Theme**: Toggle between themes with persistent storage
- 🎯 **Text Selection Based**: Works with any selected text on web pages
- ⚡ **No Build Required**: Pure JavaScript/HTML/CSS

## 📖 How to Use

1. 🖱️ Select any text on a webpage
2. 🔤 Click the Font Sizer extension icon
3. ➕➖ Use the + and - buttons to adjust font size
4. 🔄 Use the reset button to restore original size
5. 🌙☀️ Toggle theme with the theme button

## 📦 What's inside

```
📁 Font Sizer/
├── 📄 manifest.json          # MV3 manifest with Font Sizer configuration
├── 📁 src/
│   ├── 🔧 service_worker.js   # Background service worker
│   └── 📜 content.js          # Content script for font manipulation
└── 📁 popup/
    ├── 🎨 popup.html          # Popup UI structure
    ├── 💫 popup.js            # Font controls logic
    └── 🎭 popup.css           # Theme styles
```

## 🔧 Technical Details

| Feature | Description |
|---------|-------------|
| 🏗️ **Architecture** | Manifest V3 Chrome extension |
| ⚡ **Build Process** | No build step required - pure JavaScript/HTML/CSS |
| 🔐 **Permissions** | `storage`, `activeTab`, `scripting`, `<all_urls>` |
| 🎯 **Font Logic** | Wraps selected text in spans with inline styles |
| 💾 **Storage** | Uses `chrome.storage.sync` for theme preference |
| 📏 **Limits** | Minimum font size: 8px for readability |

---

<div align="center">
  <p>Made with ❤️ for better web typography</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
