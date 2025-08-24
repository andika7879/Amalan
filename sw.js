// sw.js

// Nama cache dan versi. Ubah versi jika ada pembaruan pada file.
const CACHE_NAME = 'amalan-cache-v1';

// Daftar file yang akan di-cache saat pertama kali instalasi
const urlsToCache = [
  '/', // Ini akan me-cache file index.html di root
  'index.html',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Scheherazade+New:wght@400;700&display=swap'
  // Font dari Google Fonts akan di-cache secara otomatis saat diminta
];

// 1. Proses Instalasi Service Worker (Caching aset)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Proses Fetch (Menyajikan aset dari cache jika tersedia)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ditemukan di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan (internet)
        return fetch(event.request);
      })
  );
});
