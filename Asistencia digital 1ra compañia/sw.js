const CACHE = 'asistencia-1cia-v4';
const STATIC = [
  'manifest.json',
  '../img-logo-1cia.jpg',
  '../LOGO%20CBC.webp'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return caches.open(CACHE).then(function(cache) {
        return cache.addAll(STATIC);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    self.clients.claim().then(function() {
      return self.clients.matchAll({ type: 'window' }).then(function(clients) {
        clients.forEach(function(client) { client.navigate(client.url); });
      });
    })
  );
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (url.includes('voluntarios.json') || url.includes('asistencia_primera_compania')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(function() {
        return caches.match(e.request);
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        return r || fetch(e.request);
      })
    );
  }
});
