self.addEventListener('install', event => event.waitUntil(
    caches.open('revision-static-assets').then(cache => cache.addAll([
        '/index.css',
        '/index.js',
        'assets/fonts/OpenSans-Regular.woff2',
        'assets/images/Checking_timestamp.svg',
    ]))
    .then(self.skipWaiting())
))

self.addEventListener('fetch', event => {
    if (isStaticFile(event.request.url)) {
        event.respondWith(
            caches.open('revision-static-assets')
            .then(cache => cache.match(event.request))
        )
    } else {
        event.respondWith(fetch(event.request))
    }
})

function isStaticFile (url) {
    const staticFilePattern = /.*-[0-9a-f]{10}\..*/
    return staticFilePattern.test(url)
}
