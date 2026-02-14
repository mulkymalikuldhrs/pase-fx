// ============================================================================
// PASE FX SERVICE WORKER
// Progressive Web App (PWA) - Offline Support
// ============================================================================

const CACHE_NAME = 'pase-fx-v1';
const OFFLINE_URL = '/offline.html';

// ============================================================================
// INSTALL EVENT - Cache Core Assets
// ============================================================================
self.addEventListener('install', (event) => {
  console.log('[PWA] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Caching core assets');
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/logo.png',
        '/index.css'
      ]);
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// ============================================================================
// ACTIVATE EVENT - Clean Old Caches
// ============================================================================
self.addEventListener('activate', (event) => {
  console.log('[PWA] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[PWA] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  
  // Take control immediately
  self.clients.claim();
});

// ============================================================================
// FETCH EVENT - Network First, Fallback to Cache
// ============================================================================
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseClone = response.clone();
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          
          // Return a default response for other requests
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// ============================================================================
// PUSH NOTIFICATIONS (For Future Implementation)
// ============================================================================
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'New update from Pasè FX',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      { action: 'open', title: 'Buka' },
      { action: 'close', title: 'Tutup' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Pasè FX', options)
  );
});

// ============================================================================
// NOTIFICATION CLICK HANDLER
// ============================================================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

console.log('[PWA] Service Worker loaded');
