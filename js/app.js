if (!!navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.info("service worker registered"))
    .catch(err => console.error("service worker not registered", err));
}
