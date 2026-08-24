const CACHE_NAME = 'purpleguy-pwa-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/main.js',
  './manifest.json',
  './assets/images/favicon.ico'
];

// Yükleme Aşaması (Dosyaları Önbelleğe Al)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Etkinleştirme Aşaması (Eski Cache'leri Temizle)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Çevrimdışı Çalışma / Cache'den Çekme
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
