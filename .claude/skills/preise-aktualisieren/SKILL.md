---
name: preise-aktualisieren
description: Freizeitticket-Tarife für eine neue Saison oder Orte/Einzelpreise in data.js aktualisieren. Verwenden, wenn neue Preise erscheinen (meist Ende September) oder Partner dazukommen/wegfallen.
---

# Preise aktualisieren

1. **Tarife:** Quelle ist <https://www.freizeitticket.at/ticket/preise/> (Vorverkauf meist
   1.–31. Oktober, Normaltarif ab 1. November). In `data.js` → `TARIFE` neue Einträge mit Saison im
   Namen anlegen; `id` neu vergeben (gespeicherte Einstellungen verweisen auf die `id`).
   Voreinstellung in `app.js` (`VORGABE.personen`) auf den neuen Vorverkaufs-Familientarif setzen.
2. **Orte:** Quelle ist eine Arbeitsmappe in `quellen/` mit den Blättern „Partnerliste“ und
   „Reguläre Preise“ (Aufbau wie `Freizeitticket_2026-27.xlsx`). Neu erzeugen:
   `python3 -I scripts/orte_aus_excel.py quellen/<datei>.xlsx > orte.js` (braucht openpyxl).
   Abweichende Partnernamen zwischen den Blättern in `TARIF_ZU_PARTNER` zuordnen; IDs bestehender
   Orte **nie ändern** (Besuche verweisen darauf) – Sonderfälle in `ID_FEST`. Ausgabe prüfen:
   `npm test` (Plausibilität: keine Saison-/Mehrtageskarten, Preise im Rahmen, alte IDs vorhanden).
3. In `data.js` `VORLAGE_VERSION` erhöhen: Installierte Apps übernehmen die neue Liste beim Start,
   eigene und angepasste Orte bleiben. Bei neuer Saison auch `GUELTIGKEIT` anpassen.
4. README-Preistabelle anpassen, `sw.js` `CACHE` hochzählen, `/abschluss-check`.
