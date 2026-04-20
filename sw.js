const CACHE_NAME = "hitesh-app-v1";

const urlsToCache = [
  "./",
  "./Hitesh.html",
  "./HITESH.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});