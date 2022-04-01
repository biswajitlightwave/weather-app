const CACHE_NAME = 'version-1';
const urlToCache = ['index.html', 'offline.html'];

const self = this;

// install sw
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('opened cache');

      return cache.addAll(urlToCache);
    })
  );
});

// listen for request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// active the sw
self.addEventListener('activate', (event) => {
  const cacheWhilelist = [];
  cacheWhilelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhilelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
