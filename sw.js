/* Service Worker — לוטו ישראל PWA
   Cache-first for app shell; network-first for CDN scripts.
   עדכן CACHE_VERSION בכל שינוי משמעותי בקבצים.
*/
const CACHE_VERSION = "lotto-v20261026-01";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-16.png",
  "./icon-32.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

const CDN_PREFIXES = [
  "https://unpkg.com/",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/",
  "https://fonts.gstatic.com/"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isCdn(url) {
  return CDN_PREFIXES.some((p) => url.startsWith(p));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = req.url;

  // App shell: cache-first
  if (url.includes(self.location.origin) || req.mode === "navigate") {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          if (res.ok && req.url.startsWith(self.location.origin)) {
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => caches.match("./index.html"));
      })
    );
    return;
  }

  // CDN: stale-while-revalidate
  if (isCdn(url)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) =>
        cache.match(req).then((cached) => {
          const network = fetch(req).then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
