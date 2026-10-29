// Ausführen: node --test tests/
const test = require('node:test');
const assert = require('node:assert/strict');
const FZ = require('../bilanz.js');
const { KATEGORIEN, ORTE, TARIFE, VORLAGE_VERSION, GUELTIGKEIT } = require('../data.js');

const einstellungen = {
  personen: { tarif: 'vv-familie', erwachsene: 1, kinder: 2, preisErw: 789, preisKind: 155 },
  zeitraum: { von: '', bis: '' },
  theme: 'auto',
};
const besuch = (id, datum, kat, erw, kind, preisErw, preisKind, ortId = 'x') => ({
  id, datum, ortId, ortName: 'Ort ' + ortId, kat, ticket: 'T', erw, kind, preisErw, preisKind,
});

test('heute nutzt die Ortszeit', () => {
  assert.equal(FZ.heute(new Date(2026, 9, 27, 0, 5)), '2026-10-27');
  assert.equal(FZ.heute(new Date(2026, 0, 3, 23, 59)), '2026-01-03');
});

test('zahl versteht Komma und begrenzt', () => {
  assert.equal(FZ.zahl('12,50'), 12.5);
  assert.equal(FZ.zahl('abc'), null);
  assert.equal(FZ.zahl(''), 0);
  assert.equal(FZ.zahl('-3'), 0);
  assert.equal(FZ.zahl('999999'), 100000);
});

test('Suche findet über Umlaute, Gemeinde, Kategorie und Ticket', () => {
  const s = (q) => FZ.sucheOrte(ORTE, KATEGORIEN, q).map((o) => o.id);
  assert.equal(s('nordk')[0], 'nordkette');
  assert.ok(s('Kuehtai').includes('kuehtai'));
  assert.ok(s('kühtai').includes('kuehtai'));
  assert.ok(s('rangger kopfl').length === 0, 'ö muss als oe oder ö gesucht werden');
  assert.ok(s('rangger koepfl').includes('rangger-koepfl'));
  assert.ok(s('hallenbad innsbruck').length >= 3);
  assert.ok(s('museum').includes('zeughaus'));
  assert.ok(s('hafelekar').includes('nordkette'));
  assert.ok(s('eislaufen wattens').includes('eislaufplatz-wattens'));
  assert.deepEqual(s('   '), []);
});

test('Suche: Namensanfang vor Treffer mitten im Namen', () => {
  const ids = FZ.sucheOrte(ORTE, KATEGORIEN, 'tivoli').map((o) => o.id);
  assert.equal(ids[0], 'tivoli');
});

test('Bilanz rechnet Wert, Kosten, Saldo und Quoten', () => {
  const b = FZ.berechneBilanz(
    [
      besuch('a', '2026-11-02', 'bergbahn', 1, 2, 48, 24, 'nordkette'),
      besuch('b', '2026-11-02', 'bad', 1, 2, 6.6, 2.7, 'tivoli'),
      besuch('c', '2026-12-20', 'bergbahn', 1, 2, 62, 31, 'axamer'),
    ],
    einstellungen,
    KATEGORIEN,
  );
  assert.equal(b.kosten, 1099);
  assert.equal(b.kostenErw, 789);
  assert.equal(b.kostenKind, 310);
  assert.equal(b.wertErw, 116.6);
  assert.equal(b.wertKind, 115.4);
  assert.equal(b.wert, 232);
  assert.equal(b.saldo, -867);
  assert.equal(b.rest, 867);
  assert.equal(b.anzahl, 3);
  assert.equal(b.schnitt, 77.33);
  assert.equal(b.nochBesuche, Math.ceil(867 / 77.33));
  assert.equal(b.ticketsErw, 3);
  assert.equal(b.ticketsKind, 6);
  // gleicher Tag wird im Verlauf zusammengefasst
  assert.deepEqual(b.verlauf, [
    { datum: '2026-11-02', summe: 108 },
    { datum: '2026-12-20', summe: 232 },
  ]);
  assert.equal(b.nachKategorie[0].id, 'bergbahn');
  assert.equal(b.nachKategorie[0].wert, 220);
  assert.equal(b.gewinnAb, null);
});

