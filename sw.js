const APP_NAME = "food-ninja";
const VERSION_APP = "v1";
const CACHE_NAME = `${APP_NAME}-${VERSION_APP}`;
const DYNAMIC_CACHE_NAME = `${APP_NAME}-dynamic-${VERSION_APP}`;
const CACHE_FILES = [
  "/",
  "/index.html",
  "/pages/fallback.html",
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

const limitAreCaches = ({ name, limit }) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > limit) {
        cache.delete(keys[0]).then(limitAreCaches({ name, limit }));
      }
    });
  });
};

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
        keys
          .filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", e => {
  e.respondWith(
    caches
      .match(e.request)
      .then(cache => {
        return (
          cache ||
          fetch(e.request).then(res => {
            caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              cache.put(e.request.url, res.clone());
              limitAreCaches({ name: DYNAMIC_CACHE_NAME, limit: 50 });
            });

            return res.clone();
          })
        );
      })
      .catch(() => caches.match("/pages/fallback.html"))
  );
});
