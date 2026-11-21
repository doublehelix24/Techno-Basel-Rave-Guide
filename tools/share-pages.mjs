#!/usr/bin/env node
// Generates one share page per event in public/e/<slug>/: an index.html with that event's
// Open Graph tags (link previews in WhatsApp, iMessage, Telegram, Slack…) that forwards
// visitors to /#<slug>, plus a 1200×630 card.png rendered with headless Chromium.
//
// Run from the repository root after changing events, then commit public/e/:
//   node tools/share-pages.mjs            # pages and cards
//   node tools/share-pages.mjs --no-cards # pages only
//
// Link-preview crawlers never see the #fragment of a URL, which is why /#<slug> links
// can only show the site-wide card.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const SITE = 'https://technoafterdark.com';
const root = resolve(import.meta.dirname, '..');
const pub = join(root, 'public');
const outDir = join(pub, 'e');
const withCards = !process.argv.includes('--no-cards');

const html = readFileSync(join(pub, 'index.html'), 'utf8');
const js = readFileSync(join(pub, 'guide.js'), 'utf8');

const decode = text => text.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The ordered events array in guide.js is plain object literals; evaluate just that slice.
const arraySource = js.slice(js.indexOf('const events = [') + 'const events = '.length, js.indexOf('];', js.indexOf('const events = [')) + 1);
const events = Function(`return ${arraySource}`)();

// Overview rows pair with the events array by position, as in guide.js.
const table = html.slice(html.indexOf('overview-table'), html.indexOf('</table>', html.indexOf('overview-table')));
const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].slice(1).map(match => [...match[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(cell => cell[1]));
if (rows.length !== events.length) throw new Error(`Overview has ${rows.length} rows but guide.js has ${events.length} events`);

const dateLabel = (date, opts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts })
  .format(new Date(Date.UTC(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8))));

const items = events.map((event, index) => {
  const [, nameCell, identityCell, fitCell, priceCell] = rows[index];
  const section = html.match(new RegExp(`<section id="${event.id}"[\\s\\S]*?</section>`))?.[0];
  if (!section) throw new Error(`No section #${event.id}`);
  const title = decode(section.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)[1]);
  const sub = decode(section.match(/<p class="sub">([\s\S]*?)<\/p>/)?.[1] || '');
  const name = decode(nameCell.match(/<strong>([\s\S]*?)<\/strong>/)[1]);
  const venue = decode(nameCell.split(/<br\s*\/?>/).pop());
  const tag = decode(identityCell.match(/<span class="event-tag">([\s\S]*?)<\/span>/)?.[1] || '');
  const identity = decode(identityCell.replace(/<span class="event-tag">[\s\S]*?<\/span>/, ''));
  const priceText = decode(priceCell.match(/<a class="price-link"[^>]*>([\s\S]*?)<\/a>/)?.[1] || priceCell.replace(/<details[\s\S]*<\/details>/, ''));
  const price = /^\d/.test(priceText) ? `From CHF ${priceText}` : 'Price TBC';
  const city = event.location.split(',').pop().trim().replace(/^\d+\s+/, '');
  const year = event.date.slice(0, 4);
  return {
    ...event, title, venue, city, identity, price,
    // Named events show the line-up as a second line; otherwise an event tag the title lacks, or the section subtitle.
    detail: !title.toLowerCase().includes(name.toLowerCase()) ? name
      : tag && !title.toLowerCase().includes(tag.toLowerCase()) ? tag : sub,
    fit: decode(fitCell),
    day: dateLabel(event.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(',', ''),
    shortDay: `${dateLabel(event.date, { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '')}${year === '2026' ? '' : ` ${year}`}`,
    url: `${SITE}/e/${event.slug}/`
  };
});

function sharePage(item) {
  const ogTitle = `${item.title} · ${item.shortDay} · ${item.venue}`;
  const description = `${item.detail ? `${item.detail} · ` : ''}${item.identity}. ${item.day} at ${item.venue}, ${item.city}. ${item.price} · group fit ${item.fit}/10.`;
  const alt = `${item.title}: ${item.day} at ${item.venue}, ${item.city}. Techno After Dark share card.`;
  const target = `/#${item.slug}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(ogTitle)} · Techno After Dark</title>
<meta name="description" content="${escape(description)}">
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Techno After Dark">
<meta property="og:title" content="${escape(ogTitle)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${item.url}">
<meta property="og:image" content="${item.url}card.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escape(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(ogTitle)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${item.url}card.png">
<meta name="twitter:image:alt" content="${escape(alt)}">
<link rel="icon" href="/techno-circle.png">
<script>location.replace(${JSON.stringify(target)});</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b0c;color:#efece6;font:16px/1.5 system-ui,sans-serif}a{color:#ffad8a}</style>
</head>
<body>
<p><a href="${target}">${escape(item.title)} · ${escape(item.day)} — open in Techno After Dark</a></p>
</body>
</html>
`;
}

