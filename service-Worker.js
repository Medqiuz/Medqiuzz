const CACHE_NAME = 'medquiz-cache-v1';

const FILES_TO_CACHE = [
  '/Medqiuzz/',
  '/Medqiuzz/index.html',
  '/Medqiuzz/style.css',
  '/Medqiuzz/script.js',
  '/Medqiuzz/icon-192.png',
  '/Medqiuzz/icon-512.png'
];

// Install: cache app shell
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: network for registration, cache-first for everything else
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Registration API always needs Internet
  if (url.pathname.endsWith('/api/register')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Login API also needs Internet
  if (url.pathname.endsWith('/api/login')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
