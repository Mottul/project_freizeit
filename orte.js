/* ERZEUGT von scripts/orte_aus_excel.py aus Freizeitticket_2026-27.xlsx – nicht von Hand ändern.
 * Preise: Recherche-Stand ohne Gewähr, in der App editierbar. */
(function (root) {
  'use strict';
  const ORTE = [
    {
      "id": "alpenbad-wattens",
      "name": "Alpenbad Wattens",
      "gemeinde": "Wattens",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte-ohne-buergerkarte",
          "name": "Tageskarte ohne Bürgerkarte",
          "erw": 10.9,
          "kind": 6.0
        },
        {
          "id": "erwachsene-ab-15-00",
          "name": "Erwachsene ab 15:00",
          "erw": 8.6,
          "kind": 4.4
        },
        {
          "id": "2-stundenkarte",
          "name": "2-Stundenkarte",
          "erw": 4.9,
          "kind": 4.0
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/alpenbad-wattens/"
    },
    {
      "id": "badesee-weisslan",
      "name": "Badesee Weißlan",
      "gemeinde": "Terfens",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 5.5,
          "kind": 2.5
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/badesee-weisslan/"
    },
    {
      "id": "baggersee-rossau",
      "name": "Baggersee Rossau",
      "gemeinde": "Innsbruck",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 5.9,
          "kind": 2.4
        },
        {
          "id": "halbtageskarte-ab-14-00",
          "name": "Halbtageskarte ab 14:00",
          "erw": 4.3,
          "kind": 2.4
        }
      ],
      "hinweis": "1 Eintritt pro Kalendertag in einem IKB-Bad; Freibad/See ganztägig während Saison; Sauna nicht inkludiert (sofern vorhanden). Preisstand: Sommer 2026.",
      "link": "https://www.freizeitticket.at/baggersee-rossau/"
    },
    {
      "id": "erlebnisschwimmbad-schwaz",
      "name": "Erlebnisschwimmbad Schwaz",
      "gemeinde": "Schwaz",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 5.7,
          "kind": 3.3
        },
        {
          "id": "2-stunden-karte",
          "name": "2-Stunden-Karte",
          "erw": 4.0,
          "kind": 1.3
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/erlebnisschwimmbad-schwaz/"
    },
    {
      "id": "familienbad-mutters",
      "name": "Familienbad Mutters",
      "gemeinde": "Mutters",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 7.0,
          "kind": 4.5
        },
        {
          "id": "halbtageskarte-ab-13-00",
          "name": "Halbtageskarte ab 13:00",
          "erw": 5.5,
          "kind": 3.0
        },
        {
          "id": "halbtageskarte-ab-16-00",
          "name": "Halbtageskarte ab 16:00",
          "erw": 4.0,
          "kind": 2.0
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/familienbad-mutters/"
    },
    {
      "id": "freischwimmbad-steinach",
      "name": "Freischwimmbad Steinach",
      "gemeinde": "Steinach am Brenner",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 5.5,
          "kind": 3.5
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/freischwimmbad-steinach/"
    },
    {
      "id": "freischwimmbad-voelser-badl",
      "name": "Freischwimmbad Völser Badl",
      "gemeinde": "Völs",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 6.5,
          "kind": 3.0
        },
        {
          "id": "halbtageskarte-ab-14-00",
          "name": "Halbtageskarte ab 14:00",
          "erw": 4.5,
          "kind": 2.5
        },
        {
          "id": "spaetkarte-ab-17-00",
          "name": "Spätkarte ab 17:00",
          "erw": 3.5,
          "kind": 3.5
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/voelser-badl/"
    },
    {
      "id": "hallenbad-amraser-strasse",
      "name": "Hallenbad Amraser Straße",
      "gemeinde": "Innsbruck",
      "kat": "bad",
      "tickets": [
        {
          "id": "eintritt-bis-4-stunden",
          "name": "Eintritt bis 4 Stunden",
          "erw": 9.5,
          "kind": 3.8
        }
      ],
      "hinweis": "1 Eintritt pro Kalendertag in einem IKB-Bad; max. 4 Stunden; Sauna nicht inkludiert. Preisstand: IKB-Tarif zuletzt online geprüft 2026.",
      "link": "https://www.freizeitticket.at/hallenbad-amraser-strasse/"
    },
    {
      "id": "hallenbad-hoettinger-au",
      "name": "Hallenbad Höttinger Au",
      "gemeinde": "Innsbruck",
      "kat": "bad",
      "tickets": [
        {
          "id": "eintritt-bis-4-stunden",
          "name": "Eintritt bis 4 Stunden",
          "erw": 9.5,
          "kind": 3.8
        }
      ],
      "hinweis": "1 Eintritt pro Kalendertag in einem IKB-Bad; max. 2,5 Stunden; Sauna nicht inkludiert. Preisstand: IKB-Tarif zuletzt online geprüft 2026.",
      "link": "https://www.freizeitticket.at/hallenbad-hoettinger-au/"
    },
    {
      "id": "hallenbad-olympisches-dorf",
      "name": "Hallenbad Olympisches Dorf",
      "gemeinde": "Innsbruck",
      "kat": "bad",
      "tickets": [
        {
          "id": "eintritt-bis-4-stunden",
          "name": "Eintritt bis 4 Stunden",
          "erw": 12.8,
          "kind": 5.1
        },
        {
          "id": "abendtarif-mo-fr-ab-17-00",
          "name": "Abendtarif Mo–Fr ab 17:00",
          "erw": 10.2,
          "kind": 5.1
        }
      ],
      "hinweis": "1 Eintritt pro Kalendertag in einem IKB-Bad; max. 4 Stunden; Sauna nicht inkludiert. Preisstand: IKB-Tarif zuletzt online geprüft 2026.",
      "link": "https://www.freizeitticket.at/hallenbad-olympisches-dorf/"
    },
    {
      "id": "natterer-see",
      "name": "Natterer See",
      "gemeinde": "Natters",
      "kat": "bad",
      "tickets": [
        {
          "id": "ganztageskarte",
          "name": "Ganztageskarte",
          "erw": 10.0,
          "kind": 5.0
        },
        {
          "id": "ticket-ab-15-30",
          "name": "Ticket ab 15:30",
          "erw": 5.0,
          "kind": 2.5
        },
        {
          "id": "ticket-ab-17-30",
          "name": "Ticket ab 17:30",
          "erw": 2.5,
          "kind": 1.5
        }
      ],
      "hinweis": "Sommer-Eintritt laut Partnerbedingungen; da in den AGB als Sonderregel genannt, genaue Zutrittszahl/Leistung vor Besuch prüfen. Preisstand: Sommer 2026.",
      "link": "https://www.freizeitticket.at/natterersee/"
    },
    {
      "id": "parkbad-hall",
      "name": "Schwimmbad Hall",
      "gemeinde": "Hall in Tirol",
      "kat": "bad",
      "tickets": [
        {
          "id": "ganztageskarte-erwachsene",
          "name": "Ganztageskarte Erwachsene",
          "erw": 8.0,
          "kind": 4.0
        },
        {
          "id": "abendkarte-ab-16-00",
          "name": "Abendkarte ab 16:00",
          "erw": 5.0,
          "kind": 3.2
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/schwimmbad-hall/"
    },
    {
      "id": "schwimmbad-inzing",
      "name": "Schwimmbad Inzing",
      "gemeinde": "Inzing",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 6.5,
          "kind": 3.0
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/schwimmbad-inzing/"
    },
    {
      "id": "schwimmbad-mieders",
      "name": "Schwimmbad Mieders",
      "gemeinde": "Mieders",
      "kat": "bad",
      "tickets": [
        {
          "id": "eintritt",
          "name": "Eintritt",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/schwimmbad-mieders/"
    },
    {
      "id": "strandperle-seefeld",
      "name": "Strandperle Seefeld",
      "gemeinde": "Seefeld in Tirol",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageseintritt-gaeste-ohne-gaestekarte",
          "name": "Tageseintritt Gäste ohne Gästekarte",
          "erw": 8.4,
          "kind": 5.2
        },
        {
          "id": "eintritt-ab-16-00",
          "name": "Eintritt ab 16:00",
          "erw": 5.0,
          "kind": 3.5
        }
      ],
      "hinweis": "Preisstand: Sommer 2026.",
      "link": "https://www.freizeitticket.at/strandperle-seefeld/"
    },
    {
      "id": "telfer-bad",
      "name": "Telfer Bad",
      "gemeinde": "Telfs",
      "kat": "bad",
      "tickets": [
        {
          "id": "schwimmen-2-stunden",
          "name": "Schwimmen 2 Stunden",
          "erw": 9.6,
          "kind": 5.0
        },
        {
          "id": "schwimmen-4-stunden",
          "name": "Schwimmen 4 Stunden",
          "erw": 19.2,
          "kind": 10.0
        },
        {
          "id": "tageseintritt-schwimmen",
          "name": "Tageseintritt Schwimmen",
          "erw": 24.0,
          "kind": 12.5
        }
      ],
      "hinweis": "Eintritt laut Partnerbedingungen; AGB nennt das Telfer Bad als Sonderregel-Partner, daher Frequenz/Zeitlimit vor Besuch prüfen. Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/telfer-bad/"
    },
    {
      "id": "tivoli",
      "name": "Tivoli Freibad Innsbruck",
      "gemeinde": "Innsbruck",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 6.6,
          "kind": 2.7
        },
        {
          "id": "halbtageskarte-ab-14-00",
          "name": "Halbtageskarte ab 14:00",
          "erw": 4.7,
          "kind": 2.7
        },
        {
          "id": "spaettarif-ab-16-00-fruehschwimmen",
          "name": "Spättarif ab 16:00 / Frühschwimmen",
          "erw": 2.7,
          "kind": 2.7
        }
      ],
      "hinweis": "1 Eintritt pro Kalendertag in einem IKB-Bad; Freibad/See ganztägig während Saison; Sauna nicht inkludiert (sofern vorhanden). Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/tivoli-freibad/"
    },
    {
      "id": "zirl-badeanlage",
      "name": "Zirl Badeanlage",
      "gemeinde": "Zirl",
      "kat": "bad",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 5.2,
          "kind": 2.0
        },
        {
          "id": "abendkarte-ab-16-00",
          "name": "Abendkarte ab 16:00",
          "erw": 3.9,
          "kind": 2.0
        }
      ],
      "hinweis": "Preisstand: Badesaison 2026.",
      "link": "https://www.freizeitticket.at/zirl-badeanlage/"
    },
    {
      "id": "axamer-lizum",
      "name": "Axamer Lizum",
      "gemeinde": "Axams / Axamer Lizum",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 63.0,
          "kind": 38.0
        },
        {
          "id": "2-stunden",
          "name": "2 Stunden",
          "erw": 37.5,
          "kind": 22.5
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27, Hauptsaison.",
      "link": "https://www.freizeitticket.at/axamer-lizum/"
    },
    {
      "id": "bergeralm",
      "name": "Bergeralm",
      "gemeinde": "Steinach am Brenner",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 60.2,
          "kind": 36.1
        },
        {
          "id": "vormittag-bis-13-00",
          "name": "Vormittag bis 13:00",
          "erw": 50.6,
          "kind": 30.3
        },
        {
          "id": "ab-12-00",
          "name": "ab 12:00",
          "erw": 49.0,
          "kind": 29.4
        },
        {
          "id": "ab-13-00",
          "name": "ab 13:00",
          "erw": 45.9,
          "kind": 27.5
        },
        {
          "id": "2-stunden",
          "name": "2 Stunden",
          "erw": 38.0,
          "kind": 22.8
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/berger-alm/"
    },
    {
      "id": "burglift-stans",
      "name": "Burglift Stans",
      "gemeinde": "Stans",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte-uebersichtspreis",
          "name": "Tageskarte (Übersichtspreis)",
          "erw": 30.0,
          "kind": 0
        }
      ],
      "hinweis": "Kinderpreis nicht gefunden – bitte eintragen. Preisstand: Letzte auffindbare Preisübersicht; Saison nicht sicher.",
      "link": "https://www.freizeitticket.at/burglift-stans/"
    },
    {
      "id": "elferbahnen",
      "name": "Elferbahnen",
      "gemeinde": "Neustift im Stubaital",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tages-skipass",
          "name": "1-Tages-Skipass",
          "erw": 48.5,
          "kind": 0
        }
      ],
      "hinweis": "Kinderpreis nicht gefunden – bitte eintragen. Preisstand: Letzter auffindbarer Preis: Winter 2025/26.",
      "link": "https://www.freizeitticket.at/elferbahnen/"
    },
    {
      "id": "glungezer",
      "name": "Glungezer",
      "gemeinde": "Tulfes",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 50.0,
          "kind": 29.5
        }
      ],
      "hinweis": "Preisstand: Hauptsaison 2025/26 – Vorjahrespreis.",
      "link": "https://www.freizeitticket.at/glungezer/"
    },
    {
      "id": "hochkoessen",
      "name": "Hochkössen",
      "gemeinde": "Kössen",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tages-skipass",
          "name": "1-Tages-Skipass",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/hochkoessen/"
    },
    {
      "id": "huettegglift",
      "name": "Hüttegglift",
      "gemeinde": "Weerberg",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/huettegglift/"
    },
    {
      "id": "ischgl-silvretta-seilbahn",
      "name": "Ischgl (Silvretta Seilbahn)",
      "gemeinde": "Ischgl",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "silvretta-skipass-1-tag",
          "name": "Silvretta-Skipass 1 Tag",
          "erw": 83.0,
          "kind": 51.0
        }
      ],
      "hinweis": "3 Zutritte pro Saison; Zugang ausschließlich Ischgl-Einstieg, nicht Samnaun. Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/ischgl/"
    },
    {
      "id": "kappl",
      "name": "Kappl",
      "gemeinde": "Kappl, Paznaun",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag-kappl-see",
          "name": "1 Tag Kappl & See",
          "erw": 73.0,
          "kind": 47.0
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27, Hauptsaison; Sekundärquelle.",
      "link": "https://www.freizeitticket.at/kappl/"
    },
    {
      "id": "katzenkopf-leutasch",
      "name": "Katzenkopf Leutasch",
      "gemeinde": "Leutasch",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 41.0,
          "kind": 27.5
        },
        {
          "id": "1-tag-ab-11-00",
          "name": "1 Tag ab 11:00",
          "erw": 38.5,
          "kind": 26.0
        },
        {
          "id": "1-tag-ab-13-00",
          "name": "1 Tag ab 13:00",
          "erw": 32.0,
          "kind": 21.5
        },
        {
          "id": "berg-und-talfahrt",
          "name": "Berg- und Talfahrt",
          "erw": 17.0,
          "kind": 10.0
        }
      ],
      "hinweis": "Preisstand: Hauptsaison 2025/26 – Vorjahrespreis.",
      "link": "https://www.freizeitticket.at/katzenkopf-leutasch/"
    },
    {
      "id": "kellerjoch",
      "name": "Kellerjoch",
      "gemeinde": "Schwaz / Pill",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 45.5,
          "kind": 26.0
        },
        {
          "id": "3-stunden",
          "name": "3 Stunden",
          "erw": 36.5,
          "kind": 21.0
        },
        {
          "id": "4-stunden",
          "name": "4 Stunden",
          "erw": 38.5,
          "kind": 22.5
        }
      ],
      "hinweis": "Preisstand: Hauptsaison 2025/26 – Vorjahrespreis.",
      "link": "https://www.freizeitticket.at/kellerjoch/"
    },
    {
      "id": "kinderland-rinn",
      "name": "Kinderland Rinn",
      "gemeinde": "Rinn",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tages-punktekarten-je-nach-betrieb",
          "name": "Tages-/Punktekarten je nach Betrieb",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/kinderland-rinn/"
    },
    {
      "id": "kuehtai",
      "name": "Kühtai",
      "gemeinde": "Kühtai / Silz",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tageskarte-kuehtai-nebensaison",
          "name": "1-Tageskarte Kühtai – Nebensaison",
          "erw": 50.5,
          "kind": 28.0
        },
        {
          "id": "1-tageskarte-kuehtai-topsaison",
          "name": "1-Tageskarte Kühtai – Topsaison",
          "erw": 66.5,
          "kind": 36.5
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27; saisonabhängig.",
      "link": "https://www.freizeitticket.at/kuehtai/"
    },
    {
      "id": "muttereralm",
      "name": "Muttereralm",
      "gemeinde": "Mutters / Götzens",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "berg-und-talfahrt",
          "name": "Berg- und Talfahrt",
          "erw": 28.0,
          "kind": 19.0
        },
        {
          "id": "einzelfahrt",
          "name": "Einzelfahrt",
          "erw": 23.0,
          "kind": 15.0
        },
        {
          "id": "4-stunden-karte-biken-sommer",
          "name": "4-Stunden-Karte (Biken/Sommer)",
          "erw": 48.0,
          "kind": 32.0
        }
      ],
      "hinweis": "Preisstand: Sommer 2025/26, letzter auffindbarer Tarif.",
      "link": "https://www.freizeitticket.at/muttereralm/"
    },
    {
      "id": "nordkette",
      "name": "Nordkette",
      "gemeinde": "Innsbruck",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "top-of-innsbruck-hin-und-retourfahrt",
          "name": "Top of Innsbruck Hin- und Retourfahrt",
          "erw": 56.0,
          "kind": 33.6
        },
        {
          "id": "hafelekar-einzelfahrt-ab-innsbruck",
          "name": "Hafelekar Einzelfahrt ab Innsbruck",
          "erw": 33.6,
          "kind": 20.2
        },
        {
          "id": "seegrube-hin-und-retourfahrt",
          "name": "Seegrube Hin- und Retourfahrt",
          "erw": 50.4,
          "kind": 30.2
        },
        {
          "id": "seegrube-einzelfahrt",
          "name": "Seegrube Einzelfahrt",
          "erw": 30.2,
          "kind": 18.1
        },
        {
          "id": "hungerburgbahn-hin-und-retourfahrt",
          "name": "Hungerburgbahn Hin- und Retourfahrt",
          "erw": 14.0,
          "kind": 8.4
        }
      ],
      "hinweis": "Preisstand: Veröffentlichter Sightseeing-Tarif, nicht Ski-Tageskarte.",
      "link": "https://www.freizeitticket.at/nordkette/"
    },
    {
      "id": "patscherkofel",
      "name": "Patscherkofel",
      "gemeinde": "Igls / Innsbruck",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "kofel-ticket-berg-und-talfahrt",
          "name": "Kofel Ticket Berg- und Talfahrt",
          "erw": 33.0,
          "kind": 18.0
        },
        {
          "id": "kofel-ticket-einfache-fahrt",
          "name": "Kofel Ticket einfache Fahrt",
          "erw": 22.3,
          "kind": 12.2
        },
        {
          "id": "zirbenwegticket-ohne-busticket",
          "name": "Zirbenwegticket ohne Busticket",
          "erw": 39.5,
          "kind": 22.5
        }
      ],
      "hinweis": "Preisstand: Sommersaison 14.05.–01.11.2026.",
      "link": "https://www.freizeitticket.at/patscherkofel/"
    },
    {
      "id": "rangger-koepfl",
      "name": "Rangger Köpfl",
      "gemeinde": "Oberperfuss",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 49.0,
          "kind": 26.0
        },
        {
          "id": "4-stunden-karte",
          "name": "4-Stunden-Karte",
          "erw": 42.0,
          "kind": 22.0
        },
        {
          "id": "2-stunden-karte",
          "name": "2-Stunden-Karte",
          "erw": 36.0,
          "kind": 19.0
        },
        {
          "id": "gipfelwandern-langlauf-retour",
          "name": "Gipfelwandern/Langlauf Retour",
          "erw": 37.0,
          "kind": 20.0
        },
        {
          "id": "tourengeher-eislaufen-ticket",
          "name": "Tourengeher/Eislaufen Ticket",
          "erw": 25.0,
          "kind": 13.0
        },
        {
          "id": "nachtrodeln-eislaufen-abendkarte",
          "name": "Nachtrodeln/Eislaufen Abendkarte",
          "erw": 25.0,
          "kind": 15.0
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/rangger-koepfl/"
    },
    {
      "id": "rosshuette-seefeld",
      "name": "Rosshütte Seefeld",
      "gemeinde": "Seefeld in Tirol",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "standseilbahn-bergfahrt",
          "name": "Standseilbahn Bergfahrt",
          "erw": 20.0,
          "kind": 11.0
        },
        {
          "id": "standseilbahn-berg-und-talfahrt",
          "name": "Standseilbahn Berg- und Talfahrt",
          "erw": 28.0,
          "kind": 17.5
        },
        {
          "id": "standseilbahn-gipfelbahn-bergfahrt",
          "name": "Standseilbahn + Gipfelbahn Bergfahrt",
          "erw": 30.5,
          "kind": 16.5
        },
        {
          "id": "standseilbahn-gipfelbahn-berg-und-talfahrt",
          "name": "Standseilbahn + Gipfelbahn Berg- und Talfahrt",
          "erw": 34.0,
          "kind": 24.5
        },
        {
          "id": "wanderticket-3-sektionen-retour",
          "name": "Wanderticket 3 Sektionen Retour",
          "erw": 32.5,
          "kind": 21.0
        },
        {
          "id": "topkarte-retour",
          "name": "Topkarte Retour",
          "erw": 38.0,
          "kind": 26.5
        },
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 48.5,
          "kind": 35.0
        },
        {
          "id": "erlebnis-paket-klein",
          "name": "Erlebnis-Paket klein",
          "erw": 32.5,
          "kind": 21.5
        },
        {
          "id": "erlebnis-paket-gross",
          "name": "Erlebnis-Paket groß",
          "erw": 42.0,
          "kind": 30.5
        }
      ],
      "hinweis": "Preisstand: Sommer-/Sichtfahrttarif veröffentlicht 2026.",
      "link": "https://www.freizeitticket.at/rosshuette-seefeld/"
    },
    {
      "id": "schlick",
      "name": "Schlick 2000",
      "gemeinde": "Fulpmes",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 58.5,
          "kind": 29.8
        },
        {
          "id": "1-tag-ab-13-00",
          "name": "1 Tag ab 13:00",
          "erw": 43.0,
          "kind": 21.9
        }
      ],
      "hinweis": "Preisstand: Hauptsaison 2025/26 – Vorjahrespreis.",
      "link": "https://www.freizeitticket.at/schlick-2000/"
    },
    {
      "id": "seefeld-birkenlift",
      "name": "Seefeld Birkenlift",
      "gemeinde": "Seefeld in Tirol",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte-ab-09-00",
          "name": "Tageskarte ab 09:00",
          "erw": 40.0,
          "kind": 33.5
        },
        {
          "id": "tageskarte-09-00-13-00",
          "name": "Tageskarte 09:00–13:00",
          "erw": 30.5,
          "kind": 28.0
        },
        {
          "id": "tageskarte-ab-11-00",
          "name": "Tageskarte ab 11:00",
          "erw": 35.5,
          "kind": 30.5
        },
        {
          "id": "tageskarte-ab-13-00",
          "name": "Tageskarte ab 13:00",
          "erw": 30.5,
          "kind": 28.5
        },
        {
          "id": "tageskarte-ab-14-00",
          "name": "Tageskarte ab 14:00",
          "erw": 28.5,
          "kind": 26.0
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/birkenlift/"
    },
    {
      "id": "serlesbahnen",
      "name": "Serlesbahn Mieders",
      "gemeinde": "Mieders",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tages-skipass",
          "name": "1-Tages-Skipass",
          "erw": 48.0,
          "kind": 26.5
        }
      ],
      "hinweis": "Preisstand: Hauptsaison 2025/26 – Vorjahrespreis.",
      "link": "https://www.freizeitticket.at/serlesbahn-mieders/"
    },
    {
      "id": "silvretta-galtuer",
      "name": "Silvretta Galtür",
      "gemeinde": "Galtür",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 63.0,
          "kind": 37.0
        },
        {
          "id": "staffelkarte-ab-11-30",
          "name": "Staffelkarte ab 11:30",
          "erw": 51.0,
          "kind": 30.5
        },
        {
          "id": "staffelkarte-ab-12-30",
          "name": "Staffelkarte ab 12:30",
          "erw": 42.0,
          "kind": 25.0
        },
        {
          "id": "staffelkarte-ab-13-30",
          "name": "Staffelkarte ab 13:30",
          "erw": 35.0,
          "kind": 21.0
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27; saisonabhängig.",
      "link": "https://www.freizeitticket.at/silvretta-galtuer/"
    },
    {
      "id": "ski-arlberg",
      "name": "Ski Arlberg",
      "gemeinde": "St. Anton / Lech-Zürs / Stuben (FTT-Regel prüfen)",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "halbtageskarte-ab-12-00",
          "name": "Halbtageskarte ab 12:00",
          "erw": 65.0,
          "kind": 39.0
        },
        {
          "id": "1-tag",
          "name": "1 Tag",
          "erw": 85.0,
          "kind": 51.0
        }
      ],
      "hinweis": "3 Zutritte; ungenutzte Winterzutritte laut Partnerseite im Sommer möglich, Sommernutzung nur St. Anton. Preisstand: Hauptsaison Winter 2026/27.",
      "link": "https://www.freizeitticket.at/ski-arlberg/"
    },
    {
      "id": "skilift-geigenbuehel",
      "name": "Skilift Geigenbühel",
      "gemeinde": "Seefeld in Tirol",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte-ab-09-00",
          "name": "Tageskarte ab 09:00",
          "erw": 40.0,
          "kind": 33.5
        },
        {
          "id": "tageskarte-09-00-13-00",
          "name": "Tageskarte 09:00–13:00",
          "erw": 30.5,
          "kind": 28.0
        },
        {
          "id": "tageskarte-ab-11-00",
          "name": "Tageskarte ab 11:00",
          "erw": 35.5,
          "kind": 30.5
        },
        {
          "id": "tageskarte-ab-13-00",
          "name": "Tageskarte ab 13:00",
          "erw": 30.5,
          "kind": 28.5
        },
        {
          "id": "tageskarte-ab-14-00",
          "name": "Tageskarte ab 14:00",
          "erw": 28.5,
          "kind": 26.0
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27.",
      "link": "https://www.freizeitticket.at/geigenbuehel/"
    },
    {
      "id": "skilift-kolsassberg",
      "name": "Skilift Kolsassberg",
      "gemeinde": "Kolsassberg",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/skilift-kolsassberg/"
    },
    {
      "id": "skilift-trins",
      "name": "Skilift Trins",
      "gemeinde": "Trins",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte-uebersichtspreis",
          "name": "Tageskarte (Übersichtspreis)",
          "erw": 20.5,
          "kind": 0
        }
      ],
      "hinweis": "Kinderpreis nicht gefunden – bitte eintragen. Preisstand: Letzte auffindbare Preisübersicht; Saison nicht sicher.",
      "link": "https://www.freizeitticket.at/skilift-trins/"
    },
    {
      "id": "skiregion-gurgl",
      "name": "Skiregion Gurgl",
      "gemeinde": "Obergurgl / Hochgurgl",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "1-tag-vorsaison",
          "name": "1 Tag – Vorsaison",
          "erw": 64.0,
          "kind": 34.5
        },
        {
          "id": "1-tag-hauptsaison",
          "name": "1 Tag – Hauptsaison",
          "erw": 69.5,
          "kind": 38.5
        },
        {
          "id": "1-tag-topsaison",
          "name": "1 Tag – Topsaison",
          "erw": 75.5,
          "kind": 42.5
        }
      ],
      "hinweis": "Preisstand: Winter 2026/27; saisonabhängig.",
      "link": "https://www.freizeitticket.at/skiregion-gurgl/"
    },
    {
      "id": "sonnenbergbahn-milders",
      "name": "Sonnenbergbahn Milders",
      "gemeinde": "Neustift / Milders",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "bergbahn-skitarif-je-nach-saison",
          "name": "Bergbahn-/Skitarif je nach Saison",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/sonnenbahn-milders/"
    },
    {
      "id": "sonnenberglift-gries-im-sellrain",
      "name": "Sonnenberglift Gries im Sellrain",
      "gemeinde": "Gries im Sellrain",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte",
          "name": "Tageskarte",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/sonnenberglift/"
    },
    {
      "id": "stubaier-gletscher",
      "name": "Stubaier Gletscher",
      "gemeinde": "Neustift im Stubaital",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "tageskarte-beispielpreis",
          "name": "Tageskarte (Beispielpreis)",
          "erw": 64.2,
          "kind": 32.1
        }
      ],
      "hinweis": "Preisstand: Shop-Preisbeispiel 15.10.2026, nicht fix.",
      "link": "https://www.freizeitticket.at/stubaier-gletscher/"
    },
    {
      "id": "voegelsberg-wattens",
      "name": "Vögelsberg Wattens",
      "gemeinde": "Wattens",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "liftkarte",
          "name": "Liftkarte",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/voegelsberg/"
    },
    {
      "id": "wildstaettlift-wattenberg",
      "name": "Wildstättlift Wattenberg",
      "gemeinde": "Wattenberg",
      "kat": "bergbahn",
      "tickets": [
        {
          "id": "liftkarte",
          "name": "Liftkarte",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/wildstaettlift-wattenberg/"
    },
    {
      "id": "eishalle-goetzens",
      "name": "Eishalle Götzens",
      "gemeinde": "Götzens",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "einzeleintritt",
          "name": "Einzeleintritt",
          "erw": 5.0,
          "kind": 3.0
        }
      ],
      "hinweis": "Preisstand: Tarif online geprüft Okt. 2026.",
      "link": "https://www.freizeitticket.at/eishalle-goetzens/"
    },
    {
      "id": "eishalle-steinach",
      "name": "Eishalle Steinach",
      "gemeinde": "Steinach am Brenner",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "einzeleintritt",
          "name": "Einzeleintritt",
          "erw": 4.6,
          "kind": 3.8
        }
      ],
      "hinweis": "Preisstand: Saison 2025/26 – letzter veröffentlichter Tarif.",
      "link": "https://www.freizeitticket.at/eishalle-steinach/"
    },
    {
      "id": "eislaufplatz-baggersee",
      "name": "Eislaufplatz Baggersee",
      "gemeinde": "Innsbruck",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-baggersee/"
    },
    {
      "id": "eislaufplatz-hoetting-west",
      "name": "Eislaufplatz Hötting-West",
      "gemeinde": "Innsbruck",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-hoetting-west/"
    },
    {
      "id": "eislauf-igls",
      "name": "Eislaufplatz Igls",
      "gemeinde": "Igls / Innsbruck",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-igls/"
    },
    {
      "id": "eislaufplatz-schwaz",
      "name": "Eislaufplatz Schwaz",
      "gemeinde": "Schwaz",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "einzeleintritt",
          "name": "Einzeleintritt",
          "erw": 4.5,
          "kind": 2.0
        }
      ],
      "hinweis": "Preisstand: Saison 2025/26 – letzter veröffentlichter Tarif.",
      "link": "https://www.freizeitticket.at/eislaufplatz-schwaz/"
    },
    {
      "id": "eislaufplatz-silz",
      "name": "Eislaufplatz Silz",
      "gemeinde": "Silz",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-silz/"
    },
    {
      "id": "eislaufplatz-trins",
      "name": "Eislaufplatz Trins",
      "gemeinde": "Trins",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-trins/"
    },
    {
      "id": "eislaufplatz-vomp",
      "name": "Eislaufplatz Vomp",
      "gemeinde": "Vomp",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-vomp/"
    },
    {
      "id": "eislaufplatz-wattens",
      "name": "Eislaufplatz Wattens",
      "gemeinde": "Wattens",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "einzelkarte",
          "name": "Einzelkarte",
          "erw": 5.0,
          "kind": 3.0
        }
      ],
      "hinweis": "Preisstand: Wintersaison 2026/27.",
      "link": "https://www.freizeitticket.at/eislaufplatz-wattens/"
    },
    {
      "id": "eislaufplatz-zirl",
      "name": "Eislaufplatz Zirl",
      "gemeinde": "Zirl",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "publikumseislauf",
          "name": "Publikumseislauf",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Preisstand: Tarif 2026/27 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/eislaufplatz-zirl/"
    },
    {
      "id": "olympiaworld-eis",
      "name": "Olympiaworld Innsbruck",
      "gemeinde": "Innsbruck",
      "kat": "eislauf",
      "tickets": [
        {
          "id": "einzeleintritt-publikumslauf",
          "name": "Einzeleintritt Publikumslauf",
          "erw": 8.0,
          "kind": 4.5
        }
      ],
      "hinweis": "Preisstand: Saison 2026/27.",
      "link": "https://www.freizeitticket.at/olympiaworld-innsbruck/"
    },
    {
      "id": "audioversum",
      "name": "Audioversum",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "gesamtticket",
          "name": "Gesamtticket",
          "erw": 14.0,
          "kind": 9.0
        }
      ],
      "hinweis": "Sonderregel laut AGB; Freizeitticket-Zutritte gemäß Partnerhinweis (nicht pauschal unbegrenzt annehmen). Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/audioversum/"
    },
    {
      "id": "glockenmuseum-grassmayr",
      "name": "Glockenmuseum Grassmayr",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "eintritt-erwachsene",
          "name": "Eintritt Erwachsene",
          "erw": 10.0,
          "kind": 6.0
        }
      ],
      "hinweis": "Zutritt laut Partner-/AGB-Bedingungen; genaue Häufigkeit vor Besuch prüfen. Preisstand: Preisliste gültig 01.05.2025–30.04.2027.",
      "link": "https://www.freizeitticket.at/grassmayer/"
    },
    {
      "id": "hofkirche",
      "name": "Hofkirche",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzelticket-pro-haus",
          "name": "Einzelticket pro Haus",
          "erw": 9.0,
          "kind": 0.0
        }
      ],
      "hinweis": "Tiroler Landesmuseen: 3 Zutritte pro Haus und Saison; Sonderregel gemäß AGB. Kinder und Jugendliche unter 19 ohnehin frei (Kinderpreis 0 €). Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/hofkirche/"
    },
    {
      "id": "museum-goldenes-dachl",
      "name": "Museum Goldenes Dachl",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "standardeintritt",
          "name": "Standardeintritt",
          "erw": 6.0,
          "kind": 3.0
        }
      ],
      "hinweis": "Freier Eintritt mit Freizeitticket; genaue Wiederholungsbegrenzung auf Partner-/AGB-Seite prüfen. Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/goldenes-dachl/"
    },
    {
      "id": "museum-der-voelker",
      "name": "Museum der Völker",
      "gemeinde": "Schwaz",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzeleintritt",
          "name": "Einzeleintritt",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Partner-Museum; Häufigkeit und etwaige Sonderausstellungen beim Anbieter prüfen. Preisstand: Tarif 2026 nicht verifiziert.",
      "link": "https://www.freizeitticket.at/museum-der-voelker/"
    },
    {
      "id": "muenze-hall",
      "name": "Münze Hall",
      "gemeinde": "Hall in Tirol",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzeleintritt-muenze-hall",
          "name": "Einzeleintritt Münze Hall",
          "erw": 9.5,
          "kind": 6.5
        },
        {
          "id": "einzeleintritt-muenzerturm",
          "name": "Einzeleintritt Münzerturm",
          "erw": 6.5,
          "kind": 5.5
        }
      ],
      "hinweis": "Sonderregel laut AGB; Nutzung und eventuelle Begrenzung vor Besuch prüfen. Preisstand: Zuletzt veröffentlichter Tarif, online geprüft 27.10.2026.",
      "link": "https://www.freizeitticket.at/muenze-hall/"
    },
    {
      "id": "stadtarchiv-stadtmuseum-innsbruck",
      "name": "Stadtarchiv/Stadtmuseum Innsbruck",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "eintritt-erwachsene",
          "name": "Eintritt Erwachsene",
          "erw": 4.5,
          "kind": 3.0
        }
      ],
      "hinweis": "Kultureintritt laut Partnerbedingungen; Kombitickets können abweichen. Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/stadtmuseum/"
    },
    {
      "id": "swarovski-kristallwelten",
      "name": "Swarovski Kristallwelten",
      "gemeinde": "Wattens",
      "kat": "museum",
      "tickets": [
        {
          "id": "tagesticket-erwachsene-online",
          "name": "Tagesticket Erwachsene online",
          "erw": 25.0,
          "kind": 9.0
        },
        {
          "id": "tagesticket-erwachsene-vor-ort",
          "name": "Tagesticket Erwachsene vor Ort",
          "erw": 27.0,
          "kind": 9.0
        }
      ],
      "hinweis": "Sonderregel laut AGB; vor Besuch konkrete Freizeitticket-Berechtigung/Frequenz prüfen. Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/swarovski-kristallwelten/"
    },
    {
      "id": "tirol-panorama",
      "name": "Tirol Panorama mit Kaiserjägermuseum",
      "gemeinde": "Innsbruck / Bergisel",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzelticket-pro-haus",
          "name": "Einzelticket pro Haus",
          "erw": 9.0,
          "kind": 0.0
        }
      ],
      "hinweis": "Tiroler Landesmuseen: 3 Zutritte pro Haus und Saison. Kinder und Jugendliche unter 19 ohnehin frei (Kinderpreis 0 €). Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/tirol-panorama/"
    },
    {
      "id": "tiroler-abend-mit-familie-gundolf-oktoberfest",
      "name": "Tiroler Abend mit Familie Gundolf / Oktoberfest",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "veranstaltungs-showticket",
          "name": "Veranstaltungs-/Showticket",
          "erw": 0,
          "kind": 0
        }
      ],
      "hinweis": "Kein Preis gefunden – bitte selbst eintragen. Sonderregel laut AGB; konkrete Veranstaltungstermine, Kontingent und Buchungsprozess vorab klären. Preisstand: Ticket hängt von Veranstaltung und Sitzplatz ab.",
      "link": "https://www.freizeitticket.at/tiroler-abende-familie-gundolf-oktoberfest/"
    },
    {
      "id": "volkskunstmuseum",
      "name": "Tiroler Volkskunstmuseum",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzelticket-pro-haus",
          "name": "Einzelticket pro Haus",
          "erw": 9.0,
          "kind": 0.0
        }
      ],
      "hinweis": "Tiroler Landesmuseen: 3 Zutritte pro Haus und Saison. Kinder und Jugendliche unter 19 ohnehin frei (Kinderpreis 0 €). Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/volkskunstmuseum/"
    },
    {
      "id": "zeughaus",
      "name": "Zeughaus",
      "gemeinde": "Innsbruck",
      "kat": "museum",
      "tickets": [
        {
          "id": "einzelticket-pro-haus",
          "name": "Einzelticket pro Haus",
          "erw": 9.0,
          "kind": 0.0
        }
      ],
      "hinweis": "Tiroler Landesmuseen: 3 Zutritte pro Haus und Saison. Kinder und Jugendliche unter 19 ohnehin frei (Kinderpreis 0 €). Preisstand: Tarif online geprüft 2026.",
      "link": "https://www.freizeitticket.at/zeughaus/"
    }
  ];
  root.FZ_ORTE_VORLAGE = ORTE;
  if (typeof module !== 'undefined' && module.exports) module.exports = ORTE;
})(typeof globalThis !== 'undefined' ? globalThis : this);