test('Gewinnzone: Datum, ab dem der Wert den Preis übersteigt', () => {
  const s = { ...einstellungen, personen: { ...einstellungen.personen, erwachsene: 1, kinder: 0, preisErw: 100 } };
  const b = FZ.berechneBilanz(
    [besuch('a', '2026-11-01', 'bad', 1, 0, 60, 0), besuch('b', '2026-11-05', 'bad', 1, 0, 60, 0), besuch('c', '2026-11-09', 'bad', 1, 0, 60, 0)],
    s,
    KATEGORIEN,
  );
  assert.equal(b.saldo, 80);
  assert.equal(b.gewinnAb, '2026-11-05');
  assert.equal(b.nochBesuche, 0);
});

test('Zeitraum filtert Besuche', () => {
  const s = { ...einstellungen, zeitraum: { von: '2026-11-01', bis: '2026-11-30' } };
  const b = FZ.berechneBilanz(
    [besuch('a', '2026-10-31', 'bad', 1, 0, 10, 0), besuch('b', '2026-11-01', 'bad', 1, 0, 10, 0), besuch('c', '2026-11-30', 'bad', 1, 0, 10, 0), besuch('d', '2026-12-01', 'bad', 1, 0, 10, 0)],
    s,
    KATEGORIEN,
  );
  assert.equal(b.anzahl, 2);
  assert.equal(b.wert, 20);
});

test('Leere Bilanz ohne Division durch null', () => {
  const b = FZ.berechneBilanz([], { ...einstellungen, personen: { ...einstellungen.personen, erwachsene: 0, kinder: 0 } }, KATEGORIEN);
  assert.equal(b.kosten, 0);
  assert.equal(b.quote, 0);
  assert.equal(b.schnitt, 0);
  assert.equal(b.nochBesuche, 0);
});

test('pruefeStand verwirft Kaputtes und übernimmt Gültiges', () => {
  const roh = {
    einstellungen: { personen: { erwachsene: '2', kinder: 99, preisErw: 'x', preisKind: 155 }, zeitraum: { von: '2026-13-45', bis: '2027-10-31' }, theme: 'neon' },
    orte: [
      { id: 'ok', name: 'Ort', kat: 'bad', tickets: [{ id: 't', name: 'Tag', erw: 5, kind: 2 }] },
      { id: 'ok', name: 'Doppelt', kat: 'bad', tickets: [{ id: 't', name: 'Tag', erw: 5, kind: 2 }] },
      { id: 'leer', name: 'Ohne Tickets', kat: 'bad', tickets: [] },
      { id: '../böse', name: 'X', tickets: [{ id: 't', name: 'T', erw: 1, kind: 1 }] },
      { id: 'fremd', name: 'Fremde Kat', kat: 'constructor', tickets: [{ id: 't', name: 'T', erw: 1, kind: 1 }] },
    ],
    besuche: [
      besuch('b1', '2026-11-01', 'bad', 1, 2, 5, 2),
      besuch('b1', '2026-11-02', 'bad', 1, 2, 5, 2),
      besuch('b2', 'gestern', 'bad', 1, 2, 5, 2),
      besuch('b3', '2026-11-03', 'bad', 0, 0, 5, 2),
      besuch('b4', '2026-11-04', 'bad', 1, 0, 'NaN', 2),
    ],
  };
  const s = FZ.pruefeStand(roh, einstellungen, KATEGORIEN);
  assert.deepEqual(s.orte.map((o) => o.id), ['ok', 'fremd']);
  assert.equal(s.orte[1].kat, 'sonstiges');
  assert.deepEqual(s.besuche.map((b) => b.id), ['b1']);
  assert.equal(s.einstellungen.personen.erwachsene, 2);
  assert.equal(s.einstellungen.personen.kinder, 10);
  assert.equal(s.einstellungen.personen.preisErw, 789);
  assert.equal(s.einstellungen.zeitraum.von, '');
  assert.equal(s.einstellungen.zeitraum.bis, '2027-10-31');
  assert.equal(s.einstellungen.theme, 'auto');
});

test('pruefeStand ohne Eingabe liefert Vorgaben', () => {
  const s = FZ.pruefeStand(null, einstellungen, KATEGORIEN);
  assert.deepEqual(s.einstellungen, einstellungen);
  assert.deepEqual(s.besuche, []);
});

