const APP_NAME = "food-ninja";
const VERSION_APP = "v3";
const CACHE_NAME = `${APP_NAME}-${VERSION_APP}`;
const CACHE_FILES = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/manifest.json",
  "/img/icons/icon-144x144.png"
];

// install event
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(CACHE_FILES);
    })
  );
});

// activate event
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cache => {
      return cache || fetch(e.request);
    })
  );
});
