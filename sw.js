const C="freshplan-v6",CORE=["./","./index.html","./manifest.webmanifest","./icons/apple-touch-icon.png","./icons/icon-192.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin){if(r.mode==="navigate"||u.pathname.endsWith("/index.html")){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put("./index.html",cp));return res}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})));return}
 if(/fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(u.host))e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res})))});