test('Was die App ausliefert, besteht ihre eigene Prüfung', () => {
  const s = FZ.pruefeStand({ orte: ORTE, besuche: [] }, einstellungen, KATEGORIEN);
  assert.equal(s.orte.length, ORTE.length);
  const ids = new Set(ORTE.map((o) => o.id));
  assert.equal(ids.size, ORTE.length, 'Orts-IDs eindeutig');
  for (const o of ORTE) {
    const tids = new Set(o.tickets.map((t) => t.id));
    assert.equal(tids.size, o.tickets.length, 'Ticket-IDs je Ort eindeutig: ' + o.id);
  }
  for (const t of TARIFE) assert.ok(t.erwachsen > 0 && t.kind > 0);
});

test('Orte-Vorlage aus der Recherche: Umfang und Plausibilität', () => {
  assert.ok(ORTE.length >= 70);
  for (const k of ['bergbahn', 'bad', 'eislauf', 'museum']) assert.ok(ORTE.some((o) => o.kat === k), k);
  for (const o of ORTE) {
    assert.ok(o.tickets.length >= 1, o.id);
    for (const t of o.tickets) {
      assert.ok(!/saisonkarte|jahreskarte|block|\d\s*tage\b/i.test(t.name), 'keine Mehrfachkarten: ' + o.id + ' ' + t.name);
      assert.ok(t.erw >= 0 && t.erw < 200 && t.kind >= 0 && t.kind < 200, o.id + ' ' + t.name);
    }
    if (o.link) assert.match(o.link, /^https:\/\/www\.freizeitticket\.at\//);
  }
  // Alte IDs aus der ersten Vorlage bleiben, damit Besuche ihren Ort finden
  for (const id of ['nordkette', 'patscherkofel', 'tivoli', 'hallenbad-hoettinger-au', 'parkbad-hall', 'tirol-panorama', 'olympiaworld-eis']) {
    assert.ok(ORTE.some((o) => o.id === id), id);
  }
});

test('aktualisiereVorlage: neue Vorlage, eigene und angepasste Orte bleiben, Zeitraum gesetzt', () => {
  const stand = FZ.pruefeStand(
    {
      einstellungen,
      orte: [
        { id: 'nordkette', name: 'Nordkette alt', kat: 'bergbahn', tickets: [{ id: 'a', name: 'Alt', erw: 1, kind: 1 }] },
        { id: 'tivoli', name: 'Mein Tivoli', kat: 'bad', bearbeitet: true, tickets: [{ id: 'a', name: 'Tag', erw: 7, kind: 3 }] },
        { id: 'eigen-x', name: 'Eigen', kat: 'sonstiges', eigen: true, tickets: [{ id: 'a', name: 'T', erw: 5, kind: 2 }] },
        { id: 'ferdinandeum', name: 'Weg', kat: 'museum', tickets: [{ id: 'a', name: 'T', erw: 5, kind: 0 }] },
      ],
      besuche: [besuch('b1', '2026-10-20', 'bad', 1, 2, 7, 3, 'tivoli')],
    },
    einstellungen,
    KATEGORIEN,
  );
  assert.equal(stand.vorlage, 1);
  assert.equal(FZ.aktualisiereVorlage(stand, ORTE, VORLAGE_VERSION, GUELTIGKEIT), true);
  assert.equal(stand.vorlage, VORLAGE_VERSION);
  assert.equal(stand.orte.find((o) => o.id === 'nordkette').name, 'Nordkette');
  assert.equal(stand.orte.find((o) => o.id === 'tivoli').name, 'Mein Tivoli');
  assert.ok(stand.orte.some((o) => o.id === 'eigen-x'));
  assert.ok(!stand.orte.some((o) => o.id === 'ferdinandeum'));
  assert.equal(stand.orte.length, ORTE.length + 1);
  assert.deepEqual(stand.einstellungen.zeitraum, GUELTIGKEIT);
  assert.equal(stand.besuche.length, 1);
  // zweiter Lauf ändert nichts
  assert.equal(FZ.aktualisiereVorlage(stand, ORTE, VORLAGE_VERSION, GUELTIGKEIT), false);
});

test('aktualisiereVorlage lässt einen gesetzten Zeitraum in Ruhe', () => {
  const s = FZ.pruefeStand({ einstellungen: { ...einstellungen, zeitraum: { von: '2026-11-01', bis: '' } }, orte: [], besuche: [] }, einstellungen, KATEGORIEN);
  FZ.aktualisiereVorlage(s, ORTE, VORLAGE_VERSION, GUELTIGKEIT);
  assert.deepEqual(s.einstellungen.zeitraum, { von: '2026-11-01', bis: '' });
});
