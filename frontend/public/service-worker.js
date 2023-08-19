self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.addAll([
        '/offline.html', // Cache the HTML page
        '/offlinelogo.svg', // Cache the SVG image
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match('/offline.html').then((response) => {
        if (response) {
          return response;
        } else {
          return new Response("You're offline, connect to the internet", {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        }
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
