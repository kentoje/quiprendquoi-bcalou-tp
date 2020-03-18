const isPartyPage = url => /party\/[a-zA-Z0-9]*$/.test(url);

addEventListener('install', event => {
  event.waitUntil(
    caches.open('offline').then((cache) => {
      cache.add('offline.html');
    })
  );
});

addEventListener('fetch', event => {
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (isPartyPage(event.request.url)) {
            const copy = response.clone();
            caches
              .open('parties')
              .then(cache => cache.put(event.request, copy));
            return response;
          } else {
            return response;
          }
        })
        .catch(_ => {
          if (isPartyPage(event.request.url)) {
            return caches
              .match(event.request)
              .catch(_ => caches.match('offline.html'));
          } else {
            return caches.match('offline.html');
          }
        })
    );
  }
});