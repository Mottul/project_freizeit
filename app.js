(function () {
  'use strict';

  const { TARIFE, KATEGORIEN, ORTE } = window.FZ_DATEN;
  const FZ = window.FZ;
  const SPEICHER = 'freizeitbilanz-v1';

  const VORGABE = {
    personen: { tarif: 'vv-familie', erwachsene: 1, kinder: 2, preisErw: 789, preisKind: 155 },
    zeitraum: { von: '', bis: '' },
    theme: 'auto',
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const kopie = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const neueId = (p = '') =>
    p + (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10));

  const euro = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' });
  const euro0 = new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const fmt = (n) => euro.format(n);
  const fmt0 = (n) => euro0.format(n);
  const fmtSigned = (n) => (n > 0 ? '+' : n < 0 ? '−' : '') + euro.format(Math.abs(n));
  const prozent = (q) => Math.round(q * 100) + ' %';
  const preisText = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ','));

  const alsDatum = (s) => new Date(s + 'T00:00:00');
  const datumLang = (s) => alsDatum(s).toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  const datumKurz = (s) => alsDatum(s).toLocaleDateString('de-AT', { day: 'numeric', month: 'short' });
  const monatName = (s) => alsDatum(s.slice(0, 7) + '-01').toLocaleDateString('de-AT', { month: 'long', year: 'numeric' });
  const kat = (id) => KATEGORIEN.find((k) => k.id === id) || KATEGORIEN[KATEGORIEN.length - 1];

  // ---------- Zustand ----------

  let stand = laden();

  function laden() {
    let roh = null;
    try {
      roh = JSON.parse(localStorage.getItem(SPEICHER) || 'null');
    } catch {
      roh = null;
    }
    const s = FZ.pruefeStand(roh, VORGABE, KATEGORIEN);
    if (!roh || !Array.isArray(roh.orte)) s.orte = kopie(ORTE);
    return s;
  }

  function speichern() {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(stand));
    } catch {
      toast('Speichern fehlgeschlagen – ist der Speicher voll oder privat?');
    }
  }

  // ---------- Navigation ----------

  let aktuelleAnsicht = 'erfassen';
  function zeige(view) {
    aktuelleAnsicht = view;
    $$('.view').forEach((v) => (v.dataset.active = String(v.id === 'view-' + view)));
    $$('.nav-btn').forEach((b) => (b.dataset.view === view ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
    if (view === 'bilanz') renderBilanz();
    if (view === 'besuche') renderBesuche();
    if (view === 'einstellungen') renderEinstellungen();
    window.scrollTo({ top: 0 });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-view]');
    if (b) zeige(b.dataset.view);
  });

  // ---------- Toast & Rückfrage ----------

  let toastTimer;
  function toast(text) {
    const t = $('#toast');
    t.textContent = text;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 3200);
  }

  function frage(titel, text, ok = 'OK') {
    const d = $('#confirm-dialog');
    $('#confirm-titel').textContent = titel;
    $('#confirm-text').textContent = text;
    $('#confirm-ja').textContent = ok;
    d.showModal();
    return new Promise((resolve) => {
      const fertig = (wert) => {
        $('#confirm-ja').onclick = $('#confirm-nein').onclick = d.oncancel = null;
        d.close();
        resolve(wert);
      };
      $('#confirm-ja').onclick = () => fertig(true);
      $('#confirm-nein').onclick = () => fertig(false);
      d.oncancel = () => fertig(false);
    });
  }

  // ---------- Erfassen: Datum ----------

  const datumFeld = $('#f-datum');
  let autoDatum = FZ.heute();
  datumFeld.value = autoDatum;
  function datumHinweis() {
    $('#f-heute').hidden = datumFeld.value === FZ.heute();
  }
  datumFeld.addEventListener('change', datumHinweis);
  $('#f-heute').addEventListener('click', () => {
    datumFeld.value = autoDatum = FZ.heute();
    datumHinweis();
  });
  // App bleibt am Handy oft tagelang offen: beim Zurückkommen auf heute nachziehen,
  // aber nur wenn das Feld noch das automatisch gesetzte Datum zeigt.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    if (!form.editId && datumFeld.value === autoDatum && autoDatum !== FZ.heute()) {
      datumFeld.value = autoDatum = FZ.heute();
    }
    datumHinweis();
  });

  // ---------- Erfassen: Suche ----------

  const sucheFeld = $('#f-suche');
  let katFilter = '';

  function renderKatChips() {
    $('#kat-chips').innerHTML = KATEGORIEN.map(
      (k) => `<button type="button" class="chip" data-kat="${k.id}" aria-pressed="${katFilter === k.id}">${k.icon} ${esc(k.name)}</button>`,
    ).join('');
  }
  $('#kat-chips').addEventListener('click', (e) => {
    const b = e.target.closest('[data-kat]');
    if (!b) return;
    katFilter = katFilter === b.dataset.kat ? '' : b.dataset.kat;
    renderKatChips();
    renderTreffer();
  });

  function zuletztBesuchteOrte() {
    const ids = [];
    for (const b of [...stand.besuche].sort((a, c) => (a.datum < c.datum ? 1 : -1))) {
      if (b.ortId && !ids.includes(b.ortId)) ids.push(b.ortId);
      if (ids.length >= 5) break;
    }
    return ids.map((id) => stand.orte.find((o) => o.id === id)).filter(Boolean);
  }

  function markiere(name, anfrage) {
    const q = anfrage.trim().toLowerCase();
    const i = q ? name.toLowerCase().indexOf(q) : -1;
    if (i < 0) return esc(name);
    return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) + '</mark>' + esc(name.slice(i + q.length));
  }

  function trefferHtml(o, anfrage) {
    const k = kat(o.kat);
    const ab = Math.min(...o.tickets.map((t) => t.erw));
    return `<li><button type="button" class="result-item" data-ort="${esc(o.id)}" role="option">
      <span class="r-icon" aria-hidden="true">${k.icon}</span>
      <span class="r-text"><strong>${markiere(o.name, anfrage)}</strong><span>${esc(k.name)}${o.gemeinde ? ' · ' + esc(o.gemeinde) : ''}</span></span>
      <span class="muted small">ab ${fmt0(ab)}</span>
    </button></li>`;
  }

  function renderTreffer() {
    const anfrage = sucheFeld.value;
    const liste = $('#result-list');
    let html = '';
    if (anfrage.trim()) {
      let treffer = FZ.sucheOrte(stand.orte, KATEGORIEN, anfrage);
      if (katFilter) treffer = treffer.filter((o) => o.kat === katFilter);
      html = treffer.slice(0, 15).map((o) => trefferHtml(o, anfrage)).join('');
      html += `<li><button type="button" class="result-item neu" data-neu="1">
        <span class="r-icon" aria-hidden="true">＋</span>
        <span class="r-text"><strong>„${esc(anfrage.trim())}“ als neuen Ort anlegen</strong><span>${treffer.length ? 'Nicht dabei?' : 'Kein Treffer in der Liste'}</span></span>
      </button></li>`;
    } else if (katFilter) {
      const orte = stand.orte.filter((o) => o.kat === katFilter).sort((a, b) => a.name.localeCompare(b.name, 'de'));
      html = orte.map((o) => trefferHtml(o, '')).join('');
    } else {
      const zuletzt = zuletztBesuchteOrte();
      if (zuletzt.length) html = '<li class="result-label">Zuletzt besucht</li>' + zuletzt.map((o) => trefferHtml(o, '')).join('');
    }
    liste.innerHTML = html;
  }

  sucheFeld.addEventListener('input', renderTreffer);
  sucheFeld.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const erster = $('#result-list [data-ort]');
      if (erster) erster.click();
    }
  });
  $('#result-list').addEventListener('click', (e) => {
    const b = e.target.closest('.result-item');
    if (!b) return;
    if (b.dataset.neu) {
      oeffneOrtDialog(null, sucheFeld.value.trim(), (o) => waehleOrt(o));
      return;
    }
    const o = stand.orte.find((x) => x.id === b.dataset.ort);
    if (o) waehleOrt(o);
  });

  // ---------- Erfassen: Formular ----------

  const form = { ort: null, ticketId: '', erw: 1, kind: 2, editId: null };
  const preisErwFeld = $('#f-preis-erw');
  const preisKindFeld = $('#f-preis-kind');

  function waehleOrt(o, vorgabe) {
    form.ort = o;
    form.ticketId = vorgabe ? vorgabe.ticketId : o.tickets[0].id;
    form.erw = vorgabe ? vorgabe.erw : stand.einstellungen.personen.erwachsene;
    form.kind = vorgabe ? vorgabe.kind : stand.einstellungen.personen.kinder;
    if (form.erw + form.kind === 0) form.erw = 1;
    const k = kat(o.kat);
    $('#f-ort-icon').textContent = k.icon;
    $('#f-ort-name').textContent = o.name;
    $('#f-ort-sub').textContent = k.name + (o.gemeinde ? ' · ' + o.gemeinde : '');
    renderTicketChips();
    const t = aktuellesTicket();
    preisErwFeld.value = preisText(vorgabe ? vorgabe.preisErw : t.erw);
    preisKindFeld.value = preisText(vorgabe ? vorgabe.preisKind : t.kind);
    renderStepper();
    $('#ticket-form').hidden = false;
    $('#result-list').innerHTML = '';
    sucheFeld.value = '';
    $('#ticket-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function aktuellesTicket() {
    return form.ort.tickets.find((t) => t.id === form.ticketId) || form.ort.tickets[0];
  }

  function renderTicketChips() {
    $('#f-tickets').innerHTML = form.ort.tickets
      .map(
        (t) => `<button type="button" class="chip" data-ticket="${esc(t.id)}" aria-pressed="${t.id === form.ticketId}">
          <span>${esc(t.name)}</span><small>Erw. ${fmt(t.erw)} · Kind ${fmt(t.kind)}</small></button>`,
      )
      .join('');
  }
  $('#f-tickets').addEventListener('click', (e) => {
    const b = e.target.closest('[data-ticket]');
    if (!b) return;
    form.ticketId = b.dataset.ticket;
    const t = aktuellesTicket();
    preisErwFeld.value = preisText(t.erw);
    preisKindFeld.value = preisText(t.kind);
    renderTicketChips();
    renderSumme();
  });

  function renderStepper() {
    $('#f-erw').textContent = form.erw;
    $('#f-kind').textContent = form.kind;
    $('[data-stepper="erw"] [data-step="-1"]').disabled = form.erw <= 0;
    $('[data-stepper="kind"] [data-step="-1"]').disabled = form.kind <= 0;
    $('[data-stepper="erw"] [data-step="1"]').disabled = form.erw >= 20;
    $('[data-stepper="kind"] [data-step="1"]').disabled = form.kind >= 20;
    renderSumme();
  }
  $$('.stepper').forEach((s) =>
    s.addEventListener('click', (e) => {
      const b = e.target.closest('[data-step]');
      if (!b) return;
      const feld = s.dataset.stepper;
      form[feld] = Math.max(0, Math.min(20, form[feld] + Number(b.dataset.step)));
      renderStepper();
    }),
  );
  preisErwFeld.addEventListener('input', renderSumme);
  preisKindFeld.addEventListener('input', renderSumme);

  function formPreise() {
    return { preisErw: FZ.zahl(preisErwFeld.value, 0, 10000), preisKind: FZ.zahl(preisKindFeld.value, 0, 10000) };
  }

  function renderSumme() {
    const { preisErw, preisKind } = formPreise();
    const ok = preisErw !== null && preisKind !== null;
    $('#f-summe').textContent = ok ? fmt(FZ.wertBesuch({ erw: form.erw, kind: form.kind, preisErw, preisKind })) : '–';
    $('#f-speichern').disabled = !ok || form.erw + form.kind === 0;
  }

  function formZuruecksetzen() {
    form.ort = null;
    form.editId = null;
    $('#ticket-form').hidden = true;
    $('#f-abbrechen').hidden = true;
    $('#f-speichern').textContent = 'Besuch speichern';
    $('#h-erfassen').textContent = 'Besuch erfassen';
    datumFeld.value = autoDatum = FZ.heute();
    datumHinweis();
    renderTreffer();
  }
  $('#f-ort-wechseln').addEventListener('click', () => {
    const warEdit = form.editId;
    formZuruecksetzen();
    if (!warEdit) sucheFeld.focus();
  });
  $('#f-abbrechen').addEventListener('click', () => {
    formZuruecksetzen();
    zeige('besuche');
  });

  $('#ticket-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const { preisErw, preisKind } = formPreise();
    if (!form.ort || preisErw === null || preisKind === null || form.erw + form.kind === 0) return;
    if (!FZ.istDatum(datumFeld.value)) {
      toast('Bitte ein gültiges Datum wählen.');
      return;
    }
    const t = aktuellesTicket();
    const besuch = {
      id: form.editId || neueId(),
      datum: datumFeld.value,
      ortId: form.ort.id,
      ortName: form.ort.name,
      kat: form.ort.kat,
      ticket: t.name,
      erw: form.erw,
      kind: form.kind,
      preisErw,
      preisKind,
    };
    const warEdit = !!form.editId;
    if (warEdit) stand.besuche = stand.besuche.map((b) => (b.id === besuch.id ? besuch : b));
    else stand.besuche.push(besuch);

    // Korrigierte Preise für das nächste Mal merken
    const ort = stand.orte.find((o) => o.id === form.ort.id);
    const tk = ort && ort.tickets.find((x) => x.id === t.id);
    if (tk) {
      if (form.erw > 0) tk.erw = preisErw;
      if (form.kind > 0) tk.kind = preisKind;
    }
    speichern();
    const bil = aktuelleBilanz();
    formZuruecksetzen();
    renderZuletzt();
    renderHeader(bil);
    toast(`${warEdit ? 'Geändert' : 'Gespeichert'}: ${fmt(FZ.wertBesuch(besuch))} · Bilanz ${fmtSigned(bil.saldo)}`);
    if (warEdit) zeige('besuche');
  });

  function bearbeiteBesuch(id) {
    const b = stand.besuche.find((x) => x.id === id);
    if (!b) return;
    let ort = stand.orte.find((o) => o.id === b.ortId);
    // Ort gelöscht oder Ticket umbenannt: Ort aus dem Besuch nachbilden
    let ticket = ort && ort.tickets.find((t) => t.name === b.ticket);
    if (!ort || !ticket) {
      ticket = { id: 'besuch', name: b.ticket || 'Ticket', erw: b.preisErw, kind: b.preisKind };
      ort = { id: b.ortId || 'besuch', name: b.ortName, gemeinde: ort ? ort.gemeinde : '', kat: b.kat, tickets: [ticket, ...(ort ? ort.tickets : [])] };
    }
    zeige('erfassen');
    form.editId = b.id;
    datumFeld.value = b.datum;
    datumHinweis();
    waehleOrt(ort, { ticketId: ticket.id, erw: b.erw, kind: b.kind, preisErw: b.preisErw, preisKind: b.preisKind });
    $('#f-abbrechen').hidden = false;
    $('#f-speichern').textContent = 'Änderung speichern';
    $('#h-erfassen').textContent = 'Besuch bearbeiten';
  }

  async function loescheBesuch(id) {
    const b = stand.besuche.find((x) => x.id === id);
    if (!b) return;
    const ok = await frage('Besuch löschen?', `${b.ortName} am ${datumLang(b.datum)} (${fmt(FZ.wertBesuch(b))}) wird gelöscht.`, 'Löschen');
    if (!ok) return;
    stand.besuche = stand.besuche.filter((x) => x.id !== id);
    speichern();
    renderBesuche();
    renderZuletzt();
    renderHeader();
    toast('Besuch gelöscht');
  }

  // ---------- Besuchslisten ----------

  function besuchHtml(b, mitAktionen) {
    const k = kat(b.kat);
    const leute = [b.erw ? `${b.erw} Erw.` : '', b.kind ? `${b.kind} ${b.kind === 1 ? 'Kind' : 'Kinder'}` : ''].filter(Boolean).join(' + ');
    return `<li class="besuch-item">
      <span class="b-icon" aria-hidden="true">${k.icon}</span>
      <span class="b-text"><strong>${esc(b.ortName)}</strong><span>${datumKurz(b.datum)} · ${esc(b.ticket)} · ${leute}</span></span>
      <span class="b-wert">${fmt(FZ.wertBesuch(b))}</span>
      ${
        mitAktionen
          ? `<span class="b-actions">
        <button class="icon-btn" data-edit="${esc(b.id)}" aria-label="Bearbeiten"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>
        <button class="icon-btn" data-del="${esc(b.id)}" aria-label="Löschen"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
      </span>`
          : ''
      }
    </li>`;
  }

  const sortiertNeu = () => [...stand.besuche].sort((a, b) => (a.datum < b.datum ? 1 : a.datum > b.datum ? -1 : 0));

  function renderZuletzt() {
    const liste = sortiertNeu().slice(0, 4);
    $('#zuletzt-list').innerHTML = liste.length
      ? liste.map((b) => besuchHtml(b, false)).join('')
      : '<li class="leer">Noch nichts erfasst – such oben nach deinem ersten Ausflug.</li>';
  }

  function renderBesuche() {
    const liste = sortiertNeu();
    $('#besuche-leer').hidden = liste.length > 0;
    const gruppen = new Map();
    for (const b of liste) {
      const m = b.datum.slice(0, 7);
      if (!gruppen.has(m)) gruppen.set(m, []);
      gruppen.get(m).push(b);
    }
    $('#besuche-gruppen').innerHTML = [...gruppen.entries()]
      .map(([m, bs]) => {
        const summe = bs.reduce((s, b) => s + FZ.wertBesuch(b), 0);
        return `<div class="monat-head"><span>${monatName(m)}</span><span class="num">${bs.length} × · ${fmt(summe)}</span></div>
          <div class="card"><ul class="besuch-list">${bs.map((b) => besuchHtml(b, true)).join('')}</ul></div>`;
      })
      .join('');
  }
  $('#besuche-gruppen').addEventListener('click', (e) => {
    const ed = e.target.closest('[data-edit]');
    if (ed) return bearbeiteBesuch(ed.dataset.edit);
    const del = e.target.closest('[data-del]');
    if (del) loescheBesuch(del.dataset.del);
  });

  // ---------- Bilanz ----------

  const aktuelleBilanz = () => FZ.berechneBilanz(stand.besuche, stand.einstellungen, KATEGORIEN);

  function renderHeader(bil = aktuelleBilanz()) {
    const p = $('#header-saldo');
    p.textContent = fmtSigned(bil.saldo);
    p.className = 'saldo-pill ' + (bil.saldo >= 0 ? 'plus' : 'minus');
    p.title = 'Bilanz: Wert der Einzeltickets minus Freizeitticket-Preis';
  }

  const ICON_OK =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  const ICON_WEG =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';

  function renderBilanz() {
    const bil = aktuelleBilanz();
    const { personen, zeitraum } = stand.einstellungen;
    renderHeader(bil);

    const zt = zeitraum.von || zeitraum.bis
      ? `Zeitraum: ${zeitraum.von ? datumKurz(zeitraum.von) + ' ' + zeitraum.von.slice(0, 4) : 'Anfang'} – ${zeitraum.bis ? datumKurz(zeitraum.bis) + ' ' + zeitraum.bis.slice(0, 4) : 'offen'}`
      : 'Zeitraum: alle Besuche (in den Einstellungen änderbar)';
    $('#b-zeitraum').textContent = `${zt} · ${bil.anzahl} ${bil.anzahl === 1 ? 'Besuch' : 'Besuche'}`;

    // Hero
    const plus = bil.saldo >= 0 && bil.kosten > 0;
    const status = $('#b-status');
    status.className = 'hero-status ' + (plus ? 'plus' : 'minus');
    status.innerHTML = plus ? `${ICON_OK} Hat sich rentiert` : `${ICON_WEG} Noch nicht rentiert`;
    const zahl = $('#b-saldo');
    zahl.className = 'hero-zahl ' + (plus ? 'plus' : '');
    zahl.textContent = plus ? fmtSigned(bil.saldo) : fmt(bil.rest);
    $('#b-saldo-sub').textContent = plus
      ? bil.gewinnAb
        ? `gespart – in der Gewinnzone seit ${datumLang(bil.gewinnAb)}`
        : 'gespart gegenüber Einzeltickets'
      : bil.kosten > 0
        ? 'fehlen noch bis zum Ticketpreis'
        : 'Trag in den Einstellungen den Ticketpreis ein';
    const anteil = bil.kosten > 0 ? bil.wert / bil.kosten : 0;
    const maxSkala = Math.max(1, anteil);
    $('#b-meter-fill').style.width = (anteil / maxSkala) * 100 + '%';
    $('#b-meter-fill').className = 'meter-fill' + (plus ? ' plus' : '');
    $('.meter-mark').style.left = (1 / maxSkala) * 100 + '%';
    $('#b-meter').setAttribute('aria-label', `${prozent(anteil)} des Ticketpreises durch Besuche abgedeckt`);
    $('#b-quote').innerHTML = bil.kosten > 0 ? `<strong>${prozent(anteil)}</strong> des Ticketpreises sind durch Besuche abgedeckt` : '';

    // Vergleich
    $('#b-kosten').textContent = fmt(bil.kosten);
    $('#b-kosten-zeilen').innerHTML = [
      personen.erwachsene ? `<li><span>${personen.erwachsene} × Erwachsene à ${fmt(personen.preisErw)}</span><span>${fmt(bil.kostenErw)}</span></li>` : '',
      personen.kinder ? `<li><span>${personen.kinder} × Kind à ${fmt(personen.preisKind)}</span><span>${fmt(bil.kostenKind)}</span></li>` : '',
    ].join('');
    $('#b-wert').textContent = fmt(bil.wert);
    $('#b-wert-zeilen').innerHTML = `<li><span>${bil.ticketsErw} Erwachsenen-Tickets</span><span>${fmt(bil.wertErw)}</span></li>
      <li><span>${bil.ticketsKind} Kinder-Tickets</span><span>${fmt(bil.wertKind)}</span></li>`;

    // Pro Ticket
    const personBar = (titel, wert, kosten, anzahlKarten) => {
      if (!anzahlKarten) return '';
      const q = kosten > 0 ? wert / kosten : 0;
      const skala = Math.max(1, q);
      const ok = q >= 1;
      return `<div class="person-bar">
        <div class="person-bar-head"><span>${titel}</span><strong class="${ok ? 'plus-text' : ''}">${prozent(q)}</strong></div>
        <div class="bar-track"><div class="bar-fill ${ok ? 'plus' : ''}" style="width:${(q / skala) * 100}%"></div><div class="bar-ziel" style="left:${(1 / skala) * 100}%"></div></div>
        <div class="person-bar-sub">${fmt(wert)} von ${fmt(kosten)} · ${ok ? '✓ ' + fmtSigned(wert - kosten) + ' gespart' : 'noch ' + fmt(kosten - wert)}</div>
      </div>`;
    };
    $('#b-personen').innerHTML =
      personBar(`🧑 Erwachsenen-Ticket${personen.erwachsene > 1 ? 's' : ''}`, bil.wertErw, bil.kostenErw, personen.erwachsene) +
        personBar(`🧒 Kinder-Ticket${personen.kinder > 1 ? 's' : ''}`, bil.wertKind, bil.kostenKind, personen.kinder) ||
      '<p class="muted">Keine Freizeittickets eingetragen.</p>';

    // Kennzahlen
    $('#b-kennzahlen').innerHTML = [
      ['Besuche', String(bil.anzahl), `${bil.ticketsErw + bil.ticketsKind} Tickets`],
      ['Ø pro Besuch', bil.anzahl ? fmt0(bil.schnitt) : '–', 'Wert'],
      bil.rest > 0
        ? ['Noch nötig', bil.nochBesuche ? '≈ ' + bil.nochBesuche : '–', bil.nochBesuche ? 'Besuche à Ø' : 'Besuche']
        : ['Ersparnis', bil.kosten > 0 ? prozent(bil.saldo / bil.kosten) : '–', 'vom Ticketpreis'],
    ]
      .map(([l, w, s]) => `<div class="kennzahl"><div class="k-label">${l}</div><div class="k-wert">${w}</div><div class="k-sub">${s}</div></div>`)
      .join('');

    // Kategorien
    const maxKat = Math.max(1, ...bil.nachKategorie.map((k) => k.wert));
    $('#b-kategorien').innerHTML = bil.nachKategorie.length
      ? bil.nachKategorie
          .map(
            (k) => `<div class="bar-row" title="${esc(k.name)}: ${fmt(k.wert)} aus ${k.besuche} Besuchen">
          <span class="bar-label"><span aria-hidden="true">${k.icon}</span><span>${esc(k.name)}</span></span>
          <span class="bar-track"><span class="bar-fill" style="display:block;width:${(k.wert / maxKat) * 100}%;background:var(--kat-${k.id})"></span></span>
          <span class="bar-wert">${fmt0(k.wert)}<small>${k.besuche} ×</small></span>
        </div>`,
          )
          .join('')
      : '<p class="muted">Noch keine Besuche.</p>';

    // Top-Orte
    $('#b-orte').innerHTML = bil.nachOrt.length
      ? bil.nachOrt
          .slice(0, 8)
          .map(
            (o) => `<li><span class="kat-dot" style="background:var(--kat-${o.kat})" aria-hidden="true"></span>
          <span class="t-name"><strong>${esc(o.name)}</strong><span>${kat(o.kat).name} · ${o.besuche} ${o.besuche === 1 ? 'Besuch' : 'Besuche'}</span></span>
          <span class="t-wert">${fmt(o.wert)}</span></li>`,
          )
          .join('')
      : '<li class="muted" style="counter-increment:none">Noch keine Besuche.</li>';

    renderVerlauf(bil);
  }

  function schoeneSchritte(max) {
    const roh = max / 4;
    const p = Math.pow(10, Math.floor(Math.log10(roh)));
    const f = roh / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  }

  function renderVerlauf(bil) {
    const box = $('#b-verlauf');
    const tip = $('#chart-tooltip');
    if (!bil.verlauf.length) {
      box.innerHTML = '<div class="leer">Sobald du Besuche erfasst, siehst du hier, wann sich das Ticket rentiert.</div>';
      return;
    }
    const { zeitraum } = stand.einstellungen;
    const tag = 86400000;
    const startS = zeitraum.von && zeitraum.von < bil.verlauf[0].datum ? zeitraum.von : bil.verlauf[0].datum;
    const letzte = bil.verlauf[bil.verlauf.length - 1].datum;
    let endeS = FZ.heute() > letzte ? FZ.heute() : letzte;
    if (zeitraum.bis && zeitraum.bis < endeS) endeS = zeitraum.bis < letzte ? letzte : zeitraum.bis;
    const t0 = alsDatum(startS).getTime();
    let t1 = alsDatum(endeS).getTime();
    if (t1 - t0 < 14 * tag) t1 = t0 + 14 * tag;

    // In echten Pixeln zeichnen, damit die Schrift am Handy nicht mitschrumpft
    const W = Math.max(280, Math.round(box.clientWidth || 600));
    const H = W < 500 ? 210 : 250;
    const L = 46, R = 8, T = 20, B = 26;
    const yMax0 = Math.max(bil.kosten, bil.wert, 1) * 1.08;
    const schritt = schoeneSchritte(yMax0);
    const yMax = Math.ceil(yMax0 / schritt) * schritt;
    const x = (t) => L + ((t - t0) / (t1 - t0)) * (W - L - R);
    const y = (v) => T + (1 - v / yMax) * (H - T - B);

    let grid = '';
    for (let v = 0; v <= yMax + 0.001; v += schritt) {
      grid += `<line class="gitter" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="achse" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${fmt0(v).replace(/\s?€/, '')}</text>`;
    }
    // Monatsbeschriftung (max. ~6)
    const monate = [];
    const d = alsDatum(startS);
    d.setDate(1);
    d.setMonth(d.getMonth() + 1);
    while (d.getTime() <= t1) {
      monate.push(new Date(d));
      d.setMonth(d.getMonth() + 1);
    }
    const jede = Math.max(1, Math.ceil(monate.length / 6));
    const xLabels = monate
      .filter((_, i) => i % jede === 0)
      .map((m) => `<text class="achse" x="${x(m.getTime())}" y="${H - 8}" text-anchor="middle">${m.toLocaleDateString('de-AT', { month: 'short' })}</text>`)
      .join('');

    // Treppenlinie: Wert springt am Besuchstag
    let pfad = `M${x(t0)},${y(0)}`;
    let vorher = 0;
    for (const p of bil.verlauf) {
      const px = x(alsDatum(p.datum).getTime());
      pfad += ` L${px},${y(vorher)} L${px},${y(p.summe)}`;
      vorher = p.summe;
    }
    const xEnde = x(t1);
    pfad += ` L${xEnde},${y(vorher)}`;
    const flaeche = pfad + ` L${xEnde},${y(0)} Z`;
    const punkte = bil.verlauf.map((p) => `<circle class="punkt" cx="${x(alsDatum(p.datum).getTime())}" cy="${y(p.summe)}" r="4"/>`).join('');
    const ziel =
      bil.kosten > 0
        ? `<line class="ziel" x1="${L}" x2="${W - R}" y1="${y(bil.kosten)}" y2="${y(bil.kosten)}"/>
           <text class="ziel-text" x="${L + 6}" y="${y(bil.kosten) - 6}">Ticketpreis ${fmt0(bil.kosten)}</text>`
        : '';

    box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gesammelter Wert über die Zeit: ${fmt(bil.wert)} von ${fmt(bil.kosten)}">
      ${grid}${xLabels}
      <path class="flaeche" d="${flaeche}"/>
      <path class="linie" d="${pfad}"/>
      ${ziel}${punkte}
      <line class="cross" id="v-cross" x1="0" x2="0" y1="${T}" y2="${H - B}" visibility="hidden"/>
      <rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent" id="v-hit"/>
    </svg>`;

    const svg = $('svg', box);
    const cross = $('#v-cross', box);
    const zeigeTip = (clientX, clientY) => {
      const r = svg.getBoundingClientRect();
      const vx = ((clientX - r.left) / r.width) * W;
      const t = t0 + ((vx - L) / (W - L - R)) * (t1 - t0);
      const tagS = FZ.heute(new Date(t));
      let punkt = null;
      let besuchHeute = null;
      for (const p of bil.verlauf) {
        if (p.datum <= tagS) punkt = p;
        if (p.datum === tagS) besuchHeute = p;
      }
      const summe = punkt ? punkt.summe : 0;
      cross.setAttribute('x1', vx);
      cross.setAttribute('x2', vx);
      cross.setAttribute('visibility', 'visible');
      tip.innerHTML = `<strong>${datumLang(tagS)}</strong><br>${fmt(summe)} gesammelt${besuchHeute ? ' · Besuchstag' : ''}${
        bil.kosten > 0 ? `<br>${summe >= bil.kosten ? '✓ ' + fmtSigned(summe - bil.kosten) : 'noch ' + fmt(bil.kosten - summe)}` : ''
      }`;
      tip.hidden = false;
      const tx = Math.min(window.innerWidth - tip.offsetWidth - 8, clientX + 12);
      tip.style.left = Math.max(8, tx) + 'px';
      tip.style.top = Math.max(8, clientY - tip.offsetHeight - 12) + 'px';
    };
    const versteck = () => {
      tip.hidden = true;
      cross.setAttribute('visibility', 'hidden');
    };
    const hit = $('#v-hit', box);
    hit.addEventListener('pointermove', (e) => zeigeTip(e.clientX, e.clientY));
    hit.addEventListener('pointerdown', (e) => zeigeTip(e.clientX, e.clientY));
    hit.addEventListener('pointerleave', versteck);
  }
  window.addEventListener('scroll', () => ($('#chart-tooltip').hidden = true), { passive: true });
  let groesseTimer;
  window.addEventListener('resize', () => {
    clearTimeout(groesseTimer);
    groesseTimer = setTimeout(() => aktuelleAnsicht === 'bilanz' && renderVerlauf(aktuelleBilanz()), 150);
  });

  // ---------- Einstellungen ----------

  function renderEinstellungen() {
    const { personen, zeitraum, theme } = stand.einstellungen;
    $('#s-tarif').innerHTML =
      TARIFE.map((t) => `<option value="${t.id}">${esc(t.name)} – ${fmt0(t.erwachsen)} / ${fmt0(t.kind)}</option>`).join('') +
      '<option value="eigen">Eigene Preise</option>';
    $('#s-tarif').value = TARIFE.some((t) => t.id === personen.tarif) ? personen.tarif : 'eigen';
    $('#s-erw').value = personen.erwachsene;
    $('#s-kind').value = personen.kinder;
    $('#s-preis-erw').value = preisText(personen.preisErw);
    $('#s-preis-kind').value = preisText(personen.preisKind);
    $('#s-von').value = zeitraum.von;
    $('#s-bis').value = zeitraum.bis;
    $('#s-theme').value = theme;
    kostenHinweis();
    renderOrteListe();
  }

  function kostenHinweis() {
    const p = stand.einstellungen.personen;
    $('#s-kosten-hint').textContent = `Gesamt: ${fmt(p.erwachsene * p.preisErw + p.kinder * p.preisKind)}. Familienpreis gilt für Kinder zusammen mit der Erwachsenenkarte eines Elternteils.`;
  }

  $('#s-tarif').addEventListener('change', (e) => {
    const t = TARIFE.find((x) => x.id === e.target.value);
    const p = stand.einstellungen.personen;
    p.tarif = e.target.value;
    if (t) {
      p.preisErw = t.erwachsen;
      p.preisKind = t.kind;
      $('#s-preis-erw').value = preisText(t.erwachsen);
      $('#s-preis-kind').value = preisText(t.kind);
    }
    speichern();
    kostenHinweis();
    renderHeader();
  });

  function personenAusFeldern() {
    const p = stand.einstellungen.personen;
    const erw = FZ.zahl($('#s-erw').value, 0, 10);
    const kind = FZ.zahl($('#s-kind').value, 0, 10);
    const pe = FZ.zahl($('#s-preis-erw').value, 0, 10000);
    const pk = FZ.zahl($('#s-preis-kind').value, 0, 10000);
    if (erw !== null) p.erwachsene = Math.round(erw);
    if (kind !== null) p.kinder = Math.round(kind);
    const preisGeaendert = (pe !== null && pe !== p.preisErw) || (pk !== null && pk !== p.preisKind);
    if (pe !== null) p.preisErw = pe;
    if (pk !== null) p.preisKind = pk;
    if (preisGeaendert) {
      p.tarif = 'eigen';
      $('#s-tarif').value = 'eigen';
    }
    speichern();
    kostenHinweis();
    renderHeader();
  }
  ['#s-erw', '#s-kind', '#s-preis-erw', '#s-preis-kind'].forEach((s) => $(s).addEventListener('change', personenAusFeldern));

  ['#s-von', '#s-bis'].forEach((s) =>
    $(s).addEventListener('change', () => {
      const z = stand.einstellungen.zeitraum;
      z.von = FZ.istDatum($('#s-von').value) ? $('#s-von').value : '';
      z.bis = FZ.istDatum($('#s-bis').value) ? $('#s-bis').value : '';
      if (z.von && z.bis && z.bis < z.von) {
        toast('„Bis“ liegt vor „Von“ – bitte prüfen.');
      }
      speichern();
      renderHeader();
    }),
  );

  function wendeThemeAn() {
    document.documentElement.dataset.theme = stand.einstellungen.theme;
  }
  $('#s-theme').addEventListener('change', (e) => {
    stand.einstellungen.theme = e.target.value;
    wendeThemeAn();
    speichern();
  });

  function renderOrteListe() {
    const f = $('#s-ort-filter').value;
    const orte = f.trim() ? FZ.sucheOrte(stand.orte, KATEGORIEN, f) : [...stand.orte].sort((a, b) => a.kat.localeCompare(b.kat) || a.name.localeCompare(b.name, 'de'));
    $('#s-orte').innerHTML = orte
      .map((o) => {
        const k = kat(o.kat);
        return `<li><button type="button" data-ort-edit="${esc(o.id)}">
          <span aria-hidden="true">${k.icon}</span>
          <span class="o-name"><strong>${esc(o.name)}</strong><span>${o.tickets.length} ${o.tickets.length === 1 ? 'Ticket' : 'Tickets'} · ab ${fmt(Math.min(...o.tickets.map((t) => t.erw)))}${o.gemeinde ? ' · ' + esc(o.gemeinde) : ''}</span></span>
          ${o.eigen ? '<span class="badge">eigen</span>' : ''}
        </button></li>`;
      })
      .join('');
  }
  $('#s-ort-filter').addEventListener('input', renderOrteListe);
  $('#s-orte').addEventListener('click', (e) => {
    const b = e.target.closest('[data-ort-edit]');
    if (b) oeffneOrtDialog(stand.orte.find((o) => o.id === b.dataset.ortEdit));
  });
  $('#s-ort-neu').addEventListener('click', () => oeffneOrtDialog(null, ''));

  // ---------- Ort-Dialog ----------

  const ortDialog = $('#ort-dialog');
  let ortDialogZiel = null;
  let ortDialogFertig = null;

  function ticketZeile(t) {
    return `<div class="o-ticket-row" data-tid="${esc(t.id)}">
      <input type="text" value="${esc(t.name)}" maxlength="80" placeholder="z. B. Tageskarte" aria-label="Ticketname">
      <input type="text" inputmode="decimal" value="${preisText(t.erw)}" aria-label="Preis Erwachsene">
      <input type="text" inputmode="decimal" value="${preisText(t.kind)}" aria-label="Preis Kind">
      <button type="button" class="icon-btn" data-ticket-weg aria-label="Ticket entfernen">✕</button>
    </div>`;
  }

  function oeffneOrtDialog(ort, name = '', fertig = null) {
    ortDialogZiel = ort || null;
    ortDialogFertig = fertig;
    $('#ort-dialog-titel').textContent = ort ? 'Ort bearbeiten' : 'Neuer Ort';
    $('#o-name').value = ort ? ort.name : name;
    $('#o-gemeinde').value = ort ? ort.gemeinde : '';
    $('#o-kat').innerHTML = KATEGORIEN.map((k) => `<option value="${k.id}">${k.icon} ${esc(k.name)}</option>`).join('');
    $('#o-kat').value = ort ? ort.kat : katFilter || 'sonstiges';
    const tickets = ort ? ort.tickets : [{ id: 'eintritt', name: 'Eintritt', erw: 0, kind: 0 }];
    $('#o-tickets').innerHTML = tickets.map(ticketZeile).join('');
    $('#o-loeschen').hidden = !ort;
    ortDialog.showModal();
    if (!ort && name) $('#o-gemeinde').focus();
  }

  $('#o-ticket-neu').addEventListener('click', () => {
    $('#o-tickets').insertAdjacentHTML('beforeend', ticketZeile({ id: neueId('t-'), name: '', erw: 0, kind: 0 }));
    $('#o-tickets .o-ticket-row:last-child input').focus();
  });
  $('#o-tickets').addEventListener('click', (e) => {
    const b = e.target.closest('[data-ticket-weg]');
    if (!b) return;
    if ($$('#o-tickets .o-ticket-row').length <= 1) {
      toast('Ein Ort braucht mindestens ein Ticket.');
      return;
    }
    b.closest('.o-ticket-row').remove();
  });
  $$('[data-close]', ortDialog).forEach((b) => b.addEventListener('click', () => ortDialog.close()));

  $('#ort-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#o-name').value.trim();
    if (!name) return;
    const tickets = [];
    for (const row of $$('#o-tickets .o-ticket-row')) {
      const [n, pe, pk] = $$('input', row);
      const erw = FZ.zahl(pe.value, 0, 10000);
      const kind = FZ.zahl(pk.value, 0, 10000);
      if (!n.value.trim()) continue;
      if (erw === null || kind === null) {
        toast('Bitte gültige Preise eingeben (z. B. 12,50).');
        return;
      }
      tickets.push({ id: row.dataset.tid, name: n.value.trim().slice(0, 80), erw, kind });
    }
    if (!tickets.length) {
      toast('Bitte mindestens ein Ticket mit Namen angeben.');
      return;
    }
    const daten = { name: name.slice(0, 80), gemeinde: $('#o-gemeinde').value.trim().slice(0, 80), kat: $('#o-kat').value, tickets };
    let ort;
    if (ortDialogZiel) {
      ort = Object.assign(ortDialogZiel, daten);
    } else {
      ort = { id: neueId('eigen-'), eigen: true, ...daten };
      stand.orte.push(ort);
    }
    speichern();
    ortDialog.close();
    renderOrteListe();
    toast(ortDialogZiel ? 'Ort gespeichert' : `„${ort.name}“ angelegt`);
    if (ortDialogFertig) ortDialogFertig(ort);
  });

  $('#o-loeschen').addEventListener('click', async () => {
    const ort = ortDialogZiel;
    if (!ort) return;
    ortDialog.close();
    const ok = await frage('Ort löschen?', `„${ort.name}“ wird aus der Liste entfernt. Bereits erfasste Besuche bleiben erhalten.`, 'Löschen');
    if (!ok) return;
    stand.orte = stand.orte.filter((o) => o !== ort);
    speichern();
    renderOrteListe();
    toast('Ort gelöscht');
  });

  // ---------- Backup ----------

  $('#s-export').addEventListener('click', async () => {
    const json = JSON.stringify({ app: 'freizeitbilanz', exportiert: new Date().toISOString(), ...stand }, null, 2);
    const name = `freizeitbilanz-${FZ.heute()}.json`;
    const datei = new File([json], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [datei] })) {
      try {
        await navigator.share({ files: [datei], title: 'Freizeitbilanz-Backup' });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    const url = URL.createObjectURL(datei);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  $('#s-import').addEventListener('click', () => $('#s-import-datei').click());
  $('#s-import-datei').addEventListener('change', async (e) => {
    const datei = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!datei) return;
    if (datei.size > 5 * 1024 * 1024) {
      toast('Datei ist zu groß für ein Backup.');
      return;
    }
    let roh;
    try {
      roh = JSON.parse(await datei.text());
    } catch {
      toast('Keine gültige Backup-Datei.');
      return;
    }
    const neu = FZ.pruefeStand(roh, VORGABE, KATEGORIEN);
    if (!Array.isArray(roh && roh.orte) || !neu.orte.length) neu.orte = stand.orte;
    const ok = await frage(
      'Backup importieren?',
      `${neu.besuche.length} Besuche und ${neu.orte.length} Orte ersetzen den aktuellen Stand (${stand.besuche.length} Besuche).`,
      'Importieren',
    );
    if (!ok) return;
    stand = neu;
    speichern();
    wendeThemeAn();
    alleNeuZeichnen();
    toast('Backup importiert');
  });

  // ---------- Zurücksetzen ----------

  $('#s-orte-reset').addEventListener('click', async () => {
    const ok = await frage('Orte-Vorlage wiederherstellen?', 'Orte und Preise werden auf die Vorlage zurückgesetzt, eigene Orte bleiben erhalten. Besuche bleiben unverändert.', 'Wiederherstellen');
    if (!ok) return;
    stand.orte = [...kopie(ORTE), ...stand.orte.filter((o) => o.eigen)];
    speichern();
    renderOrteListe();
    toast('Vorlage wiederhergestellt');
  });

  $('#s-alles-reset').addEventListener('click', async () => {
    const ok = await frage('Alle Daten löschen?', 'Alle Besuche, eigenen Orte und Einstellungen werden gelöscht. Vorher ein Backup exportieren!', 'Alles löschen');
    if (!ok) return;
    stand = FZ.pruefeStand(null, VORGABE, KATEGORIEN);
    stand.orte = kopie(ORTE);
    speichern();
    wendeThemeAn();
    alleNeuZeichnen();
    toast('Alle Daten gelöscht');
  });

  // ---------- Installation & Offline ----------

  let installEvent = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installEvent = e;
    $('#s-install').hidden = false;
  });
  $('#s-install').addEventListener('click', async () => {
    if (!installEvent) return;
    installEvent.prompt();
    await installEvent.userChoice;
    installEvent = null;
    $('#s-install').hidden = true;
  });
  window.addEventListener('appinstalled', () => {
    $('#s-install').hidden = true;
    $('#s-install-hint').textContent = 'Die App ist installiert. 🎉';
  });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }

  // Andere Tabs mit derselben App: Stand übernehmen statt überschreiben
  window.addEventListener('storage', (e) => {
    if (e.key !== SPEICHER) return;
    stand = laden();
    wendeThemeAn();
    alleNeuZeichnen();
  });

  function alleNeuZeichnen() {
    formZuruecksetzen();
    renderKatChips();
    renderZuletzt();
    renderHeader();
    if (aktuelleAnsicht !== 'erfassen') zeige(aktuelleAnsicht);
  }

  // ---------- Start ----------

  wendeThemeAn();
  renderKatChips();
  renderTreffer();
  renderZuletzt();
  renderHeader();
  datumHinweis();
})();
