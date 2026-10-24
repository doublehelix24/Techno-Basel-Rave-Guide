(() => {
  'use strict';

  const events = [
    { id: 'page19', slug: 'third-party', date: '20261106', start: '230000', endDate: '20261107', end: '050000', location: 'MÄX, Hardstrasse 219, 8005 Zürich', approximateEnd: true },
    { id: 'page4', slug: 'warehouse-grand-opening', date: '20261114', start: '180000', endDate: '20261115', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page5', slug: 'axwell', date: '20261121', start: '180000', endDate: '20261122', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page6', slug: 'hugel', date: '20261127', start: '180000', endDate: '20261128', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page18', slug: 'pencil', date: '20261127', start: '230000', endDate: '20261128', end: '070000', location: 'MÄX, Hardstrasse 219, 8005 Zürich' },
    { id: 'page7', slug: 'charlotte-de-witte', date: '20261128', start: '180000', endDate: '20261129', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page8', slug: 'artbat-miss-monique', date: '20261204', start: '180000', endDate: '20261205', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page9', slug: 'mahmut-orhan', date: '20261205', start: '180000', endDate: '20261206', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page10', slug: 'warehouse-closing', date: '20261219', start: '180000', endDate: '20261220', end: '040000', location: 'Warehouse ZRH, Vulkanstrasse 126, 8048 Zürich' },
    { id: 'page20', slug: 'andrea-oliva', date: '20261226', start: '230000', endDate: '20261227', end: '070000', location: 'Nordstern, Westquaistrasse 19, 4057 Basel', approximateEnd: true },
    { id: 'page21', slug: 'rave-love', date: '20270115', start: '230000', endDate: '20270116', end: '050000', location: 'Kaufleuten Klubsaal, Pelikanplatz, 8001 Zürich' },
    { id: 'page11', slug: 'paul-van-dyk', date: '20270122', start: '220000', endDate: '20270123', end: '050000', location: 'Kaufleuten Klubsaal, Pelikanplatz, 8001 Zürich' },
    { id: 'page17', slug: 'john-summit', date: '20270220', start: '183000', endDate: '20270220', end: '223000', location: 'Halle 622, Therese-Giehse-Strasse 10, 8050 Zürich', doors: true, show: '200000' }
  ];

  const venues = {
    'MÄX': { id: 'venue-maex', image: 'venue-maex.jpg', alt: 'MÄX club interior with an open dancefloor, stage and galleries on both sides', description: 'Industrial dancefloor, stage and gallery', source: 'https://www.maag-moments.ch/maag/de/halle-mieten/maag-halle/club.html', website: 'https://maexzuerich.com/', credit: 'MAAG Moments' },
    'Warehouse ZRH': { id: 'venue-warehouse', image: 'venue-warehouse.webp', alt: 'Warehouse ZRH illuminated promotional sign', description: 'Temporary superclub · opening November 2026', source: 'https://www.warehousezrh.com/', credit: 'Warehouse ZRH', creditLabel: 'Image', note: 'Official promotional image; the venue has not opened yet.' },
    'Kaufleuten': { id: 'venue-kaufleuten', image: 'venue-kaufleuten.jpg', alt: 'Red-and-gold Kaufleuten Klubsaal with gallery', description: 'The classic red-and-gold Klubsaal', source: 'https://kaufleuten.ch/anlass-und-bankett/klubsaal/', credit: 'Kaufleuten Zürich' },
    'Halle 622': { id: 'venue-halle622', image: 'venue-halle622.webp', alt: 'Open floor and colorful lighting inside Halle 622', description: 'A spacious industrial concert hall', source: 'https://www.livenation.de/en/halle-622-tickets-vdp987139', credit: 'Live Nation', website: 'https://www.halle622.ch/' },
    'Nordstern': { id: 'venue-nordstern', image: 'venue-nordstern.webp', alt: 'Empty Nordstern club room with the DJ booth, speakers and white light panels', description: 'Club on a converted Rhine cargo ship', source: 'https://www.nordstern.com/', credit: 'Nordstern' }
  };

  // Official artist profiles keyed by the line-up name. Omit a platform when no official profile was verified.
  const artists = {
    'Marco Carola': { spotify: '2p8O7NCyfWf1sIZamrU9N1', image: '26e409c252b0f57d3c64b38b', youtube: 'marcocarolaofficial' },
    'Loco Dice': { spotify: '4rbw4Z9Hjn6n9x5oYzZe7P', image: 'e7ddcc2ca4285d89e0c97c68', youtube: 'LocoDiceOFC' },
    'Seth Troxler': { spotify: '3JkLFcTej6tdwZoQT6Nx4B', image: 'ae415c295c042f2193594a8e', youtube: 'sethtroxlermusic' },
    'Fleur Shore': { spotify: '7GyRA9n7JVslQGcbo72Dil', image: 'f11a80f81b8218b063019e0d', youtube: 'fleur_shore' },
    'Dangel Twins': { spotify: '4bTaaH6xPoOsHSdSuVP4Ww', image: '95659a50b603fd2ca7b7e718', youtube: 'dangeltwins' },
    'Axwell': { spotify: '1xNmvlEiICkRlRGqlNFZ43', image: '0c9ea880aff35b763cfecee1', youtube: 'axwell' },
    'Claptone': { spotify: '4mncDFjVLUa3s025Tct3Ry', image: 'f8bbaf81da9d83a9a186715e', youtube: 'CLAPTONEOFFICIAL' },
    'Oliver Heldens': { spotify: '5nki7yRhxgM509M5ADlN1p', image: 'e0de3617061247aa35ff7865', youtube: 'OliverHeldens' },
    'Gil Glaze': { spotify: '6pNzdcgIaKQKsYNS5agP4V', image: 'a396e56ca66119fed6b6aabb', youtube: 'gilglaze' },
    'HUGEL': { spotify: '5PlfkPxwCpRRWQJBxCa0By', image: 'f2f0c84b86e48dd70d9bcc59', youtube: 'HUGELBeats' },
    'AMÉMÉ': { spotify: '1txb9Qg5lJ3KATxPcIYyvO', image: 'd12f7fddcf0b2c4273555966' },
    'HoneyLuv': { spotify: '1sl3gVNz3Nxd4poA8f76sl', image: '7dd0fc2f44169075bacdc228', youtube: 'honeyluvmusic' },
    'Juany Bravo': { spotify: '7FWTTxJZ35ZNqhFCLOE3zm', image: 'c91e1f60a4ee0bcf8e2d04c5', youtube: 'juanybravomusic' },
    'MoBlack': { spotify: '6Je4hal6B5wiRd46aeswrs', image: 'd4aba6e62023b056c348e045' },
    'Charlotte de Witte': { spotify: '1lJhME1ZpzsEa5M0wW6Mso', image: '2d6285111ab8944150879a05', youtube: 'charlottedewittemusic' },
    'Adiel': { spotify: '1yetl1fEx0mE16k164jXvw', image: '073ddd3683ccf8e3357102c1' },
    'FJAAK': { spotify: '4qG1qjeHfkASTdyRGbLWbV', image: 'b399c0fb7440577afe194eb5', youtube: 'FJAAKBERLIN' },
    'NHŨ': { spotify: '1zceUCoBvAnJf8TZSyTjgx', image: '84cf64dec5204802e1356952' },
    'Sanem': { spotify: '6IX6e4Mnx8RwzMEx9AYe6H', image: '00d2b7e7e5ce186824848977', youtube: 'SANEM.musiic' },
    'ARTBAT': { spotify: '3BkRu2TGd2I1uBxZKddfg1', image: '2634ca41d16e9ba796dc96cb', youtube: 'ARTBAT' },
    'Miss Monique': { spotify: '29TpNOsTNYbLb6Xa10H0PR', image: 'b8028862eeb5ccaf303d71ce', youtube: 'djmissmonique' },
    'Mahmut Orhan': { spotify: '3t8WiyalpvnB9AObcMufiE', image: '9981d0fb9b0cfa3ac351be78', youtube: 'Mahmut_Orhan' },
    'Eric Prydz': { spotify: '5sm0jQ1mq0dusiLtDJ2b4R', image: '4170f1e4c72c0a9fc2eddc1d', youtube: 'ericprydz' },
    'Mind Against': { spotify: '48LWLoeY0dhwaiX1FRsn72', image: '2f886bd1377fbbeb4e7a67fa', youtube: 'mindagainstOFC' },
    'Innellea': { spotify: '71rqI5HtraA3qXBwatyG6e', image: '6aa6915de01025952b2abfdc', youtube: 'Innellea' },
    'Yulia Niko': { spotify: '3RUNl0j2ISAQdC2Fxhj2q3', image: '78445d46e5638aa7c1fd44fc', youtube: 'yulianikomusic' },
    'Ardour': { spotify: '29FluI1TFyBYE4Qb9bl99D', image: '418cccfd28d3ffd3cd69d227' },
    'Paul van Dyk': { spotify: '7wU1naftD3lNq7rNsiDvOR', image: 'f6a2ae0e81e8a35f2b29a14d', youtube: 'PaulvanDyk' },
    'John Summit': { spotify: '7kNqXtgeIwFtelmRjWv205', image: '20662b32f3dbabad755dfb53', youtube: 'JohnSummit' }
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

  const ARTIST_PANEL_WIDTH = 180; // Matches .artist-panel in guide.css.
  const platformIcons = {
    Spotify: '<svg class="platform-icon is-spotify" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/></svg>',
    YouTube: '<svg class="platform-icon is-youtube" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>'
  };
  // Spotify serves the artist's own profile image; the panel loads it only when first opened.
  const spotifyImage = (hash, size) => `https://i.scdn.co/image/ab676161${size === 320 ? '00005174' : '0000f178'}${hash}`;

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
        link.innerHTML = platformIcons[label];
        link.append(label);
        link.setAttribute('aria-label', `${name} on ${label}`);
        panel.append(link);
      });
      const showImage = () => {
        if (!data.image || panel.querySelector('.artist-photo')) return;
        const photo = document.createElement('span');
        photo.className = 'artist-photo';
        const image = document.createElement('img');
        image.src = spotifyImage(data.image, 160);
        image.srcset = `${spotifyImage(data.image, 160)} 160w, ${spotifyImage(data.image, 320)} 320w`;
        image.sizes = `${ARTIST_PANEL_WIDTH}px`;
        image.alt = `${name} artist photo`;
        image.decoding = 'async';
        const credit = document.createElement('small');
        credit.textContent = 'Image: Spotify';
        photo.append(image, credit);
        panel.prepend(photo);
      };
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
          showImage();
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
      // Close only the artist menu, not an event dialog around it.
      if (document.querySelector('.artist-wrap.is-open')) event.preventDefault();
      document.querySelectorAll('.artist-wrap.is-open').forEach(wrap => {
        if (wrap.contains(document.activeElement)) wrap.querySelector('button').focus();
        closeArtist(wrap);
      });
    });
  }

  const GENRES = ['Techno', 'House', 'Trance', 'Melodic', 'Vocal'];
  const STRONG_FIT = 7;
  const isoDate = date => `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const monthName = month => new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(+month.slice(0, 4), +month.slice(4, 6) - 1, 1)));

  // Pairs each event with its overview row and detail section, reading price and genre fit from the markup.
  function guideEvents() {
    const rows = [...document.querySelectorAll('.overview-table tr')].slice(1);
    return events.map((event, index) => {
      const row = rows[index];
      const section = document.getElementById(event.id);
      if (!row || !section) return null;
      const priceCell = row.cells[4];
      const genres = [...section.querySelectorAll('.ratings .taste .rating')]
        .filter(item => Number(item.querySelector('strong')?.textContent) >= STRONG_FIT)
        .map(item => item.querySelector('span').textContent.replace(/ fans$/, '').trim());
      return {
        ...event,
        row,
        section,
        title: row.cells[1].querySelector('strong').textContent.trim(),
        venue: event.location.split(',')[0],
        price: parseFloat((priceCell.querySelector('.price-link') || priceCell).textContent),
        genres,
        iso: isoDate(event.date),
        month: event.date.slice(0, 6),
        quickLink: document.querySelector(`.quick-links a[href="#${event.id}"]`)
      };
    }).filter(Boolean);
  }

  const filterListeners = [];
  const filterIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5z"/></svg>';

  function setupFilters(items) {
    const overview = document.querySelector('.overview-wrap');
    if (!overview || !items.length) return () => true;
    const months = [...new Set(items.map(item => item.month))];
    const prices = [50, 80, 100, 120];
    const first = items[0].iso;
    const last = items[items.length - 1].iso;
    // The filter toggle shares a toolbar row with the List / Calendar switch; the panel opens below it.
    const toolbar = document.createElement('div');
    toolbar.className = 'overview-toolbar';
    toolbar.innerHTML = `<button type="button" class="filter-toggle" aria-expanded="false" aria-controls="event-filters">${filterIcon}Filters<span class="filter-count" hidden></span></button>`;
    const toggle = toolbar.querySelector('.filter-toggle');
    const panel = document.createElement('div');
    panel.className = 'event-filters';
    panel.id = 'event-filters';
    panel.hidden = true;
    panel.innerHTML = `
      <div class="filter-grid">
        <label><span>Month</span><select data-filter="month"><option value="">Any month</option>${months.map(month => `<option value="${month}">${monthName(month)}</option>`).join('')}</select></label>
        <label><span>From</span><input type="date" data-filter="from" min="${first}" max="${last}"></label>
        <label><span>Until</span><input type="date" data-filter="until" min="${first}" max="${last}"></label>
        <label><span>Price limit</span><select data-filter="price"><option value="">Any price</option>${prices.map(price => `<option value="${price}">Up to CHF ${price}</option>`).join('')}</select></label>
      </div>
      <fieldset class="filter-genres"><legend>Genre <small>· taste fit ${STRONG_FIT}+/10</small></legend><div class="genre-chips">${GENRES.map(genre => `<button type="button" aria-pressed="false" data-genre="${genre}">${genre}</button>`).join('')}</div></fieldset>
      <div class="filter-footer"><p class="filter-status" role="status"></p><button type="button" class="filter-reset" hidden>Reset filters</button></div>`;
    overview.before(toolbar, panel);
    let settleFrame;
    toggle.addEventListener('click', () => {
      // Keep Chromium's scroll anchor from moving when the panel changes height.
      const root = document.documentElement;
      root.classList.add('is-toggling-filters');
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      cancelAnimationFrame(settleFrame);
      settleFrame = requestAnimationFrame(() => {
        settleFrame = requestAnimationFrame(() => root.classList.remove('is-toggling-filters'));
      });
    });
    const empty = document.createElement('p');
    empty.className = 'filter-empty';
    empty.hidden = true;
    empty.innerHTML = 'No events match these filters. <button type="button" class="filter-reset">Reset filters</button>';
    overview.after(empty);

    const control = name => panel.querySelector(`[data-filter="${name}"]`);
    const selectedGenres = () => [...panel.querySelectorAll('[data-genre][aria-pressed="true"]')].map(button => button.dataset.genre);
    const matches = item => {
      const month = control('month').value;
      const from = control('from').value;
      const until = control('until').value;
      const price = Number(control('price').value);
      const genres = selectedGenres();
      return (!month || item.month === month)
        && (!from || item.iso >= from)
        && (!until || item.iso <= until)
        && (!price || item.price <= price)
        && (!genres.length || genres.some(genre => item.genres.includes(genre)));
    };
    const apply = () => {
      let shown = 0;
      items.forEach(item => {
        const visible = matches(item);
        item.row.hidden = !visible;
        if (item.quickLink) item.quickLink.hidden = !visible;
        if (visible) shown++;
      });
      const active = [...panel.querySelectorAll('[data-filter]')].filter(input => input.value).length + selectedGenres().length;
      panel.querySelector('.filter-status').textContent = `Showing ${shown} of ${items.length} events`;
      const count = toggle.querySelector('.filter-count');
      count.hidden = !active;
      count.innerHTML = `${active}<span class="sr-only"> active</span>`;
      document.querySelectorAll('.filter-reset').forEach(button => { button.hidden = !active; });
      overview.classList.toggle('is-empty', !shown);
      empty.hidden = Boolean(shown);
      filterListeners.forEach(listener => listener());
    };
    panel.addEventListener('input', apply);
    panel.addEventListener('click', event => {
      const genre = event.target.closest('[data-genre]');
      if (!genre) return;
      genre.setAttribute('aria-pressed', String(genre.getAttribute('aria-pressed') !== 'true'));
      apply();
    });
    document.querySelectorAll('.filter-reset').forEach(button => button.addEventListener('click', () => {
      panel.querySelectorAll('[data-filter]').forEach(input => { input.value = ''; });
      panel.querySelectorAll('[data-genre]').forEach(genre => genre.setAttribute('aria-pressed', 'false'));
      apply();
      toggle.focus();
    }));
    apply();
    return matches;
  }

  const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayLabel = iso => new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));
  const fullDayLabel = iso => new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));
  const viewIcons = {
    list: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'
  };

  function setupCalendar(items, matches) {
    const overview = document.querySelector('.overview-wrap');
    if (!overview || !items.length) return;
    const section = overview.closest('section');
    const months = [];
    for (let year = +items[0].month.slice(0, 4), month = +items[0].month.slice(4) - 1; ; month++) {
      const date = new Date(Date.UTC(year, month, 1));
      const key = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
      months.push(key);
      if (key === items[items.length - 1].month) break;
    }
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    let current = (items.find(item => item.iso >= today) || items[0]).month;

    const switcher = document.createElement('div');
    switcher.className = 'view-switch';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Overview layout');
    switcher.innerHTML = ['list', 'calendar'].map(view => `<button type="button" data-view="${view}" aria-pressed="false">${viewIcons[view]}${view === 'list' ? 'List' : 'Calendar'}</button>`).join('');
    const calendar = document.createElement('div');
    calendar.className = 'event-calendar';
    calendar.innerHTML = `
      <div class="calendar-head">
        <button type="button" class="calendar-nav" data-step="-1" aria-label="Previous month">‹</button>
        <h2 class="calendar-title" aria-live="polite"></h2>
        <button type="button" class="calendar-nav" data-step="1" aria-label="Next month">›</button>
      </div>
      <table class="calendar-grid">
        <thead><tr>${WEEKDAYS.map(day => `<th scope="col"><abbr title="${day}">${day.slice(0, 3)}</abbr></th>`).join('')}</tr></thead>
        <tbody></tbody>
      </table>
      <ol class="calendar-agenda" aria-label="Events this month"></ol>`;
    const toolbar = document.querySelector('.overview-toolbar');
    if (toolbar) toolbar.prepend(switcher);
    else overview.before(switcher);
    overview.after(calendar);

    const eventLink = (item, className) => {
      const link = document.createElement('a');
      link.href = `#${item.id}`;
      link.className = className;
      return link;
    };
    const render = () => {
      const year = +current.slice(0, 4);
      const month = +current.slice(4) - 1;
      const visible = items.filter(item => item.month === current && matches(item));
      calendar.querySelector('.calendar-title').textContent = monthName(current);
      calendar.querySelector('[data-step="-1"]').disabled = current === months[0];
      calendar.querySelector('[data-step="1"]').disabled = current === months[months.length - 1];
      const tbody = calendar.querySelector('tbody');
      tbody.replaceChildren();
      const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
      const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      let row;
      for (let cell = 0; cell < Math.ceil((offset + days) / 7) * 7; cell++) {
        if (cell % 7 === 0) row = tbody.insertRow();
        const td = row.insertCell();
        const day = cell - offset + 1;
        if (day < 1 || day > days) { td.className = 'is-outside'; continue; }
        const iso = `${current.slice(0, 4)}-${current.slice(4)}-${String(day).padStart(2, '0')}`;
        const number = document.createElement('span');
        number.className = 'calendar-day';
        number.textContent = day;
        td.append(number);
        if (iso === today) {
          td.classList.add('is-today');
          number.setAttribute('aria-label', `${day}, today`);
        }
        visible.filter(item => item.iso === iso).forEach(item => {
          const link = eventLink(item, 'calendar-event');
          link.innerHTML = '<strong></strong><span></span>';
          link.querySelector('strong').textContent = item.title;
          link.querySelector('span').textContent = item.venue;
          link.setAttribute('aria-label', `${fullDayLabel(iso)}: ${item.title} at ${item.venue}`);
          td.classList.add('has-event');
          td.append(link);
        });
      }
      const agenda = calendar.querySelector('.calendar-agenda');
      agenda.replaceChildren(...visible.map(item => {
        const entry = document.createElement('li');
        const link = eventLink(item, 'agenda-event');
        link.innerHTML = '<time></time><strong></strong><span></span>';
        link.querySelector('time').dateTime = item.iso;
        link.querySelector('time').textContent = dayLabel(item.iso);
        link.querySelector('strong').textContent = item.title;
        link.querySelector('span').textContent = `${item.venue} · CHF ${item.price.toFixed(2)}`;
        entry.append(link);
        return entry;
      }));
      if (!visible.length) {
        const entry = document.createElement('li');
        entry.className = 'agenda-empty';
        entry.textContent = 'No matching events this month.';
        agenda.append(entry);
      }
    };
    const setView = view => {
      section.dataset.view = view;
      switcher.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
      try { localStorage.setItem('tcb-overview-view', view); } catch (_) { /* private browsing */ }
    };
    switcher.addEventListener('click', event => {
      const button = event.target.closest('[data-view]');
      if (button) setView(button.dataset.view);
    });
    calendar.querySelectorAll('.calendar-nav').forEach(button => button.addEventListener('click', () => {
      current = months[months.indexOf(current) + Number(button.dataset.step)] || current;
      render();
    }));
    filterListeners.push(() => {
      const month = document.querySelector('[data-filter="month"]')?.value;
      if (month && months.includes(month)) current = month;
      render();
    });
    let saved;
    try { saved = localStorage.getItem('tcb-overview-view'); } catch (_) { /* private browsing */ }
    setView(saved === 'calendar' ? 'calendar' : 'list');
    render();
  }

  // Opens an event's detail section in a modal. The section itself moves into the dialog so its
  // controls keep working, and returns to its place in the page when the dialog closes.
  // Readable event links such as #axwell open that event's pop-up, and the address follows the open event.
  function setupEventDialog(items, matches) {
    if (!items.length) return;
    const bySlug = new Map(items.map(item => [item.slug, item]));
    const linked = () => bySlug.get(decodeURIComponent(location.hash.slice(1)));
    if (!window.HTMLDialogElement) {
      linked()?.section.scrollIntoView();
      return;
    }
    const byId = new Map(items.map(item => [item.id, item]));
    const dialog = document.createElement('dialog');
    dialog.className = 'event-dialog';
    dialog.innerHTML = `
      <div class="event-dialog-bar">
        <button type="button" class="event-dialog-step" data-step="-1"><span aria-hidden="true">‹</span> Previous</button>
        <span class="event-dialog-position" aria-hidden="true"></span>
        <button type="button" class="event-dialog-step" data-step="1">Next <span aria-hidden="true">›</span></button>
        <button type="button" class="event-dialog-close" aria-label="Close event details">×</button>
      </div>
      <div class="event-dialog-body"></div>`;
    document.body.append(dialog);
    const body = dialog.querySelector('.event-dialog-body');
    let current = null;
    let marker = null;
    const sequence = () => {
      const visible = items.filter(matches);
      return visible.includes(current) ? visible : items;
    };
    const restore = () => {
      if (marker && current) marker.replaceWith(current.section);
      marker = null;
    };
    const show = item => {
      restore();
      current = item;
      marker = document.createElement('span');
      marker.hidden = true;
      item.section.before(marker);
      // A hidden leading element keeps the section from matching the hero's section:first-child styles.
      const spacer = document.createElement('span');
      spacer.hidden = true;
      body.replaceChildren(spacer, item.section);
      const heading = item.section.querySelector('h2');
      if (heading) {
        heading.id ||= `${item.id}-title`;
        dialog.setAttribute('aria-labelledby', heading.id);
      }
      const list = sequence();
      const index = list.indexOf(item);
      dialog.querySelector('.event-dialog-position').textContent = `${index + 1} / ${list.length}`;
      [-1, 1].forEach(step => {
        const button = dialog.querySelector(`[data-step="${step}"]`);
        const target = list[index + step];
        button.disabled = !target;
        button.title = target ? target.title : '';
      });
      body.scrollTop = 0;
      if (linked() !== item) history.replaceState(history.state, '', `#${item.slug}`);
      if (!dialog.open) {
        dialog.showModal();
        document.documentElement.classList.add('has-event-dialog');
      }
      dialog.querySelector('.event-dialog-close').focus();
    };
    dialog.addEventListener('close', () => {
      restore();
      current = null;
      document.documentElement.classList.remove('has-event-dialog');
      if (linked()) history.replaceState(history.state, '', location.pathname + location.search);
    });
    dialog.querySelector('.event-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
      const step = event.target.closest('.event-dialog-step');
      if (step) {
        const list = sequence();
        const target = list[list.indexOf(current) + Number(step.dataset.step)];
        if (target) show(target);
      }
    });
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.closest('nav')) return;
      const id = link.getAttribute('href').slice(1);
      const item = byId.get(id);
      const inDialog = dialog.contains(link);
      if (item && !item.section.contains(link)) {
        event.preventDefault();
        show(item);
      } else if (inDialog) {
        // Other in-page links close the dialog first; "Back to overview" simply returns to the page.
        if (link.closest('.section-top')) event.preventDefault();
        dialog.close();
      }
    });
    window.addEventListener('hashchange', () => {
      const item = linked();
      if (item && item !== current) show(item);
    });
    const initial = linked();
    if (initial) show(initial);
  }

  const eventUrl = event => `${location.origin}${location.pathname}#${event.slug}`;
  // Phones get the system share sheet; elsewhere the event link is copied to the clipboard.
  function shareEvent(event, title, button) {
    const url = eventUrl(event);
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      navigator.share({ title: `${title} · Techno After Dark`, url }).catch(() => {});
      return;
    }
    const flash = text => {
      button.textContent = text;
      clearTimeout(button.resetTimer);
      button.resetTimer = setTimeout(() => { button.textContent = 'Share event'; }, 2500);
    };
    const copied = navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject();
    copied.then(() => flash('Link copied'), () => {
      history.replaceState(history.state, '', `#${event.slug}`);
      flash('Copy the address bar link');
    });
  }

  const escapeIcs = value => String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  function calendarText(event, title, sourceUrl) {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const description = [
      event.doors ? 'Doors 18:30; show 20:00–22:30.' : 'Event times are Swiss local time (Europe/Zurich).',
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

  // Rating labels that name a genre share that genre's colour; the rest are character traits.
  const RATING_GENRES = { Techno: 'Techno', House: 'House', 'Melodic fans': 'Melodic', 'Vocal fans': 'Vocal', Trance: 'Trance', Melody: 'Melodic', Vocals: 'Vocal' };
  const clock = time => `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  const dayNumber = date => Date.UTC(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8)) / 864e5;
  const longDate = iso => new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));

  // The overview date links to the event and discloses its start and end times.
  function datePreview(event, date, section) {
    const wrap = document.createElement('div');
    wrap.className = 'date-preview';
    const link = document.createElement('a');
    link.className = 'date-link';
    link.href = `#${event.id}`;
    link.textContent = date;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'date-preview-button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `times-${event.id}`);
    button.setAttribute('aria-label', `Show start and end times for ${date}`);
    button.innerHTML = venueChevron;
    const panel = document.createElement('div');
    panel.className = 'date-preview-panel';
    panel.id = `times-${event.id}`;
    const heading = document.createElement('strong');
    heading.textContent = longDate(isoDate(event.date));
    const end = `${event.approximateEnd ? 'about ' : ''}${clock(event.end)}`;
    const times = [
      [event.doors ? 'Doors' : 'Start', clock(event.start)],
      ...(event.show ? [['Show', clock(event.show)]] : []),
      // A same-day or next-morning end needs no date; only longer runs name the end day.
      ['End', dayNumber(event.endDate) - dayNumber(event.date) <= 1 ? end : `${dayLabel(isoDate(event.endDate))} · ${end}`]
    ];
    const list = document.createElement('dl');
    times.forEach(([term, value]) => {
      const entry = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = term;
      const dd = document.createElement('dd');
      dd.textContent = value;
      entry.append(dt, dd);
      list.append(entry);
    });
    const calendar = document.createElement('button');
    calendar.type = 'button';
    calendar.className = 'calendar-link';
    calendar.textContent = 'Save in calendar';
    calendar.addEventListener('click', () => downloadCalendar(event, section));
    panel.append(heading, list, calendar);
    wrap.append(link, button, panel);
    button.addEventListener('click', () => {
      const open = !wrap.classList.contains('is-open');
      document.querySelectorAll('.date-preview.is-open').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.date-preview-button').setAttribute('aria-expanded', 'false');
      });
      wrap.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
    return wrap;
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
      dateCell.replaceChildren(datePreview(event, date, section));
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
        if (RATING_GENRES[label]) item.dataset.genre = RATING_GENRES[label];
        else item.dataset.trait = label;
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
      const share = document.createElement('button');
      share.type = 'button';
      share.className = 'calendar-link share-link';
      share.textContent = 'Share event';
      share.title = `Copy a direct link to ${name.textContent}`;
      share.setAttribute('aria-live', 'polite');
      share.addEventListener('click', () => shareEvent(event, name.textContent, share));
      actions.append(calendar, share);
      const sectionTop = section.querySelector('.section-top');
      sectionTop.classList.add('event-header-actions');
      sectionTop.append(actions);
    });
    const closeDates = () => document.querySelectorAll('.date-preview.is-open').forEach(wrap => {
      wrap.classList.remove('is-open');
      wrap.querySelector('.date-preview-button').setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.fit-wrap')) {
        document.querySelectorAll('.fit-wrap.is-open').forEach(wrap => {
          wrap.classList.remove('is-open');
          wrap.querySelector('button').setAttribute('aria-expanded', 'false');
        });
      }
      if (!e.target.closest('.date-preview')) closeDates();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeDates();
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
  const items = guideEvents();
  const matches = setupFilters(items);
  setupCalendar(items, matches);
  setupEventDialog(items, matches);
  setupTheme();
  setupDialog();
})();
