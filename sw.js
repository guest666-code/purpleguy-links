/* ====================================================
   PURPLEGUY LINKTREE - SERVICE WORKER (PWA OFFLINE CACHE)
   ==================================================== */

const CACHE_NAME = 'purpleguy-cache-v1';

// Çevrimdışı kullanım için önbelleğe alınacak dosyalar
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/main.js',
  './assets/audio/easter-song.mp3',
  './assets/images/favicon.ico',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. SERVICE WORKER YÜKLENME (INSTALL)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Varlıklar önbelleğe alınıyor...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. SERVICE WORKER ETKİNLEŞTİRME (ACTIVATE) & ESKİ CACHE TEMİZLİĞİ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Eski önbellek temizleniyor:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. İSTEKLERİ YAKALAMA (FETCH) - ÖNCE CACHE, YOKSA AĞDAN ÇEK
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Ağ bağlantısı olmadığında varsayılan olarak ana sayfayı sun
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
