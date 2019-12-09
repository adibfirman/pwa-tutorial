const APP_NAME = "food-ninja";
const VERSION_APP = "0.0.1";
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
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// install event
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_FILES).then(cache => {
      console.log("cached");
      cache.addAll(CACHE_FILES);
    })
  );
});

// activate event
self.addEventListener("activate", e => {
  // console.log("service worker has been activated");
});

// fetch event
self.addEventListener("fetch", e => {
  // console.log("service worker fetching", e);
});
