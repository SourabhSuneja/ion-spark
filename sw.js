const CACHE_NAME = 'ion-spark-v1.0.0-temp1';
const urlsToCache = [
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

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources during install:', error);
      })
  );
  self.skipWaiting();
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(error => {
          // Return a fallback page for navigation requests when offline
          if (event.request.destination === 'document') {
            return caches.match('/ion-spark/index.html');
          }
          throw error;
        });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle push notifications (optional)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/ion-spark/android-chrome-192x192.png',
    badge: '/ion-spark/favicon-32x32.png',
    vibrate: [200, 100, 200],
    tag: 'ion-spark-notification',
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Ion Spark', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/ion-spark/')
    );
  }
});

function doBackgroundSync() {
  // Implement background sync logic here
  return Promise.resolve();
}