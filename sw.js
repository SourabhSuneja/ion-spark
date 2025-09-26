const CACHE_NAME = 'ion-spark-v1.0.0-tmp'; // bump version when deploying
const urlsToCache = [
  '/ion-spark/',
  '/ion-spark/index.html',
  '/ion-spark/css/style.css',
  '/ion-spark/js/script.js',
  '/ion-spark/css/dialog.css',
  '/ion-spark/css/word-card-styles.css',
  '/ion-spark/js/dialog.js',
  '/ion-spark/js/supabase-crud.js',
  '/ion-spark/js/word-card.js',
  '/ion-spark/favicon-16x16.png',
  '/ion-spark/favicon-32x32.png',
  '/ion-spark/android-chrome-192x192.png',
  '/ion-spark/android-chrome-512x512.png',
  '/ion-spark/apple-touch-icon.png',
  '/ion-spark/favicon.ico',
  // External resources
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
];

// Install event - precache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activate new SW immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  const req = event.request;

  // Case 1: Main navigations (index.html etc.)
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, '/ion-spark/index.html'));
    return;
  }

  // Case 2: Iframe pages (HTML docs, but not top-level navigation)
  if (req.destination === 'document') {
    event.respondWith(networkFirst(req));
    return;
  }

  // Case 3: Other resources (CSS, JS, images) → cache-first
  event.respondWith(cacheFirst(req));
});

// Background sync placeholder
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications
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

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const notificationID = event.notification.data
    ? event.notification.data.notificationID
    : null;

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
        const urlToOpen = notificationID
          ? `/ion-spark/?notification_id=${notificationID}`
          : '/ion-spark/';
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Auto-reload all open clients when new SW activates
self.addEventListener('controllerchange', () => {
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
    clientList.forEach(client => client.navigate(client.url));
  });
});

function doBackgroundSync() {
  // Implement background sync logic here
  return Promise.resolve();
}

// ---- Strategies ----
function cacheFirst(req) {
  return caches.match(req).then(response => {
    return (
      response ||
      fetch(req).then(networkResp => {
        if (
          networkResp &&
          networkResp.status === 200 &&
          networkResp.type === 'basic'
        ) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, networkResp.clone()));
        }
        return networkResp;
      })
    );
  });
}

function networkFirst(req, fallbackUrl) {
  return fetch(req)
    .then(networkResp => {
      if (networkResp && networkResp.status === 200) {
        caches.open(CACHE_NAME).then(cache => cache.put(req, networkResp.clone()));
        return networkResp;
      }
      return caches.match(req);
    })
    .catch(() => {
      if (fallbackUrl) {
        return caches.match(fallbackUrl);
      }
      return caches.match(req);
    });
}