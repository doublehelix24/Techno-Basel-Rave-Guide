The main guide's social preview uses `public/share-card-v3.png` (1200 × 630).
Its editable HTML/CSS source is `share-card.html`; it deliberately keeps the
logo, title and tagline inside the central square for narrower preview crops.

To regenerate from the repository root, run Chromium with an absolute `file://`
URL for `docs/social/share-card.html`:

```sh
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=10000 --screenshot=public/share-card-v3.png \
  "file://$PWD/docs/social/share-card.html"
```

Rendering needs network access to load Anton and JetBrains Mono from Google
Fonts. Inspect the output before committing; the deployed PNG needs no fonts
or JavaScript. For future artwork changes, use a new image filename and update
the metadata URLs so clients can fetch the new asset.

After a production release, share the public page URL in WhatsApp and check the
actual preview. Local image and HTML checks do not verify WhatsApp's rendering.
