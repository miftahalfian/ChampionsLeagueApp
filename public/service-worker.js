importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/icon-192.png', revision: '1' },
    { url: '/icon-512.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '2' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/main.js', revision: '3' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/img/champions-league-logo.png', revision: '1' },
    { url: '/img/team_badge.png', revision: '1' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/pages/'), 
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https:\/\/api.football-data.org\/v2\/'),
    workbox.strategies.networkFirst({
        cacheName: 'football_api'
    })
)

self.addEventListener('push', function(event) {
    var body;

    console.log(JSON.stringify(event.data));

    if (event.data) {
        body = event.data.text();
    } else body = "Push message no payload";

    var options = {
        body: body,
        icon: 'icon-512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
