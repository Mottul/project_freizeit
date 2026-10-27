---
name: preise-aktualisieren
description: Freizeitticket-Tarife für eine neue Saison oder Orte/Einzelpreise in data.js aktualisieren. Verwenden, wenn neue Preise erscheinen (meist Ende September) oder Partner dazukommen/wegfallen.
---

# Preise aktualisieren

1. **Tarife:** Quelle ist <https://www.freizeitticket.at/ticket/preise/> (Vorverkauf meist
   1.–31. Oktober, Normaltarif ab 1. November). In `data.js` → `TARIFE` neue Einträge mit Saison im
   Namen anlegen; `id` neu vergeben (gespeicherte Einstellungen verweisen auf die `id`).
   Voreinstellung in `app.js` (`VORGABE.personen`) auf den neuen Vorverkaufs-Familientarif setzen.
2. **Orte:** Partnerliste auf freizeitticket.at abgleichen. `id` eines bestehenden Orts **nie
   ändern** (Besuche verweisen darauf); neue Orte mit neuer, eindeutiger `id`; Ticket-`id`s je Ort
   eindeutig. Preise sind Richtwerte – Kommentar im Kopf von `data.js` mit Stand aktualisieren.
3. Bestehende Nutzer behalten ihre gespeicherten Orte; neue Vorlagen bekommen sie über
   *Mehr → Orte-Vorlage wiederherstellen*. Darauf in der Antwort hinweisen.
4. README-Preistabelle anpassen, `sw.js` `CACHE` hochzählen, `/abschluss-check`.
