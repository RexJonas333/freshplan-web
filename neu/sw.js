// Service Worker: App-Hülle vorab, Bilder beim ersten Ansehen, Server-Anfragen nie aus dem Cache.
const V = "fp2-90c77cad99";
const SHELL = ["./","index.html","app.js","app.css","manifest.webmanifest","assets/icon.svg"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("fp2-") && k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (u.pathname.includes("/assets/")) {
    e.respondWith(caches.open(V).then(async (c) => (await c.match(e.request)) || fetch(e.request).then((r) => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
  // Seite und Code: erst Netz, dann Cache (damit Updates sofort ankommen)
  e.respondWith(fetch(e.request).then((r) => { if (r.ok) caches.open(V).then((c) => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
