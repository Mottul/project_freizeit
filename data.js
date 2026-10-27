/* Vorlagen für Freizeitticket-Preise und Orte.
 * Alle Einzelpreise sind RICHTWERTE (Stand Herbst 2026, ohne Gewähr) – in der App lässt sich
 * jeder Preis anpassen; die App merkt sich den zuletzt verwendeten Preis je Ort und Ticket.
 * Partnerliste und Preise bitte mit freizeitticket.at und den Betreibern abgleichen. */
(function (root) {
  'use strict';

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
    { id: 'bergbahn', name: 'Bergbahn', icon: '🚠' },
    { id: 'bad', name: 'Schwimmbad', icon: '🏊' },
    { id: 'eislauf', name: 'Eislaufen', icon: '⛸️' },
    { id: 'museum', name: 'Museum', icon: '🏛️' },
    { id: 'sonstiges', name: 'Sonstiges', icon: '🎟️' },
  ];

  const t = (id, name, erw, kind) => ({ id, name, erw, kind });
  const bergSommer = (erw, kind) => t('berg-tal', 'Berg- & Talfahrt', erw, kind);
  const skiTag = (erw, kind) => t('ski-tag', 'Skitageskarte', erw, kind);
  const skiHalb = (erw, kind) => t('ski-halb', 'Ski-Halbtageskarte', erw, kind);
  const badTag = (erw, kind) => t('tag', 'Tageskarte', erw, kind);
  const badNachmittag = (erw, kind) => t('nachmittag', 'Nachmittag (ab 14 Uhr)', erw, kind);

  const ORTE = [
    // Bergbahnen
    {
      id: 'nordkette',
      name: 'Nordkette',
      gemeinde: 'Innsbruck',
      kat: 'bergbahn',
      tickets: [
        t('hafelekar', 'Berg & Tal Innsbruck – Hafelekar', 48, 24),
        t('seegrube', 'Berg & Tal Innsbruck – Seegrube', 40, 20),
        t('hungerburg', 'Hungerburgbahn Berg & Tal', 11, 5.5),
        skiTag(52, 26),
      ],
    },
    {
      id: 'patscherkofel',
      name: 'Patscherkofelbahn',
      gemeinde: 'Innsbruck-Igls',
      kat: 'bergbahn',
      tickets: [bergSommer(33, 16.5), skiTag(55, 27.5), skiHalb(45, 22.5)],
    },
    {
      id: 'glungezer',
      name: 'Glungezerbahn',
      gemeinde: 'Tulfes',
      kat: 'bergbahn',
      tickets: [bergSommer(25, 12.5), skiTag(49, 24.5), skiHalb(41, 20.5)],
    },
    {
      id: 'muttereralm',
      name: 'Muttereralm',
      gemeinde: 'Mutters',
      kat: 'bergbahn',
      tickets: [bergSommer(22, 11), skiTag(45, 22.5)],
    },
    {
      id: 'axamer-lizum',
      name: 'Axamer Lizum',
      gemeinde: 'Axams',
      kat: 'bergbahn',
      tickets: [bergSommer(26, 13), skiTag(62, 31), skiHalb(52, 26)],
    },
    {
      id: 'rangger-koepfl',
      name: 'Rangger Köpfl',
      gemeinde: 'Oberperfuss',
      kat: 'bergbahn',
      tickets: [bergSommer(22, 11), skiTag(42, 21)],
    },
    {
      id: 'schlick',
      name: 'Schlick 2000',
      gemeinde: 'Fulpmes',
      kat: 'bergbahn',
      tickets: [bergSommer(30, 15), skiTag(62, 31)],
    },
    {
      id: 'elferbahnen',
      name: 'Elferbahnen',
      gemeinde: 'Neustift im Stubaital',
      kat: 'bergbahn',
      tickets: [bergSommer(26, 13), skiTag(45, 22.5)],
    },
    {
      id: 'serlesbahnen',
      name: 'Serlesbahnen',
      gemeinde: 'Mieders',
      kat: 'bergbahn',
      tickets: [bergSommer(22, 11), skiTag(42, 21)],
    },
    {
      id: 'bergeralm',
      name: 'Bergeralm',
      gemeinde: 'Steinach am Brenner',
      kat: 'bergbahn',
      tickets: [bergSommer(24, 12), skiTag(52, 26)],
    },
    {
      id: 'kuehtai',
      name: 'Kühtai',
      gemeinde: 'Silz',
      kat: 'bergbahn',
      tickets: [skiTag(62, 31), skiHalb(52, 26)],
    },

    // Bäder
    {
      id: 'tivoli',
      name: 'Freibad Tivoli',
      gemeinde: 'Innsbruck',
      kat: 'bad',
      tickets: [badTag(6.6, 2.7), badNachmittag(4.5, 2)],
    },
    {
      id: 'baggersee-rossau',
      name: 'Baggersee Roßau',
      gemeinde: 'Innsbruck',
      kat: 'bad',
      tickets: [badTag(5.5, 2.3)],
    },
    {
      id: 'hallenbad-hoettinger-au',
      name: 'Hallenbad Höttinger Au',
      gemeinde: 'Innsbruck',
      kat: 'bad',
      tickets: [badTag(6.6, 2.7)],
    },
    {
      id: 'hallenbad-olympisches-dorf',
      name: 'Hallenbad Olympisches Dorf',
      gemeinde: 'Innsbruck',
      kat: 'bad',
      tickets: [badTag(6.6, 2.7)],
    },
    {
      id: 'hallenbad-amraser-strasse',
      name: 'Hallenbad Amraser Straße',
      gemeinde: 'Innsbruck',
      kat: 'bad',
      tickets: [badTag(6.6, 2.7)],
    },
    {
      id: 'parkbad-hall',
      name: 'Parkbad Hall',
      gemeinde: 'Hall in Tirol',
      kat: 'bad',
      tickets: [badTag(6, 3)],
    },
    {
      id: 'telfer-bad',
      name: 'Telfer Bad',
      gemeinde: 'Telfs',
      kat: 'bad',
      tickets: [badTag(9.5, 5.5)],
    },
    {
      id: 'natterer-see',
      name: 'Natterer See',
      gemeinde: 'Natters',
      kat: 'bad',
      tickets: [badTag(5, 2.5)],
    },

    // Eislaufen
    {
      id: 'olympiaworld-eis',
      name: 'Eisschnelllaufbahn Olympiaworld',
      gemeinde: 'Innsbruck',
      kat: 'eislauf',
      tickets: [t('eintritt', 'Eintritt', 6, 3.5)],
    },
    {
      id: 'eislauf-igls',
      name: 'Eislaufplatz Igls',
      gemeinde: 'Innsbruck-Igls',
      kat: 'eislauf',
      tickets: [t('eintritt', 'Eintritt', 5, 3)],
    },

    // Museen (Tiroler Landesmuseen: Kinder und Jugendliche ohnehin frei → Kinderpreis 0)
    {
      id: 'ferdinandeum',
      name: 'Ferdinandeum (Tiroler Landesmuseen)',
      gemeinde: 'Innsbruck',
      kat: 'museum',
      tickets: [t('eintritt', 'Eintritt', 14, 0)],
    },
    {
      id: 'tirol-panorama',
      name: 'Tirol Panorama mit Kaiserjägermuseum',
      gemeinde: 'Innsbruck',
      kat: 'museum',
      tickets: [t('eintritt', 'Eintritt', 14, 0)],
    },
    {
      id: 'volkskunstmuseum',
      name: 'Volkskunstmuseum',
      gemeinde: 'Innsbruck',
      kat: 'museum',
      tickets: [t('eintritt', 'Eintritt', 14, 0)],
    },
    {
      id: 'zeughaus',
      name: 'Museum im Zeughaus',
      gemeinde: 'Innsbruck',
      kat: 'museum',
      tickets: [t('eintritt', 'Eintritt', 14, 0)],
    },
  ];

  const daten = { TARIFE, KATEGORIEN, ORTE };
  root.FZ_DATEN = daten;
  if (typeof module !== 'undefined' && module.exports) module.exports = daten;
})(typeof globalThis !== 'undefined' ? globalThis : this);
