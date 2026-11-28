// Offline support: the app shell is cached, so it opens with no connection or a slow one.
const VERSION = "workouts-v117";
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

// Waits for a request, but gives up after ms so a weak signal can't hold the app on a blank screen.
const within = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(() => r(null), ms))]);

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The AI hold finder model (75 MB): the app downloads and caches it itself, on request, so leave it alone here.
  if (url.origin === location.origin && url.pathname.includes("/models/")) return;

  // The app itself: use the network when it answers quickly so updates arrive; otherwise open the saved copy
  // straight away and save the fresh one for next time. Only good responses are saved.
  if (url.origin === location.origin) {
    const net = fetch(req, { cache: "no-cache" }).then((res) => {
      if (res && res.ok && res.type === "basic") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    });
    e.respondWith((async () => {
      const nav = req.mode === "navigate";
      const saved = (await caches.match(req)) || (nav ? (await caches.match("./index.html")) || (await caches.match("./")) : null);
      if (!saved) return net.catch(() => new Response("You're offline and the app isn't saved on this phone yet.", { status: 503, headers: { "Content-Type": "text/plain" } }));
      const res = await within(net.catch(() => null), nav ? 3000 : 5000);
      return res && res.ok ? res : saved;
    })());
    e.waitUntil(net.then(() => {}, () => {}));
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

  // Fonts and the map library: cache after first use; never let a failed font fetch break the page.
  if (/fonts\.(googleapis|gstatic)\.com|unpkg\.com/.test(url.host)) {
    e.respondWith(caches.open(VERSION).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }))).catch(() => fetch(req)));
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
