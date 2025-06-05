# YNAB Trigger Button Extension

A Chrome extension that adds a trigger button to YNAB's account pages.

## Setup

1. Clone this repository
2. Copy `config.js.example` to `config.js`
3. Update `config.js` with your trigger URL
4. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select this directory

## Configuration

The extension uses `config.js` for environment-specific settings. Create your `config.js` based on the example:

```javascript
const config = {
  TRIGGER_URL: "your-trigger-url-here",
};
```

Make sure to add your actual trigger URL before loading the extension.

## Development

The extension adds a button to YNAB's account pages that triggers a webhook when clicked. The button automatically appears and disappears as you navigate between pages in YNAB.
