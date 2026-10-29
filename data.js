/* Vorlagen für Freizeitticket-Preise, Kategorien und Orte.
 * Die Orte kommen aus orte.js (erzeugt von scripts/orte_aus_excel.py aus der Recherche in quellen/).
 * Alle Einzelpreise sind Recherche-Stand ohne Gewähr – in der App lässt sich jeder Name und Preis
 * anpassen; die App merkt sich den zuletzt verwendeten Preis je Ort und Ticket. */
(function (root) {
  'use strict';

  const ORTE = root.FZ_ORTE_VORLAGE || (typeof require === 'function' ? require('./orte.js') : []);

  // Erhöhen, wenn sich die Orte-Vorlage ändert: bestehende Nutzer bekommen sie dann beim Start.
  const VORLAGE_VERSION = 2;

  // Gültigkeit der Karte 2026/27 (freizeitticket.at)
  const GUELTIGKEIT = { von: '2026-10-01', bis: '2027-09-30' };

  // Freizeitticket Tirol 2026/27 (freizeitticket.at, Preisliste).
  // Familienpreis: Kinder-, Jugend- oder U23-Karten zusammen mit der Erwachsenenkarte eines Elternteils.
  const TARIFE = [
    {
      id: 'vv-familie',
      name: 'Vorverkauf 2026/27 · Familienpreis (bis 31.10.2026)',
      erwachsen: 789,
      kind: 155,
    },
    {
      id: 'normal-familie',
      name: 'Normaltarif 2026/27 · Familienpreis (ab 1.11.2026)',
      erwachsen: 908,
      kind: 178,
    },
    {
      id: 'vv-einzel',
      name: 'Vorverkauf 2026/27 · Einzelpreise',
      erwachsen: 789,
      kind: 410,
    },
    {
      id: 'normal-einzel',
      name: 'Normaltarif 2026/27 · Einzelpreise',
      erwachsen: 908,
      kind: 472,
    },
  ];

  const KATEGORIEN = [
    { id: 'bergbahn', name: 'Bergbahn & Ski', icon: '🚠' },
    { id: 'bad', name: 'Schwimmbad', icon: '🏊' },
    { id: 'eislauf', name: 'Eislaufen', icon: '⛸️' },
    { id: 'museum', name: 'Museum & Kultur', icon: '🏛️' },
    { id: 'sonstiges', name: 'Sonstiges', icon: '🎟️' },
  ];

  const daten = { TARIFE, KATEGORIEN, ORTE, VORLAGE_VERSION, GUELTIGKEIT };
  root.FZ_DATEN = daten;
  if (typeof module !== 'undefined' && module.exports) module.exports = daten;
})(typeof globalThis !== 'undefined' ? globalThis : this);
