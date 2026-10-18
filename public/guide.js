(() => {
  'use strict';

  const events = [
    { id: 'page3', date: '20261024', start: '230000', endDate: '20261025', end: '060000', location: 'MÄX, Hardstrasse 219, 8005 Zürich', approximateEnd: true },
    { id: 'page4', date: '20261114', start: '180000', endDate: '20261115', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page5', date: '20261121', start: '180000', endDate: '20261122', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page6', date: '20261127', start: '180000', endDate: '20261128', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page7', date: '20261128', start: '180000', endDate: '20261129', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page8', date: '20261204', start: '180000', endDate: '20261205', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page9', date: '20261205', start: '180000', endDate: '20261206', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page10', date: '20261219', start: '180000', endDate: '20261220', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page11', date: '20270122', start: '220000', endDate: '20270123', end: '050000', location: 'Kaufleuten Klubsaal, Pelikanplatz, 8001 Zürich' },
    { id: 'page17', date: '20270220', start: '183000', endDate: '20270220', end: '223000', location: 'Halle 622, Therese-Giehse-Strasse 10, 8050 Zürich', doors: true }
  ];

  const venues = {
    'MÄX': { id: 'venue-maex', image: 'venue-maex.jpg', alt: 'MÄX club interior with an open dancefloor, stage and galleries on both sides', description: 'Industrial dancefloor, stage and gallery', source: 'https://www.maag-moments.ch/maag/de/halle-mieten/maag-halle/club.html', website: 'https://maexzuerich.com/', credit: 'MAAG Moments' },
    'Warehouse ZRH': { id: 'venue-warehouse', image: 'venue-warehouse.webp', alt: 'Warehouse ZRH illuminated promotional sign', description: 'Temporary superclub · opening November 2026', source: 'https://www.warehousezrh.com/', credit: 'Warehouse ZRH', creditLabel: 'Image', note: 'Official promotional image; the venue has not opened yet.' },
    'Kaufleuten': { id: 'venue-kaufleuten', image: 'venue-kaufleuten.jpg', alt: 'Red-and-gold Kaufleuten Klubsaal with gallery', description: 'The classic red-and-gold Klubsaal', source: 'https://kaufleuten.ch/anlass-und-bankett/klubsaal/', credit: 'Kaufleuten Zürich' },
    'Halle 622': { id: 'venue-halle622', image: 'venue-halle622.webp', alt: 'Open floor and colorful lighting inside Halle 622', description: 'A spacious industrial concert hall', source: 'https://www.livenation.de/en/halle-622-tickets-vdp987139', credit: 'Live Nation', website: 'https://www.halle622.ch/' }
  };

  // Official artist profiles keyed by the line-up name. Omit a platform when no official profile was verified.
  const artists = {
    'ALT8': { spotify: '7uS4z6GqvIIdZbVq327Ak9', youtube: 'alt8music' },
    'Kichta': { spotify: '7q6gx2J7fy969LK4hGRw8Y', youtube: 'kichtaofficial' },
    'ROW1': { spotify: '0UuarPj3exthni2ZBHrRqj' },
    'Marco Carola': { spotify: '2p8O7NCyfWf1sIZamrU9N1', youtube: 'marcocarolaofficial' },
    'Loco Dice': { spotify: '4rbw4Z9Hjn6n9x5oYzZe7P', youtube: 'LocoDiceOFC' },
    'Seth Troxler': { spotify: '3JkLFcTej6tdwZoQT6Nx4B', youtube: 'sethtroxlermusic' },
    'Fleur Shore': { spotify: '7GyRA9n7JVslQGcbo72Dil', youtube: 'fleur_shore' },
    'Dangel Twins': { spotify: '4bTaaH6xPoOsHSdSuVP4Ww', youtube: 'dangeltwins' },
    'Axwell': { spotify: '1xNmvlEiICkRlRGqlNFZ43', youtube: 'axwell' },
    'Claptone': { spotify: '4mncDFjVLUa3s025Tct3Ry', youtube: 'CLAPTONEOFFICIAL' },
    'Oliver Heldens': { spotify: '5nki7yRhxgM509M5ADlN1p', youtube: 'OliverHeldens' },
    'Gil Glaze': { spotify: '6pNzdcgIaKQKsYNS5agP4V', youtube: 'gilglaze' },
    'HUGEL': { spotify: '5PlfkPxwCpRRWQJBxCa0By', youtube: 'HUGELBeats' },
    'AMÉMÉ': { spotify: '1txb9Qg5lJ3KATxPcIYyvO' },
    'HoneyLuv': { spotify: '1sl3gVNz3Nxd4poA8f76sl', youtube: 'honeyluvmusic' },
    'Juany Bravo': { spotify: '7FWTTxJZ35ZNqhFCLOE3zm', youtube: 'juanybravomusic' },
    'MoBlack': { spotify: '6Je4hal6B5wiRd46aeswrs' },
    'Charlotte de Witte': { spotify: '1lJhME1ZpzsEa5M0wW6Mso', youtube: 'charlottedewittemusic' },
    'Adiel': { spotify: '1yetl1fEx0mE16k164jXvw' },
    'FJAAK': { spotify: '4qG1qjeHfkASTdyRGbLWbV', youtube: 'FJAAKBERLIN' },
    'NHŨ': { spotify: '1zceUCoBvAnJf8TZSyTjgx' },
    'Sanem': { spotify: '6IX6e4Mnx8RwzMEx9AYe6H', youtube: 'SANEM.musiic' },
    'ARTBAT': { spotify: '3BkRu2TGd2I1uBxZKddfg1', youtube: 'ARTBAT' },
    'Miss Monique': { spotify: '29TpNOsTNYbLb6Xa10H0PR', youtube: 'djmissmonique' },
    'Mahmut Orhan': { spotify: '3t8WiyalpvnB9AObcMufiE', youtube: 'Mahmut_Orhan' },
    'Eric Prydz': { spotify: '5sm0jQ1mq0dusiLtDJ2b4R', youtube: 'ericprydz' },
    'Mind Against': { spotify: '48LWLoeY0dhwaiX1FRsn72', youtube: 'mindagainstOFC' },
    'Innellea': { spotify: '71rqI5HtraA3qXBwatyG6e', youtube: 'Innellea' },
    'Yulia Niko': { spotify: '3RUNl0j2ISAQdC2Fxhj2q3', youtube: 'yulianikomusic' },
    'Ardour': { spotify: '29FluI1TFyBYE4Qb9bl99D' },
    'Paul van Dyk': { spotify: '7wU1naftD3lNq7rNsiDvOR', youtube: 'PaulvanDyk' },
    'John Summit': { spotify: '7kNqXtgeIwFtelmRjWv205', youtube: 'JohnSummit' }
  };

  function venueFigure(name, data, includeDetails = false) {
    const figure = document.createElement('figure');
    figure.className = 'venue-figure';
    const image = document.createElement('img');
    image.src = data.image;
    image.alt = data.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    const caption = document.createElement('figcaption');
    const heading = document.createElement('strong');
    heading.textContent = name;
    const description = document.createElement('span');
    description.textContent = data.description;
    const credit = document.createElement('small');
    credit.className = 'venue-photo-credit';
    credit.textContent = `${data.creditLabel || 'Photo'}: ${data.credit}`;
    const website = document.createElement('a');
    website.href = data.website || data.source;
    website.textContent = 'Website';
    website.setAttribute('aria-label', `${name} Website`);
    caption.append(heading, description);
    if (data.note) {
      const note = document.createElement('small');
      note.textContent = data.note;
      caption.append(note);
    }
    const actions = document.createElement('div');
    actions.className = 'venue-photo-actions';
    if (includeDetails) {
      const details = document.createElement('a');
      details.href = `#${data.id}`;
      details.className = 'venue-details-link';
      details.textContent = 'Details';
      details.setAttribute('aria-label', `${name} Details`);
      actions.append(details);
    }
    actions.append(website);
    caption.append(credit, actions);
    figure.append(image, caption);
    return figure;
  }

  const venueChevron = '<svg class="venue-expander" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';

  function setupVenues() {
    const gallery = document.getElementById('venue-gallery');
    const setGalleryOpen = open => {
      gallery.querySelectorAll('.venue-gallery-card').forEach(card => {
        if (card.open !== open) card.open = open;
      });
    };
    // Native details toggles also cover keyboard activation and programmatic changes.
    gallery.addEventListener('toggle', event => {
      if (event.target.matches('.venue-gallery-card')) setGalleryOpen(event.target.open);
    }, true);
    Object.entries(venues).forEach(([name, data]) => {
      const details = document.createElement('details');
      details.className = 'venue-gallery-card';
      details.id = data.id;
      const summary = document.createElement('summary');
      summary.title = 'Expand or collapse all venue photos';
      summary.innerHTML = `<span><strong>${name}</strong><small>${data.description}</small></span><span class="venue-gallery-prompt">${venueChevron}</span>`;
      details.append(summary, venueFigure(name, data));
      gallery.append(details);
    });

    document.querySelectorAll('.overview-table tr').forEach((row, index) => {
      if (!index) return;
      const nameCell = row.cells[1];
      const nameNode = nameCell.lastChild;
      const name = nameNode.textContent.trim();
      const data = venues[name];
      if (!data) return;
      const wrap = document.createElement('div');
      wrap.className = 'venue-preview';
      const link = document.createElement('a');
      link.href = `#${data.id}`;
      link.className = 'venue-link';
      link.textContent = name;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'venue-preview-button';
      button.setAttribute('aria-label', `Show ${name} venue image`);
      button.setAttribute('aria-controls', `venue-preview-${index}`);
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = venueChevron;
      const panel = document.createElement('div');
      panel.className = 'venue-preview-panel';
      panel.id = `venue-preview-${index}`;
      panel.append(venueFigure(name, data, true));
      const revealVenue = () => {
        setGalleryOpen(true);
        wrap.classList.remove('is-open');
        wrap.classList.add('is-dismissed');
        button.setAttribute('aria-expanded', 'false');
      };
      link.addEventListener('click', revealVenue);
      panel.querySelector('.venue-details-link').addEventListener('click', revealVenue);
      wrap.append(link, button, panel);
      nameNode.replaceWith(wrap);
      button.addEventListener('click', () => {
        const open = !wrap.classList.contains('is-open');
        document.querySelectorAll('.venue-preview.is-open').forEach(other => {
          other.classList.remove('is-open');
          other.querySelector('button').setAttribute('aria-expanded', 'false');
        });
        wrap.classList.toggle('is-open', open);
        wrap.classList.toggle('is-dismissed', !open);
        button.setAttribute('aria-expanded', String(open));
      });
      wrap.addEventListener('mouseleave', () => wrap.classList.remove('is-dismissed'));
      wrap.addEventListener('focusout', event => {
        if (!wrap.contains(event.relatedTarget)) wrap.classList.remove('is-dismissed');
      });
    });

    document.addEventListener('click', event => {
      if (event.target.closest('.venue-preview')) return;
      document.querySelectorAll('.venue-preview.is-open').forEach(wrap => {
        wrap.classList.remove('is-open');
        wrap.classList.add('is-dismissed');
        wrap.querySelector('button').setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.venue-preview.is-open').forEach(wrap => {
        wrap.classList.remove('is-open');
        wrap.classList.add('is-dismissed');
        wrap.querySelector('button').setAttribute('aria-expanded', 'false');
      });
    });
  }

  const ARTIST_PANEL_WIDTH = 160; // Matches .artist-panel in guide.css.

  function setupArtists() {
    const closeArtist = wrap => {
      wrap.classList.remove('is-open');
      wrap.querySelector('button').setAttribute('aria-expanded', 'false');
    };
    document.querySelectorAll('.facts .artist').forEach((node, index) => {
      const name = node.textContent.trim();
      const data = artists[name];
      if (!data) return;
      const wrap = document.createElement('span');
      wrap.className = 'artist-wrap';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'artist-button';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `artist-links-${index}`);
      button.innerHTML = `${venueChevron}<span class="sr-only">, artist profiles</span>`;
      button.prepend(name);
      const panel = document.createElement('span');
      panel.className = 'artist-panel';
      panel.id = `artist-links-${index}`;
      [['Spotify', data.spotify && `https://open.spotify.com/artist/${data.spotify}`],
       ['YouTube', data.youtube && `https://www.youtube.com/@${data.youtube}`]].forEach(([label, href]) => {
        if (!href) return;
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        link.setAttribute('aria-label', `${name} on ${label}`);
        panel.append(link);
      });
      wrap.append(button, panel);
      // Keep trailing punctuation on the same line as the name button.
      const next = node.nextSibling;
      const punctuation = next?.nodeType === Node.TEXT_NODE && next.textContent.match(/^[,.;:]/)?.[0];
      if (punctuation) {
        next.textContent = next.textContent.slice(1);
        wrap.append(punctuation);
      }
      node.replaceWith(wrap);
      wrap.closest('.table-wrap')?.classList.add('has-artists');
      button.addEventListener('click', () => {
        const open = !wrap.classList.contains('is-open');
        document.querySelectorAll('.artist-wrap.is-open').forEach(closeArtist);
        if (open) {
          // Shift the fixed-width panel before showing it so it never overflows the facts table.
          const bounds = wrap.closest('.table-wrap').getBoundingClientRect();
          const left = wrap.getBoundingClientRect().left;
          panel.style.left = `${Math.min(0, bounds.right - 8 - (left + ARTIST_PANEL_WIDTH))}px`;
        }
        wrap.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
      });
    });
    document.addEventListener('click', event => {
      if (event.target.closest('.artist-wrap')) return;
      document.querySelectorAll('.artist-wrap.is-open').forEach(closeArtist);
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.artist-wrap.is-open').forEach(wrap => {
        if (wrap.contains(document.activeElement)) wrap.querySelector('button').focus();
        closeArtist(wrap);
      });
    });
  }

  const escapeIcs = value => String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  function calendarText(event, title, sourceUrl) {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const description = [
      event.doors ? 'Doors 18:30; show 20:00–22:30.' : 'Event times are local to Zürich.',
      event.approximateEnd ? 'End time is approximate.' : '',
      'Check the event page and ticket terms before travelling.',
      sourceUrl || ''
    ].filter(Boolean).join('\n');
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Techno Circle Basel//Techno Zurich Basel After Dark//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-TIMEZONE:Europe/Zurich',
      'BEGIN:VTIMEZONE', 'TZID:Europe/Zurich',
      'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0200', 'TZNAME:CEST',
      'DTSTART:19700329T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
      'BEGIN:STANDARD', 'TZOFFSETFROM:+0200', 'TZOFFSETTO:+0100', 'TZNAME:CET',
      'DTSTART:19701025T030000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
      'END:VTIMEZONE', 'BEGIN:VEVENT',
      `UID:${event.id}-${event.date}@techno-circle-basel.guide`,
      `DTSTAMP:${stamp}`, `DTSTART;TZID=Europe/Zurich:${event.date}T${event.start}`,
      `DTEND;TZID=Europe/Zurich:${event.endDate}T${event.end}`,
      `SUMMARY:${escapeIcs(title)}`, `LOCATION:${escapeIcs(event.location)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      ...(sourceUrl ? [`URL:${sourceUrl}`] : []),
      'END:VEVENT', 'END:VCALENDAR', ''
    ].join('\r\n');
  }

  function downloadCalendar(event, section) {
    const title = section.querySelector('h2').textContent.trim();
    const factLink = [...section.querySelectorAll('.facts a[href]')].find(link => !link.closest('.artist-panel'));
    const sourceUrl = factLink?.href || section.querySelector('.small a[href]')?.href;
    const blob = new Blob([calendarText(event, title, sourceUrl)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.date}-${title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-')}.ics`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function setupEvents() {
    const rows = [...document.querySelectorAll('.overview-table tr')].slice(1);
    events.forEach((event, index) => {
      const row = rows[index];
      const section = document.getElementById(event.id);
      if (!row || !section) return;

      const [dateCell, nameCell, , fitCell, priceCell] = row.cells;
      const date = dateCell.textContent.trim();
      const name = nameCell.querySelector('strong');
      dateCell.innerHTML = `<a class="date-link" href="#${event.id}">${date}</a>`;
      const eventLink = document.createElement('a');
      eventLink.href = `#${event.id}`;
      eventLink.className = 'event-link';
      eventLink.textContent = name.textContent;
      name.replaceChildren(eventLink);

      const ticketRow = [...section.querySelectorAll('.facts tr')].find(tr => tr.cells[0]?.textContent.trim() === 'TICKETS');
      const saleLink = ticketRow?.querySelector('a[href]:last-of-type');
      if (saleLink) {
        let priceLink = priceCell.querySelector('.price-link');
        if (!priceLink) {
          priceLink = document.createElement('a');
          priceLink.className = 'price-link';
          priceLink.textContent = priceCell.textContent.trim();
          priceCell.replaceChildren(priceLink);
        }
        priceLink.href = saleLink.href;
        priceLink.setAttribute('aria-label', `${name.textContent} tickets from CHF ${priceLink.textContent.trim()}`);
      }

      const score = fitCell.textContent.trim();
      const ratings = [...section.querySelectorAll('.ratings .rating')].map(item => ({
        label: item.querySelector('span')?.textContent.trim() || '',
        value: item.querySelector('strong')?.textContent.trim() || ''
      }));
      const wrap = document.createElement('div');
      wrap.className = 'fit-wrap';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'fit-button';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', `${score} out of 10 group fit. Show musical fit for ${name.textContent}`);
      button.setAttribute('aria-controls', `fit-${event.id}`);
      button.textContent = `${score}/10 fit`;
      const panel = document.createElement('div');
      panel.id = `fit-${event.id}`;
      panel.className = 'fit-panel';
      panel.innerHTML = '<h3>Musical fit</h3><p>Editorial scores out of 10</p>';
      const grid = document.createElement('div');
      grid.className = 'fit-panel-grid';
      ratings.forEach(({ label, value }) => {
        const item = document.createElement('span');
        const labelNode = document.createElement('span');
        labelNode.textContent = label;
        const valueNode = document.createElement('strong');
        valueNode.textContent = value;
        item.append(labelNode, valueNode);
        grid.append(item);
      });
      panel.append(grid);
      const detailLink = document.createElement('a');
      detailLink.href = `#${event.id}`;
      detailLink.className = 'fit-panel-link';
      detailLink.textContent = 'Explore event details →';
      panel.append(detailLink);
      wrap.append(button, panel);
      fitCell.replaceChildren(wrap);
      button.addEventListener('click', () => {
        const open = !wrap.classList.contains('is-open');
        document.querySelectorAll('.fit-wrap.is-open').forEach(other => {
          other.classList.remove('is-open');
          other.querySelector('button').setAttribute('aria-expanded', 'false');
        });
        wrap.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', String(open));
      });

      const actions = document.createElement('div');
      actions.className = 'event-actions';
      const calendar = document.createElement('button');
      calendar.type = 'button';
      calendar.className = 'calendar-link';
      calendar.textContent = 'Save in calendar';
      calendar.addEventListener('click', () => downloadCalendar(event, section));
      actions.append(calendar);
      const sectionTop = section.querySelector('.section-top');
      sectionTop.classList.add('event-header-actions');
      sectionTop.append(actions);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.fit-wrap')) {
        document.querySelectorAll('.fit-wrap.is-open').forEach(wrap => {
          wrap.classList.remove('is-open');
          wrap.querySelector('button').setAttribute('aria-expanded', 'false');
        });
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.fit-wrap.is-open').forEach(wrap => {
          wrap.classList.remove('is-open');
          wrap.querySelector('button').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function setupTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    let saved;
    try { saved = localStorage.getItem('tcb-theme'); } catch (_) { /* private browsing */ }
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
    const osDark = matchMedia('(prefers-color-scheme: dark)');
    const current = () => root.dataset.theme || (osDark.matches ? 'dark' : 'light');
    const render = () => {
      toggle.textContent = current() === 'dark' ? '☀' : '☾';
      toggle.setAttribute('aria-label', `Switch to ${current() === 'dark' ? 'light' : 'dark'} mode`);
      toggle.title = toggle.getAttribute('aria-label');
      document.querySelector('meta[name="theme-color"]').content = current() === 'dark' ? '#100d15' : '#17131f';
    };
    toggle.addEventListener('click', () => {
      root.dataset.theme = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('tcb-theme', root.dataset.theme); } catch (_) { /* private browsing */ }
      render();
    });
    osDark.addEventListener?.('change', render);
    render();
  }

  function setupDialog() {
    const dialog = document.getElementById('version-dialog');
    document.getElementById('version-toggle').addEventListener('click', () => dialog.showModal());
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }

  setupEvents();
  setupVenues();
  setupArtists();
  setupTheme();
  setupDialog();
})();
