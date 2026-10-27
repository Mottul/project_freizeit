---
name: review-checkliste
description: Projektspezifische Prüfliste für Änderungen an der Freizeitbilanz (Datum/Zeitzone, gespeicherte Daten, Import, Service Worker, Mobil-Layout). Zusätzlich zu /code-review verwenden.
---

# Review-Checkliste Freizeitbilanz

Übernommen und angepasst aus den Review-Befunden von `Mottul/project_mega` und
`Mottul/project_gallery` sowie dem Aufbau von `Mottul/haushaltsplan`.

## Datum

- Datum immer in **Ortszeit** bilden (`FZ.heute()`), nie `toISOString().slice(0, 10)` – das ist
  UTC und zeigt kurz nach Mitternacht den Vortag.
- Die App bleibt am Handy tagelang offen: Das automatisch gesetzte Datum wird beim Zurückkehren
  (`visibilitychange`) nachgezogen, aber nie ein vom Nutzer gewähltes überschrieben.

## Gespeicherte und fremde Daten

- `localStorage` und Backups nur über `FZ.pruefeStand` übernehmen: Feld für Feld prüfen, Kaputtes
  verwerfen statt die ganze Datei abzulehnen, Grenzen für Anzahl und Größe.
- Schlüssel aus fremden Daten nie mit `obj[key]` oder `key in obj` nachschlagen
  („constructor“!) – `Object.prototype.hasOwnProperty.call` bzw. `Set`/`Map`.
- Alles, was in `innerHTML` landet, durch `esc()`. Werte aus Dateien nie ungeprüft ins CSS.
- **Was die App selbst erzeugt, muss ihre eigene Prüfung bestehen** (Test „Vorlage besteht
  Prüfung“): neue Felder in `pruefe…` ergänzen, sonst fallen sie beim nächsten Laden still weg.
- Zerstörende Schritte (Import, Zurücksetzen, Löschen) erst nach Rückfrage und erst nach Erfolg.
- Nach einer Rückfrage (`await frage(…)`) nicht mit einem veralteten Stand weiterarbeiten.
- Mehrere Tabs: `storage`-Ereignis lädt den Stand neu.

## Bilanz

- Besuche speichern Preise als Momentaufnahme; die Bilanz rechnet nie mit aktuellen Ortspreisen.
- Keine Division durch 0 (keine Tickets, keine Besuche) – Test vorhanden.

## Service Worker

- Neue Datei → `ASSETS`; jede Änderung → `CACHE`-Version hoch.
- Nur eigene Herkunft cachen, Seite „Netz zuerst“.

## Mobil-Layout

- Rasterspalten als `minmax(0, 1fr)`, lange Namen mit `text-overflow: ellipsis`.
- SVG-Diagramme in echten Pixeln zeichnen (Breite messen), sonst schrumpft die Schrift am Handy.
- Tests prüfen, dass keine Ansicht horizontal scrollt (`tests/e2e.cjs`).
