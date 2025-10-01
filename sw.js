// Bump the version number when you deploy a new service worker
const CACHE_NAME = 'ion-spark-v1.0.0.dev.13';
const urlsToCache = [
  '/ion-spark/',
  '/ion-spark/index.html',
  '/ion-spark/css/style.css',
  '/ion-spark/css/offline-overlay.css',
  '/ion-spark/css/install-popup-styles.css',
  '/ion-spark/css/qr-scan.css',
  '/ion-spark/css/dialog.css',
  '/ion-spark/css/word-card-styles.css',
  '/ion-spark/js/script.js',
  '/ion-spark/js/dialog.js',
  '/ion-spark/js/offline-manager.js',
  '/ion-spark/js/pwa-utils.js',
  '/ion-spark/js/qr-scan.js',
  '/ion-spark/js/supabase-crud.js',
  '/ion-spark/js/word-card.js',
  '/ion-spark/favicon-16x16.png',
  '/ion-spark/favicon-32x32.png',
  '/ion-spark/android-chrome-192x192.png',
  '/ion-spark/android-chrome-512x512.png',
  '/ion-spark/apple-touch-icon.png',
  '/ion-spark/favicon.ico',
  // External resources that need to be cached
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js',
  'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js'
];

// --- EVENT LISTENERS ---

// Install event: precache all essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache. Caching files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activate new SW immediately
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open clients
  );
});

// Fetch event: intercept network requests and apply caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests. Ignore all others (like POST, PUT, DELETE, etc.)
  // and let the browser handle them normally.
  if (request.method !== 'GET') {
    return;
  }

  // Apply Network First for top-level navigations AND iframe documents.
  // This ensures both the main page and its embedded pages are always fresh when online.
  if (request.mode === 'navigate' || request.destination === 'iframe' || request.destination === 'document') {
    // A specific fallback is only needed for the main page navigation.
    const fallbackUrl = (request.mode === 'navigate') ? '/ion-spark/index.html' : undefined;
    event.respondWith(networkFirst(request, fallbackUrl));
    return;
  }

  // For all other assets (CSS, JS, images, fonts), use Cache First for speed.
  event.respondWith(cacheFirst(request));
});


// --- CACHING STRATEGIES ---

/**
 * Cache First Strategy:
 * 1. Try to get the response from the cache.
 * 2. If it's in the cache, return it.
 * 3. If not, fetch from the network, cache the response, and then return it.
 */
async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResp = await fetch(req);
    // Check if we received a valid response
    if (networkResp && networkResp.ok) {
      const cache = await caches.open(CACHE_NAME);
      // IMPORTANT: Clone the response before caching it.
      await cache.put(req, networkResp.clone());
    }
    return networkResp;
  } catch (error) {
    console.error('Fetch failed in cacheFirst strategy:', error);
    throw error;
  }
}

/**
 * Network First Strategy:
 * 1. Try to fetch from the network.
 * 2. If successful, cache the response and return it.
 * 3. If the network fails (e.g., offline), return the response from the cache.
 * 4. Provide a fallback URL for navigation requests if everything fails.
 */
async function networkFirst(req, fallbackUrl) {
  try {
    const networkResp = await fetch(req);
    if (networkResp.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(req, networkResp.clone());
      return networkResp;
    }
    // If fetch gives a server error (e.g. 404), try the cache instead.
    const cachedResponse = await caches.match(req);
    return cachedResponse || networkResp;
  } catch (error) {
    console.log('Network fetch failed. Trying cache...');
    const cached = await caches.match(req);
    if (cached) {
      return cached;
    }
    if (fallbackUrl) {
      return caches.match(fallbackUrl);
    }
    throw error;
  }
}


// --- OTHER SERVICE WORKER FUNCTIONALITY ---
// (Your original push and sync handlers are fine and are left unchanged)

self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

self.addEventListener('push', event => {
  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'Ion Spark',
      body: event.data.text(),
      data: { notificationID: 'default' }
    };
  }

  const options = {
    body: data.body || 'New update available!',
    icon: '/ion-spark/android-chrome-192x192.png',
    badge: '/ion-spark/favicon-32x32.png',
    vibrate: [200, 100, 200],
    data: data.data
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Ion Spark', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const notificationID = event.notification.data ?
    event.notification.data.notificationID :
    null;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/ion-spark/') && 'focus' in client) {
          client.focus();
          if (notificationID) {
            client.postMessage({ type: 'NOTIFICATION_CLICK', id: notificationID });
          }
          return;
        }
      }
      if (clients.openWindow) {
        const urlToOpen = notificationID ?
          `/ion-spark/?notification_id=${notificationID}` :
          '/ion-spark/';
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

self.addEventListener('controllerchange', () => {
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
    clientList.forEach(client => client.navigate(client.url));
  });
});

function doBackgroundSync() {
  return Promise.resolve();
}
