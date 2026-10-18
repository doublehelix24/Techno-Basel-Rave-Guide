// PROTOTYPE — throwaway redesign explorer, served from /prototypes/redesign/ only.
// Plan: five structurally different redesigns of the existing guide page, switchable via ?variant=,
// with the current design kept as the baseline. A and B keep the original Techno Circle logo;
// C, D and E recolor it.
(() => {
  'use strict';

  const variants = [
    { key: 'current', name: 'Current design', logo: 'original' },
    { key: 'A', name: 'Bunker', logo: 'original' },
    { key: 'B', name: 'Gallery', logo: 'original' },
    { key: 'C', name: 'Acid', logo: 'recolored lime' },
    { key: 'D', name: 'Chrome', logo: 'recolored silver' },
    { key: 'E', name: 'Infrared', logo: 'recolored red' }
  ];

  const params = new URLSearchParams(location.search);
  // This page lives in a subfolder; guide.js builds venue photos with root-relative file names.
  new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    node.querySelectorAll('img[src^="venue-"]').forEach(img => { img.src = `../../${img.getAttribute('src')}`; });
  }))).observe(document.documentElement, { childList: true, subtree: true });

  const requested = (params.get('variant') || 'A').toUpperCase();
  const current = variants.find(v => v.key.toUpperCase() === requested) || variants[1];
  if (current.key !== 'current') document.documentElement.dataset.variant = current.key;

  const filters = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <filter id="logo-acid" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0.03 0.16 0.66 0.95"/>
      <feFuncG type="table" tableValues="0.03 0.2 0.94 1"/>
      <feFuncB type="table" tableValues="0.03 0.02 0.02 0.55"/>
    </feComponentTransfer>
  </filter>
  <filter id="logo-infrared" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncR type="table" tableValues="0.04 0.38 1 1"/>
      <feFuncG type="table" tableValues="0.01 0.03 0.16 0.72"/>
      <feFuncB type="table" tableValues="0.01 0.02 0.12 0.6"/>
    </feComponentTransfer>
  </filter>
</svg>`;

  function go(step) {
    const index = (variants.indexOf(current) + step + variants.length) % variants.length;
    const url = new URL(location.href);
    url.searchParams.set('variant', variants[index].key);
    location.replace(url);
  }

  function mount() {
    document.body.insertAdjacentHTML('beforeend', filters);
    const bar = document.createElement('div');
    bar.className = 'proto-switcher';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Prototype design variants');
    bar.innerHTML = `
      <button type="button" data-step="-1" aria-label="Previous variant">←</button>
      <span><b>${current.key}</b> ${current.name}<small>Logo: ${current.logo} · ${variants.indexOf(current) + 1}/${variants.length}</small></span>
      <button type="button" data-step="1" aria-label="Next variant">→</button>`;
    bar.addEventListener('click', e => {
      const button = e.target.closest('button[data-step]');
      if (button) go(Number(button.dataset.step));
    });
    document.body.append(bar);
    document.title = `[${current.key}] ${document.title}`;
  }

  document.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    go(e.key === 'ArrowLeft' ? -1 : 1);
  });

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
