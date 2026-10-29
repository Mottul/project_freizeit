# CLAUDE.md

Freizeitbilanz (`project_freizeit`): Mini-PWA, die prüft, ob sich das Freizeitticket Tirol für
1 Erwachsenen + 2 Kinder rentiert. Vanilla HTML/CSS/JS ohne Build, offline, Daten nur im
`localStorage`. UI-Sprache und Code-Kommentare sind Deutsch. Vorbild für Aufbau und
Veröffentlichung: `Mottul/haushaltsplan` (GitHub Pages).

## Aufbau

- `index.html` – alle Ansichten (Erfassen, Bilanz, Besuche, Mehr) und Dialoge.
- `orte.js` – **erzeugt** von `scripts/orte_aus_excel.py` aus `quellen/*.xlsx` (Partner, Einzeltarife,
  Hinweise, Link). Nicht von Hand ändern, sondern Generator anpassen und neu erzeugen.
- `data.js` – `TARIFE` (Freizeitticket-Preise), `KATEGORIEN`, `GUELTIGKEIT`, `VORLAGE_VERSION`
  (erhöhen, wenn sich `orte.js` ändert → `FZ.aktualisiereVorlage` hebt bestehende Daten beim Start an;
  eigene und vom Nutzer angepasste Orte (`eigen`/`bearbeitet`) bleiben).
- `bilanz.js` – **reine Logik** ohne DOM (Suche, Bilanz, Prüfung importierter Daten), getestet in
  `tests/bilanz.test.js`. Neue Rechen- oder Prüflogik gehört hierher, nicht in `app.js`.
- `app.js` – Oberfläche und Zustand (`stand` → `localStorage['freizeitbilanz-v1']`).
- `sw.js` – Offline-Cache. **Bei jeder Änderung an App-Dateien `CACHE` hochzählen** und neue
  Dateien in `ASSETS` eintragen.

## Kommandos

```bash
npm test                 # node --test, Logik
npm run e2e -- <ordner>  # Playwright-Rauchtest, Screenshots optional in <ordner>
npm run serve            # lokaler Server
```

## Leitplanken

- Offline und lokal: keine Netzanfragen, keine externen Skripte/Schriften.
- Besuche speichern Preise als Momentaufnahme – spätere Preisänderungen am Ort ändern die
  Bilanz vergangener Besuche nicht.
- Gespeicherte und importierte Daten nur über `FZ.pruefeStand` übernehmen.
- Farben nur über CSS-Variablen in `styles.css` (Hell/Dunkel/Auto), Kategorien in fester Reihenfolge,
  Status (rentiert/nicht) immer mit Symbol + Text.
- Ortspreise sind Recherche-Stand ohne Gewähr und bleiben in der App editierbar (Name, Tickets,
  Preise, Hinweis). Tarife des Freizeittickets mit Quelle und Saison pflegen.

## Skills

`.claude/skills/`: `abschluss-check` (vor jedem Commit), `review-checkliste`, `preise-aktualisieren`.
