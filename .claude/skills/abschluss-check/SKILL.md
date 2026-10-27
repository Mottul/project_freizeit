---
name: abschluss-check
description: Prüfung vor dem Abschluss einer Änderung an der Freizeitbilanz – Logik-Tests, Browser-Rauchtest mit Screenshots, Service-Worker-Version. Verwenden, bevor etwas als fertig gemeldet oder committet wird.
---

# Abschluss-Check

(Angepasst aus `Mottul/project_mega`.)

1. **Geänderte Dateien** ansehen: `git status --short`.
2. **Syntax:** `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"`.
3. **Logik:** `npm test` – alles grün. Neue Logik in `bilanz.js` bekommt einen Test.
4. **Browser:** `npm run e2e -- <scratchpad>/shots` und die Screenshots **ansehen** (Hell und
   Dunkel, 390 px breit): abgeschnittene Texte, überlappende Labels, horizontales Scrollen.
   Neue Abläufe in `tests/e2e.cjs` ergänzen.
5. **Offline:** Neue Datei? In `sw.js` → `ASSETS`. Jede Änderung an App-Dateien → `CACHE`-Version
   in `sw.js` erhöhen, sonst sehen installierte Apps den alten Stand.
6. **Doku:** README (Funktionen, Preise) und CLAUDE.md nachziehen.
7. **Bericht:** kurz sagen, was grün ist und was nicht (mit Ausgabe), nichts beschönigen.