function cardHtml(item) {
  const logo = `file://${join(pub, 'techno-circle.png')}`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@500;600&family=JetBrains+Mono:wght@500;700&display=block">
<style>
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:radial-gradient(ellipse at 88% 70%,#2a1d18 0,transparent 55%),#0b0b0c;color:#efece6;font-family:Inter,sans-serif;position:relative}
.frame{position:absolute;inset:32px;border:1px solid #2c2c2e;padding:44px 56px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font:700 17px/1 'JetBrains Mono',monospace;letter-spacing:.14em}
.brand img{width:44px;height:44px;object-fit:cover;clip-path:circle(43% at 50% 50%)}
.brand em{font-style:normal;color:#ffad8a}
.brand .site{margin-left:auto;color:#8b8781;font-weight:500;font-size:15px;letter-spacing:.08em}
.kicker{margin-top:44px;font:700 22px/1.2 'JetBrains Mono',monospace;letter-spacing:.12em;color:#ffad8a;text-transform:uppercase}
h1{font:400 112px/0.98 Anton,sans-serif;text-transform:uppercase;letter-spacing:.005em;margin-top:18px;max-width:1030px}
h1 .dot{color:#ffad8a}
.detail{margin-top:18px;font:600 28px/1.25 Inter,sans-serif;color:#efece6}
.identity{margin-top:8px;font:500 24px/1.3 Inter,sans-serif;color:#a9a49d}
.meta{margin-top:auto;display:flex;gap:14px;font:700 19px/1 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase}
.meta span{border:1px solid #3a3a3c;padding:12px 16px}
.meta .fit{background:#ffad8a;color:#0b0b0c;border-color:#ffad8a}
</style></head><body><div class="frame">
<div class="brand"><img src="${logo}" alt=""><span>TECHNO CIRCLE <em>BASEL</em></span><span class="site">TECHNOAFTERDARK.COM</span></div>
<p class="kicker">${escape(item.day)} · ${escape(item.venue)}, ${escape(item.city)}</p>
<h1 id="title">${escape(item.title)}<span class="dot">.</span></h1>
${item.detail ? `<p class="detail">${escape(item.detail)}</p>` : ''}
<p class="identity">${escape(item.identity)}</p>
<div class="meta"><span class="fit">Group fit ${escape(item.fit)}/10</span><span>${escape(item.price)}</span></div>
</div>
<script>
// Once Anton has loaded, grow single-line titles and shrink long ones until the details clear the price row.
Promise.all([document.fonts.load('112px Anton'), document.fonts.load('600 28px Inter'), document.fonts.load('700 19px "JetBrains Mono"')]).then(() => {
  const title = document.getElementById('title');
  const last = document.querySelector('.identity');
  const meta = document.querySelector('.meta');
  const fits = () => last.getBoundingClientRect().bottom + 28 <= meta.getBoundingClientRect().top
    && meta.getBoundingClientRect().bottom <= 630 - 32 - 44 + 1;
  let size = 132;
  title.style.fontSize = size + 'px';
  while (size > 56 && (!fits() || title.getBoundingClientRect().height > size * 0.98 * 2 + 4)) {
    size -= 4;
    title.style.fontSize = size + 'px';
  }
});
</script></body></html>`;
}

mkdirSync(outDir, { recursive: true });
const slugs = new Set(items.map(item => item.slug));
for (const entry of readdirSync(outDir)) {
  if (!slugs.has(entry)) rmSync(join(outDir, entry), { recursive: true, force: true });
}

const tmp = withCards ? mkdtempSync(join(tmpdir(), 'share-cards-')) : null;
const chromium = ['chromium', 'chromium-browser', 'google-chrome'].find(bin => {
  try { execFileSync('which', [bin], { stdio: 'ignore' }); return true; } catch { return false; }
});
if (withCards && !chromium) throw new Error('Chromium is required to render cards; use --no-cards to skip them.');

for (const item of items) {
  const dir = join(outDir, item.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), sharePage(item));
  if (withCards) {
    const page = join(tmp, `${item.slug}.html`);
    writeFileSync(page, cardHtml(item));
    execFileSync(chromium, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--allow-file-access-from-files', '--virtual-time-budget=8000', '--window-size=1200,630',
      `--screenshot=${join(dir, 'card.png')}`, `file://${page}`], { stdio: 'ignore' });
    if (!existsSync(join(dir, 'card.png'))) throw new Error(`Card not rendered for ${item.slug}`);
  }
  console.log(`${item.url}  ${item.title} · ${item.shortDay}`);
}
if (tmp) rmSync(tmp, { recursive: true, force: true });
