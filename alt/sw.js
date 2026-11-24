// /alt/ gibt es nicht mehr; FreshPlan liegt wieder unter der Hauptadresse. Abmelden und offene Seiten neu laden.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.registration.unregister().then(() => self.clients.matchAll()).then((cs) => cs.forEach((c) => c.navigate(c.url)))));
