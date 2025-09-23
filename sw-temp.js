// ---------------- CACHE ------------------
const CACHE_NAME = 'ion-spark-v1.0.0-temp4';
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      return fetch(event.request.clone()).then(fetchResponse => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') return fetchResponse;

        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        return fetchResponse;
      }).catch(err => {
        if (event.request.destination === 'document') {
          return caches.match('/ion-spark/index.html');
        }
        throw err;
      });
    })
  );
});

// ---------------- BACKGROUND SYNC ------------------
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement your background sync logic
  return Promise.resolve();
}

// ---------------- INDEXEDDB HELPERS ------------------
function openStudentDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('IonSparkDB', 1);
    request.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('student')) {
        db.createObjectStore('student', { keyPath: 'id' });
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}

async function getStudentInfo() {
  const db = await openStudentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('student', 'readonly');
    const store = tx.objectStore('student');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result[0] || {});
    request.onerror = () => reject(request.error);
  });
}

async function saveStudentInfo(student) {
  const db = await openStudentDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('student', 'readwrite');
    const store = tx.objectStore('student');
    store.put(student);
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  });
}

// ---------------- HANDLE MESSAGES FROM MAIN JS ------------------
self.addEventListener('message', async event => {
  if (event.data.type === 'SAVE_STUDENT') {
    await saveStudentInfo(event.data.student);
  }
});

// ---------------- PUSH NOTIFICATIONS ------------------
self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'Ion Spark', body: event.data.text(), data: { notificationID: 'default' } };
  }

  event.waitUntil((async () => {
    const student = await getStudentInfo();

    let showNotification = false;

    // 1️⃣ Match by student ID
    if (data.studentIds && student.id && data.studentIds.includes(student.id)) showNotification = true;

    // 2️⃣ Match by grade + section
    else if (data.grade && data.section) {
      if (student.grade == data.grade && student.section == data.section) showNotification = true;
    }

    // 3️⃣ Match by grade only
    else if (data.grade) {
      if (student.grade == data.grade) showNotification = true;
    }

    if (!showNotification) return;

    const options = {
      body: data.body || 'New update!',
      icon: '/ion-spark/android-chrome-192x192.png',
      badge: '/ion-spark/favicon-32x32.png',
      vibrate: [200, 100, 200],
      data: data.data
    };

    await self.registration.showNotification(data.title || 'Ion Spark', options);
  })());
});

// ---------------- NOTIFICATION CLICK ------------------
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const notificationID = event.notification.data ? event.notification.data.notificationID : null;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('/ion-spark/') && 'focus' in client) {
          client.focus();
          if (notificationID) client.postMessage({ type: 'NOTIFICATION_CLICK', id: notificationID });
          return;
        }
      }

      if (clients.openWindow) {
        const urlToOpen = notificationID ? `/ion-spark/?notification_id=${notificationID}` : '/ion-spark/';
        return clients.openWindow(urlToOpen);
      }
    })
  );
});