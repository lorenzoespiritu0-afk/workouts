// Offline support: the app shell is cached, so it opens with no connection.
const VERSION = "workouts-v8";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && !k.startsWith("tiles")).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The app itself: try the network first so updates arrive, fall back to the cache offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Fonts and the map library: cache after first use.
  if (/fonts\.(googleapis|gstatic)\.com|unpkg\.com/.test(url.host)) {
    e.respondWith(caches.open(VERSION).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }))));
    return;
  }

  // Map tiles: keep a small cache of recently viewed areas.
  if (url.host.endsWith("tile.openstreetmap.org")) {
    e.respondWith(caches.open("tiles").then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => {
      c.put(req, res.clone());
      c.keys().then((k) => { if (k.length > 400) c.delete(k[0]); });
      return res;
    }))));
  }
});
