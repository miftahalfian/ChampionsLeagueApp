const CACHE_NAME = 'champions_league-v1';
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/team.html",
    "/pages/home.html",
    "/pages/matches.html",
    "/pages/standings.html",
    "/pages/teams.html",
    "/pages/favorite.html",
    "/css/materialize.min.css",
    "/css/main.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/main.js",
    "/js/idb.js",
    "/js/db.js",
    "img/champions-league-logo.png",
    "img/team_badge.png",
    "icon-192.png",
    "icon-512.png"
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    console.log("Load API Call From Server");
                    cache.put(event.request.url, response.clone());
                    return response;
                }).catch(function() {
                    console.log("Load API Call From Cache");
                    return caches.match(event.request)
                })
            })
        )
    }
    else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                if (response) {
                    console.log("Load Page From Cache");
                    return response;
                }

                console.log("Load Page From Server");
                return fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

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
