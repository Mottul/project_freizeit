/* Reine Logik ohne DOM: Suche, Datum, Bilanz, Prüfung importierter Daten.
 * Läuft im Browser (window.FZ) und in Node (Tests: node --test). */
(function (root) {
  'use strict';

  const runde = (n) => Math.round(n * 100) / 100;

  function zahl(v, min = 0, max = 100000) {
    const n = typeof v === 'string' ? Number(v.replace(',', '.')) : Number(v);
    if (!Number.isFinite(n)) return null;
    return Math.min(max, Math.max(min, n));
  }

  /** Heutiges Datum als JJJJ-MM-TT in der Ortszeit (nicht UTC – sonst kurz nach Mitternacht falsch). */
  function heute(d = new Date()) {
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;
  const istDatum = (s) => typeof s === 'string' && DATUM_RE.test(s) && !Number.isNaN(Date.parse(s));

  /** Für die Suche: klein, ohne Akzente, ß→ss, Umlaute auch als ae/oe/ue findbar. */
  function normalisiere(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  /** Durchsucht Orte nach Name, Gemeinde, Kategorie und Ticketnamen. Alle Wörter müssen passen. */
  function sucheOrte(orte, kategorien, anfrage) {
    const woerter = normalisiere(anfrage).split(' ').filter(Boolean);
    if (!woerter.length) return [];
    const katName = new Map(kategorien.map((k) => [k.id, k.name]));
    const treffer = [];
    for (const o of orte) {
      const name = normalisiere(o.name);
      const text = [name, normalisiere(o.gemeinde), normalisiere(katName.get(o.kat)), ...o.tickets.map((t) => normalisiere(t.name))].join(' ');
      if (!woerter.every((w) => text.includes(w))) continue;
      // Rang: Name beginnt mit Anfrage < Wortanfang im Namen < irgendwo
      let rang = 3;
      if (name.startsWith(woerter[0])) rang = 0;
      else if ((' ' + name).includes(' ' + woerter[0])) rang = 1;
      else if (name.includes(woerter[0])) rang = 2;
      treffer.push({ o, rang });
    }
    treffer.sort((a, b) => a.rang - b.rang || a.o.name.localeCompare(b.o.name, 'de'));
    return treffer.map((x) => x.o);
  }

  function wertBesuch(b) {
    return runde(b.erw * b.preisErw + b.kind * b.preisKind);
  }

  function imZeitraum(datum, zeitraum) {
    if (zeitraum.von && datum < zeitraum.von) return false;
    if (zeitraum.bis && datum > zeitraum.bis) return false;
    return true;
  }

  /**
   * Bilanz: Wert der Einzeltickets (was ohne Freizeitticket bezahlt worden wäre)
   * gegen die Kosten der Freizeittickets.
   */
  function berechneBilanz(besuche, einstellungen, kategorien) {
    const { personen, zeitraum } = einstellungen;
    const liste = besuche.filter((b) => imZeitraum(b.datum, zeitraum)).sort((a, b) => (a.datum < b.datum ? -1 : a.datum > b.datum ? 1 : 0));

    const kostenErw = runde(personen.erwachsene * personen.preisErw);
    const kostenKind = runde(personen.kinder * personen.preisKind);
    const kosten = runde(kostenErw + kostenKind);

    let wertErw = 0;
    let wertKind = 0;
    let ticketsErw = 0;
    let ticketsKind = 0;
    const proKat = new Map();
    const proOrt = new Map();
    const verlauf = [];
    for (const b of liste) {
      const we = b.erw * b.preisErw;
      const wk = b.kind * b.preisKind;
      wertErw += we;
      wertKind += wk;
      ticketsErw += b.erw;
      ticketsKind += b.kind;

      const k = proKat.get(b.kat) || { wert: 0, besuche: 0 };
      k.wert += we + wk;
      k.besuche += 1;
      proKat.set(b.kat, k);

      const key = b.ortId || 'name:' + b.ortName;
      const o = proOrt.get(key) || { name: b.ortName, kat: b.kat, wert: 0, besuche: 0 };
      o.wert += we + wk;
      o.besuche += 1;
      proOrt.set(key, o);

      const letzter = verlauf[verlauf.length - 1];
      const summe = runde((letzter ? letzter.summe : 0) + we + wk);
      if (letzter && letzter.datum === b.datum) letzter.summe = summe;
      else verlauf.push({ datum: b.datum, summe });
    }
    wertErw = runde(wertErw);
    wertKind = runde(wertKind);
    const wert = runde(wertErw + wertKind);
    const saldo = runde(wert - kosten);
    const anzahl = liste.length;
    const schnitt = anzahl ? runde(wert / anzahl) : 0;
    const rest = Math.max(0, runde(kosten - wert));

    const katInfo = new Map(kategorien.map((k) => [k.id, k]));
    const nachKategorie = [...proKat.entries()]
      .map(([id, v]) => ({ id, name: (katInfo.get(id) || {}).name || id, icon: (katInfo.get(id) || {}).icon || '', wert: runde(v.wert), besuche: v.besuche }))
      .sort((a, b) => b.wert - a.wert);
    const nachOrt = [...proOrt.values()].map((v) => ({ ...v, wert: runde(v.wert) })).sort((a, b) => b.wert - a.wert || b.besuche - a.besuche);

    let gewinnAb = null;
    if (kosten > 0) {
      const p = verlauf.find((v) => v.summe >= kosten);
      if (p) gewinnAb = p.datum;
    }

    return {
      anzahl,
      kosten,
      kostenErw,
      kostenKind,
      wert,
      wertErw,
      wertKind,
      ticketsErw,
      ticketsKind,
      saldo,
      quote: kosten > 0 ? wert / kosten : 0,
      quoteErw: kostenErw > 0 ? wertErw / kostenErw : 0,
      quoteKind: kostenKind > 0 ? wertKind / kostenKind : 0,
      schnitt,
      rest,
      nochBesuche: rest > 0 && schnitt > 0 ? Math.ceil(rest / schnitt) : 0,
      gewinnAb,
      nachKategorie,
      nachOrt,
      verlauf,
    };
  }

  // ---------- Prüfung gespeicherter / importierter Daten ----------

  const hat = (o, k) => o !== null && typeof o === 'object' && Object.prototype.hasOwnProperty.call(o, k);
  const text = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const ID_RE = /^[a-z0-9_-]{1,64}$/i;

  function pruefeTicket(t) {
    if (!t || typeof t !== 'object') return null;
    const name = text(t.name, 80);
    const erw = zahl(t.erw, 0, 10000);
    const kind = zahl(t.kind, 0, 10000);
    const id = typeof t.id === 'string' && ID_RE.test(t.id) ? t.id : null;
    if (!name || !id || erw === null || kind === null) return null;
    return { id, name, erw, kind };
  }

  function pruefeOrt(o, katIds) {
    if (!o || typeof o !== 'object') return null;
    const id = typeof o.id === 'string' && ID_RE.test(o.id) ? o.id : null;
    const name = text(o.name, 80);
    if (!id || !name) return null;
    const tickets = Array.isArray(o.tickets) ? o.tickets.slice(0, 30).map(pruefeTicket).filter(Boolean) : [];
    if (!tickets.length) return null;
    const link = typeof o.link === 'string' && /^https:\/\/www\.freizeitticket\.at\/[\w\-./]*$/.test(o.link) ? o.link : '';
    const ort = {
      id,
      name,
      gemeinde: text(o.gemeinde, 80),
      kat: katIds.has(o.kat) ? o.kat : 'sonstiges',
      tickets,
      hinweis: text(o.hinweis, 300),
      link,
    };
    if (o.eigen === true) ort.eigen = true;
    else if (o.bearbeitet === true) ort.bearbeitet = true;
    return ort;
  }

  function pruefeBesuch(b, katIds) {
    if (!b || typeof b !== 'object') return null;
    const id = typeof b.id === 'string' && ID_RE.test(b.id) ? b.id : null;
    const ortName = text(b.ortName, 80);
    const erw = zahl(b.erw, 0, 50);
    const kind = zahl(b.kind, 0, 50);
    const preisErw = zahl(b.preisErw, 0, 10000);
    const preisKind = zahl(b.preisKind, 0, 10000);
    if (!id || !ortName || !istDatum(b.datum) || [erw, kind, preisErw, preisKind].includes(null)) return null;
    if (erw + kind === 0) return null;
    return {
      id,
      datum: b.datum,
      ortId: typeof b.ortId === 'string' && ID_RE.test(b.ortId) ? b.ortId : '',
      ortName,
      kat: katIds.has(b.kat) ? b.kat : 'sonstiges',
      ticket: text(b.ticket, 80),
      erw: Math.round(erw),
      kind: Math.round(kind),
      preisErw,
      preisKind,
    };
  }

  function pruefeEinstellungen(e, vorgabe) {
    const s = JSON.parse(JSON.stringify(vorgabe));
    if (!e || typeof e !== 'object') return s;
    if (hat(e, 'personen') && e.personen && typeof e.personen === 'object') {
      const p = e.personen;
      const erwachsene = zahl(p.erwachsene, 0, 10);
      const kinder = zahl(p.kinder, 0, 10);
      const preisErw = zahl(p.preisErw, 0, 10000);
      const preisKind = zahl(p.preisKind, 0, 10000);
      if (erwachsene !== null) s.personen.erwachsene = Math.round(erwachsene);
      if (kinder !== null) s.personen.kinder = Math.round(kinder);
      if (preisErw !== null) s.personen.preisErw = preisErw;
      if (preisKind !== null) s.personen.preisKind = preisKind;
      if (typeof p.tarif === 'string' && p.tarif.length < 40) s.personen.tarif = p.tarif;
    }
    if (hat(e, 'zeitraum') && e.zeitraum && typeof e.zeitraum === 'object') {
      s.zeitraum.von = istDatum(e.zeitraum.von) ? e.zeitraum.von : '';
      s.zeitraum.bis = istDatum(e.zeitraum.bis) ? e.zeitraum.bis : '';
    }
    if (['auto', 'light', 'dark'].includes(e.theme)) s.theme = e.theme;
    return s;
  }

  /** Prüft einen kompletten Datenstand (localStorage oder Backup). Ungültige Einträge fallen weg. */
  function pruefeStand(roh, vorgabeEinstellungen, kategorien) {
    const katIds = new Set(kategorien.map((k) => k.id));
    const r = roh && typeof roh === 'object' ? roh : {};
    const orte = [];
    const gesehen = new Set();
    for (const o of Array.isArray(r.orte) ? r.orte.slice(0, 2000) : []) {
      const g = pruefeOrt(o, katIds);
      if (g && !gesehen.has(g.id)) {
        gesehen.add(g.id);
        orte.push(g);
      }
    }
    const besuche = [];
    const ids = new Set();
    for (const b of Array.isArray(r.besuche) ? r.besuche.slice(0, 20000) : []) {
      const g = pruefeBesuch(b, katIds);
      if (g && !ids.has(g.id)) {
        ids.add(g.id);
        besuche.push(g);
      }
    }
    const vorlage = Number.isInteger(r.vorlage) && r.vorlage > 0 && r.vorlage < 1000 ? r.vorlage : 1;
    return {
      version: 1,
      vorlage,
      einstellungen: pruefeEinstellungen(r.einstellungen, vorgabeEinstellungen),
      orte,
      besuche,
    };
  }

  /**
   * Neue Orte-Vorlage übernehmen (Liste aus der Recherche ersetzt die alte Vorlage).
   * Eigene und angepasste Orte bleiben, Besuche bleiben unverändert (sie speichern ihre Preise selbst).
   * Ein leerer Zeitraum wird auf die Gültigkeit der Karte gesetzt.
   */
  function aktualisiereVorlage(stand, vorlageOrte, version, gueltigkeit) {
    if ((stand.vorlage || 1) >= version) return false;
    // Eigene und vom Nutzer angepasste Orte haben Vorrang vor der Vorlage
    const behalten = new Map(stand.orte.filter((o) => o.eigen || o.bearbeitet).map((o) => [o.id, o]));
    const neu = JSON.parse(JSON.stringify(vorlageOrte)).map((o) => behalten.get(o.id) || o);
    const vorlageIds = new Set(vorlageOrte.map((o) => o.id));
    stand.orte = [...neu, ...[...behalten.values()].filter((o) => !vorlageIds.has(o.id))];
    const z = stand.einstellungen.zeitraum;
    if (!z.von && !z.bis && gueltigkeit) {
      z.von = gueltigkeit.von;
      z.bis = gueltigkeit.bis;
    }
    stand.vorlage = version;
    return true;
  }

  const api = { aktualisiereVorlage, runde, zahl, heute, istDatum, normalisiere, sucheOrte, wertBesuch, imZeitraum, berechneBilanz, pruefeStand };
  root.FZ = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
