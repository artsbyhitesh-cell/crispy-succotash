const CACHE_NAME = "hitesh-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./HITESH.jpeg",
  "./Hitu.jpg",
  "./Logo.jpeg",
  "./Watermark.png"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache opened");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate (delete old cache)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch (serve from cache first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("./index.html");
      })
  );
});
