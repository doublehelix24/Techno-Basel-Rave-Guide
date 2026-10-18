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
    const sourceUrl = section.querySelector('.facts a[href]')?.href || section.querySelector('.small a[href]')?.href;
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

      const [dateCell, nameCell, , fitCell] = row.cells;
      const date = dateCell.textContent.trim();
      const name = nameCell.querySelector('strong');
      dateCell.innerHTML = `<a class="date-link" href="#${event.id}">${date}</a>`;
      const eventLink = document.createElement('a');
      eventLink.href = `#${event.id}`;
      eventLink.className = 'event-link';
      eventLink.textContent = name.textContent;
      name.replaceChildren(eventLink);

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
      calendar.textContent = 'Download calendar invite';
      calendar.addEventListener('click', () => downloadCalendar(event, section));
      actions.append(calendar);
      section.querySelector('.sub')?.after(actions);
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
  setupTheme();
  setupDialog();
})();
