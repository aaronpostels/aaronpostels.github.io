# Phase Up

Phase 10 phase generator and score counter. Installable PWA, single-page static app, no build step.

## Run

Serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Then open the served URL in a browser. Install via "Add to Home Screen" for offline use (service worker caches assets).

## Files

- `index.html` - app (HTML/CSS/JS bundled, minified)
- `manifest.webmanifest` - PWA manifest
- `sw.js` - service worker for offline caching
- `icon-*.png` - app icons
