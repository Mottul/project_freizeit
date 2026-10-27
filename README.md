# Freizeitbilanz

Mini-PWA, die zeigt, ob sich das **Freizeitticket Tirol** rentiert – voreingestellt für
**1 Erwachsenen + 2 Kinder** (Familienpreis).

- **Erfassen:** Ort suchen (Bergbahn, Schwimmbad, Museum, Eislaufen …), Ticket wählen, Anzahl
  Erwachsene/Kinder einstellen – das Datum von heute ist schon eingetragen.
- **Bilanz:** Wert der Einzeltickets gegen den Preis des Freizeittickets, mit Fortschrittsbalken bis
  zur Gewinnzone, Aufschlüsselung je Ticket (Erwachsene/Kinder), Verlauf, Kategorien und Top-Orten.
- **Besuche:** nach Monat gruppiert, bearbeiten und löschen.
- **Mehr:** Ticketpreis und Zeitraum, Orte und Preise pflegen, Backup, Hell/Dunkel.

Alles läuft offline, die Daten bleiben ausschließlich lokal auf dem Gerät.

## Preise

Freizeitticket Tirol 2026/27 laut [freizeitticket.at](https://www.freizeitticket.at/ticket/preise/):

| | Vorverkauf (1.–31.10.2026) | Normaltarif (ab 1.11.2026) |
|---|---|---|
| Erwachsene | 789 € | 908 € |
| Kind – Familienpreis | 155 € | 178 € |
| Kind – Einzelpreis | 410 € | 472 € |

Voreinstellung: Vorverkauf mit Familienpreis → 789 € + 2 × 155 € = **1.099 €**. In den
Einstellungen umstellbar.

Die **Orte und Einzelpreise** in `data.js` sind eine Vorlage mit Richtwerten (ohne Gewähr) rund um
Innsbruck. Jeder Preis lässt sich beim Erfassen oder unter *Mehr → Orte & Preise* korrigieren; die
App merkt sich den zuletzt verwendeten Preis. Neue Orte legt man direkt aus der Suche an.

## Veröffentlichen (GitHub Pages)

1. Im Repo **Settings → Pages** → *Deploy from a branch*, Branch `main`, Ordner `/ (root)`.
2. Nach ca. 1 Minute läuft die App unter `https://<name>.github.io/project_freizeit/`.
3. Am Handy in Chrome öffnen → Menü **⋮ → App installieren** (iPhone: Safari → Teilen →
   *Zum Home-Bildschirm*). Einmal online öffnen, danach geht alles offline.

Benötigt werden nur: `index.html`, `styles.css`, `data.js`, `bilanz.js`, `app.js`, `sw.js`,
`manifest.json`, `icon.svg`, `icon-maskable.svg`.

**Update ausrollen:** Dateien ändern, in `sw.js` die `CACHE`-Version erhöhen, pushen. Die
installierte App holt die neue Version beim nächsten Start.

## Entwicklung

Kein Build, keine Abhängigkeiten.

```bash
npm run serve   # http://localhost:8080
npm test        # Logik-Tests (node --test)
npm run e2e     # Browser-Rauchtest mit Playwright (optional: Ordner für Screenshots)
```

Datensicherung: *Mehr → Backup exportieren* (JSON, am Handy über das Teilen-Menü in die Cloud).
