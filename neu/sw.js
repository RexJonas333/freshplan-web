// FreshPlan 2 liegt jetzt unter der Hauptadresse. Dieser Service Worker meldet sich ab und lädt offene Seiten neu.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("fp2-")).map((k) => caches.delete(k)))).then(() => self.registration.unregister()).then(() => self.clients.matchAll()).then((cs) => cs.forEach((c) => c.navigate(c.url)))));
