const CACHE_NAME = 'app-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon-192.png',
  '/icon-512.png'
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
  if (url.pathname === '/api/register') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Login API also needs Internet for first-time verification
  if (url.pathname === '/api/login') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
