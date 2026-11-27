// Offline support: the app shell is cached, so it opens with no connection.
const VERSION = "workouts-v112";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && !k.startsWith("tiles") && !k.startsWith("pose") && !k.startsWith("models")).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The AI hold finder model (75 MB): the app downloads and caches it itself, on request, so leave it alone here.
  if (url.origin === location.origin && url.pathname.includes("/models/")) return;

  // The app itself: try the network first so updates arrive, fall back to the cache offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req, { cache: "no-cache" }).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // The hold finder's engine (ONNX Runtime Web) is pinned to a version, so keep it for offline use.
  if (/cdnjs\.cloudflare\.com\/ajax\/libs\/onnxruntime-web\//.test(req.url)) {
    e.respondWith(caches.open("models-ort").then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }

  // Motion tracking: the pose library and model never change for a pinned version, so keep them for offline use.
  if (/cdn\.jsdelivr\.net\/npm\/@mediapipe\/|storage\.googleapis\.com\/mediapipe-models\//.test(req.url)) {
    e.respondWith(caches.open("pose-v1").then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }))));
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
