/* JZLotto service worker — נוצר אוטומטית. גרסה: d8a3faf40f79 */
const CACHE = "jzlotto-d8a3faf40f79";
const FILES = ["./","icons/apple-touch-icon.png","icons/favicon.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest","vendor/fonts/fonts.css","vendor/fonts/heebo-hebrew-400-normal.woff2","vendor/fonts/heebo-hebrew-500-normal.woff2","vendor/fonts/heebo-hebrew-700-normal.woff2","vendor/fonts/heebo-hebrew-800-normal.woff2","vendor/fonts/heebo-latin-400-normal.woff2","vendor/fonts/heebo-latin-500-normal.woff2","vendor/fonts/heebo-latin-700-normal.woff2","vendor/fonts/heebo-latin-800-normal.woff2","vendor/fonts/heebo-latin-ext-400-normal.woff2","vendor/fonts/heebo-latin-ext-500-normal.woff2","vendor/fonts/heebo-latin-ext-700-normal.woff2","vendor/fonts/heebo-latin-ext-800-normal.woff2","vendor/fonts/jetbrains-mono-latin-500-normal.woff2","vendor/fonts/jetbrains-mono-latin-600-normal.woff2","vendor/fonts/jetbrains-mono-latin-700-normal.woff2","vendor/fonts/jetbrains-mono-latin-ext-500-normal.woff2","vendor/fonts/jetbrains-mono-latin-ext-600-normal.woff2","vendor/fonts/jetbrains-mono-latin-ext-700-normal.woff2","vendor/react-dom.production.min.js","vendor/react.production.min.js","vendor/tailwind.css","vendor/tesseract/eng.traineddata.gz","vendor/tesseract/tesseract-core-lstm.wasm.js","vendor/tesseract/tesseract-core-simd-lstm.wasm.js","vendor/tesseract/tesseract.min.js","vendor/tesseract/worker.min.js","vendor/xlsx.bundle.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("jzlotto-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).catch(() => (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))
  );
});
