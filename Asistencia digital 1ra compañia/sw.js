const CACHE = 'asistencia-1cia-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll([
        'asistencia_primera_compania_v3.html',
        'manifest.json',
        '../img-logo-1cia.jpg',
        '../LOGO%20CBC.webp'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
