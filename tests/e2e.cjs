// Rauchtest im echten Browser: node tests/e2e.cjs [screenshot-ordner]
// Startet einen lokalen Server, erfasst Besuche, prüft Bilanz, Bearbeiten, Offline-Start.
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const ROOT = path.join(__dirname, '..');
const OUT = process.argv[2] || null;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };

function server() {
  return new Promise((resolve) => {
    const s = http.createServer((req, res) => {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const datei = path.join(ROOT, p === '/' ? 'index.html' : p);
      if (!datei.startsWith(ROOT) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(datei)] || 'application/octet-stream' });
      fs.createReadStream(datei).pipe(res);
    });
    s.listen(0, '127.0.0.1', () => resolve(s));
  });
}

(async () => {
  const srv = await server();
  const url = `http://127.0.0.1:${srv.address().port}/`;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'de-AT' });
  const page = await ctx.newPage();
  const fehler = [];
  page.on('pageerror', (e) => fehler.push(e.message));
  page.on('console', (m) => m.type() === 'error' && fehler.push(m.text()));
  const shot = async (name) => OUT && page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });

  await page.goto(url);
  // Datum = heute (Ortszeit)
  const heute = await page.evaluate(() => window.FZ.heute());
  assert.equal(await page.inputValue('#f-datum'), heute);
  assert.match(await page.textContent('#header-saldo'), /1\.099,00/);
  await shot('01-start');

  // Suche → Nordkette → Hafelekar, 1 Erw. + 2 Kinder (Vorgabe)
  await page.fill('#f-suche', 'nordk');
  await page.waitForSelector('[data-ort="nordkette"]');
  await shot('02-suche');
  await page.click('[data-ort="nordkette"]');
  assert.equal(await page.textContent('#f-erw'), '1');
  assert.equal(await page.textContent('#f-kind'), '2');
  assert.match(await page.textContent('#f-summe'), /96,00/);
  await shot('03-formular');
  await page.click('#f-speichern');
  await page.waitForSelector('#toast:not([hidden])');
  assert.match(await page.textContent('#toast'), /96,00/);
  assert.ok(await page.isHidden('#ticket-form'));

  // Bad mit korrigiertem Preis, nur 1 Kind; Umlaut-Suche
  await page.fill('#f-suche', 'hottinger');
  assert.equal(await page.locator('[data-ort]').count(), 0, 'ö ohne e soll nicht matchen (nur ö oder oe)');
  await page.fill('#f-suche', 'höttinger');
  await page.click('[data-ort="hallenbad-hoettinger-au"]');
  await page.click('[data-stepper="kind"] [data-step="-1"]');
  await page.fill('#f-preis-erw', '7,20');
  assert.match(await page.textContent('#f-summe'), /9,90/);
  await page.click('#f-speichern');

  // Preis gemerkt
  await page.fill('#f-suche', 'höttinger');
  await page.click('[data-ort="hallenbad-hoettinger-au"]');
  assert.equal(await page.inputValue('#f-preis-erw'), '7,20');
  await page.click('#f-ort-wechseln');

  // Neuer Ort über die Suche
  await page.fill('#f-suche', 'Alpenzoo');
  await page.click('.result-item.neu');
  await page.fill('#o-gemeinde', 'Innsbruck');
  await page.selectOption('#o-kat', 'sonstiges');
  const zeile = page.locator('#o-tickets .o-ticket-row').first();
  await zeile.locator('input').nth(1).fill('15');
  await zeile.locator('input').nth(2).fill('7,5');
  await page.click('#o-speichern');
  await page.waitForSelector('#ticket-form:not([hidden])');
  assert.equal(await page.textContent('#f-ort-name'), 'Alpenzoo');
  await page.fill('#f-datum', '2026-11-15');
  await page.click('#f-speichern');

  // Bilanz
  await page.click('.nav-btn[data-view="bilanz"]');
  const b = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('freizeitbilanz-v1'));
    return window.FZ.berechneBilanz(s.besuche, s.einstellungen, window.FZ_DATEN.KATEGORIEN);
  });
  assert.equal(b.anzahl, 3);
  assert.equal(b.wert, 96 + 9.9 + 30);
  assert.match(await page.textContent('#b-saldo'), /963,10/);
  assert.match(await page.textContent('#b-status'), /Noch nicht rentiert/);
  assert.equal(await page.locator('#b-kategorien .bar-row').count(), 3);
  assert.equal(await page.locator('#b-verlauf svg').count(), 1);
  await page.locator('#v-hit').scrollIntoViewIfNeeded();
  await page.hover('#v-hit', { position: { x: 150, y: 40 } });
  assert.ok(await page.isVisible('#chart-tooltip'));
  await shot('04-bilanz');

  // Bearbeiten: Alpenzoo auf 2 Erw.
  await page.click('.nav-btn[data-view="besuche"]');
  await shot('05-besuche');
  const zoo = page.locator('#besuche-gruppen .besuch-item', { hasText: 'Alpenzoo' });
  await zoo.locator('[data-edit]').click();
  assert.equal(await page.inputValue('#f-datum'), '2026-11-15');
  await page.click('[data-stepper="erw"] [data-step="1"]');
  await page.click('#f-speichern');
  await page.waitForSelector('#view-besuche[data-active="true"]');
  assert.match(await page.locator('#besuche-gruppen .besuch-item', { hasText: 'Alpenzoo' }).textContent(), /45,00/);

  // Rentiert: viele Skitage
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('freizeitbilanz-v1'));
    for (let i = 0; i < 9; i++) s.besuche.push({ id: 'ski' + i, datum: '2027-01-' + String(10 + i), ortId: 'axamer-lizum', ortName: 'Axamer Lizum', kat: 'bergbahn', ticket: 'Skitageskarte', erw: 1, kind: 2, preisErw: 62, preisKind: 31 });
    localStorage.setItem('freizeitbilanz-v1', JSON.stringify(s));
  });
  await page.reload();
  await page.click('.nav-btn[data-view="bilanz"]');
  assert.match(await page.textContent('#b-status'), /Hat sich rentiert/);
  await shot('06-bilanz-rentiert');

  // Dunkel
  await page.emulateMedia({ colorScheme: 'dark' });
  await shot('07-bilanz-dunkel');
  await page.click('.nav-btn[data-view="einstellungen"]');
  await shot('08-einstellungen-dunkel');
  await page.emulateMedia({ colorScheme: 'light' });

  // Keine horizontale Scrollleiste am Handy
  for (const v of ['erfassen', 'bilanz', 'besuche', 'einstellungen']) {
    await page.click(`.nav-btn[data-view="${v}"]`);
    const breit = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(breit, false, 'horizontal scrollbar in ' + v);
  }

  // Offline: Service Worker cached, Seite lädt ohne Server
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await ctx.setOffline(true);
  await page.reload();
  assert.equal(await page.textContent('.brand span'), 'Freizeitbilanz');
  assert.ok(await page.evaluate(() => typeof window.FZ.berechneBilanz === 'function'));
  await ctx.setOffline(false);

  assert.deepEqual(fehler, []);
  await browser.close();
  srv.close();
  console.log('E2E ok');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
