/* Ilberiz Techz service worker
 * - App shell, DPP engines and data: network-first (always fresh online), cached copy when offline.
 * - PDF notes: cache-first. A note opened once keeps working offline (also serves Range requests from cache).
 * - PDF.js engine, icons and Google Fonts: cache-first / stale-while-revalidate.
 * Bump VERSION together with the ?v= numbers in index.html.
 */
const VERSION = '14.6';
const SHELL = 'ilb-shell-' + VERSION;
const NOTES = 'ilb-notes-v1';
const PAGES = 'ilb-pages-v1';
const STATIC = 'ilb-static-v1';
const FONTS = 'ilb-fonts-v1';

const SHELL_FILES = [
  './',
  'index.html',
  'style.css?v=' + VERSION,
  'script.js?v=' + VERSION,
  'data.js?v=' + VERSION,
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL)
      .then((c) => c.addAll(SHELL_FILES))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ilb-shell-') && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
}

async function networkFirst(request, cacheName, isNavigation) {
  const cache = await caches.open(cacheName);
  try {
    // Revalidate with the server (cheap 304s) so a stale HTTP-cache copy never wins.
    const fresh = isNavigation ? request : new Request(request, { cache: 'no-cache' });
    const response = await Promise.race([fetch(fresh), timeout(isNavigation ? 6000 : 8000)]);
    if (response && response.ok && response.type === 'basic') {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (err) {
    const cached = (await cache.match(request)) ||
      (await caches.match(request, { ignoreSearch: isNavigation })) ||
      (isNavigation ? await caches.match('index.html') : undefined);
    if (cached) return cached;
    if (isNavigation) {
      return new Response(
        '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font:16px system-ui;background:#0F1216;color:#ECEFF3;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px"><div><h2>You are offline</h2><p>This page has not been saved on this device yet. Connect to the internet once and it will work offline next time.</p><p><a style="color:#FFD43B" href="./">Back to home</a></p></div>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
    throw err;
  }
}

async function rangeFromCache(request, cached) {
  const header = request.headers.get('range') || '';
  const m = /bytes=(\d*)-(\d*)/.exec(header);
  const blob = await cached.blob();
  const size = blob.size;
  if (!m) return new Response(blob, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Length': String(size) } });
  let start;
  let end;
  if (m[1] === '') {
    start = Math.max(0, size - Number(m[2] || 0));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
  }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  }
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes'
    }
  });
}

async function noteStrategy(request) {
  const cache = await caches.open(NOTES);
  const key = request.url.split('#')[0].split('?')[0];
  const cached = await cache.match(key);
  if (cached) {
    if (request.headers.has('range')) return rangeFromCache(request, cached);
    return cached;
  }
  if (request.headers.has('range')) return fetch(request);
  const response = await fetch(request);
  if (response && response.status === 200 && response.type === 'basic') {
    cache.put(key, response.clone()).catch(() => {});
  }
  return response;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(() => {});
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    const path = url.pathname.toLowerCase();
    if (path.endsWith('.pdf')) {
      event.respondWith(noteStrategy(request));
      return;
    }
    if (path.includes('/vendor/') || path.includes('/icons/') || path.includes('/sounds/')) {
      event.respondWith(cacheFirst(request, STATIC));
      return;
    }
    if (request.mode === 'navigate') {
      const isShell = /\/(index\.html)?$/.test(url.pathname) && url.pathname.split('/').filter(Boolean).length <= 1;
      event.respondWith(networkFirst(request, isShell ? SHELL : PAGES, true));
      return;
    }
    const isShellAsset = /\/(style\.css|script\.js|data\.js|data\.json|manifest\.webmanifest)$/.test(path);
    event.respondWith(networkFirst(request, isShellAsset ? SHELL : PAGES, false));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, FONTS));
  }
});
