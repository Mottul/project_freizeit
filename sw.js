// Version bei jeder Änderung an App-Dateien erhöhen, sonst bleibt der alte Stand im Cache.
const CACHE = 'freizeitbilanz-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './bilanz.js',
  './app.js',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Seite: erst Netz (frische Version), offline aus dem Cache
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }

  // Dateien: aus dem Cache, im Hintergrund aktualisieren
  event.respondWith(
    caches.match(req).then((cached) => {
      const netz = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || netz;
    }),
  );
});
