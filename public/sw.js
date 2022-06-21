
// //Seting up content for the cache to render when offline
// const staticCacheName = 'Static-website-v1';
// const assets = [
//     '/register',
//     '/login',
//     '/',
//     'css/style.css',
// ];

// //Service worker install event
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(staticCacheName)
//         .then(cache => {
//             console.log('I am caching items')
//             cache.addAll(assets)
//         })
//     )
// });

// //Service worker activate event
// self.addEventListener('activate', (event) => {
//     console.log('The service worker has been activated')
//     event.waitUntil(
//         caches.keys()
//         .then(keys => {
//             return Promise.all(keys
//                 .filter(key => key !== staticCacheName)
//                 .map(key => caches.deletek(key))
//                 )
//         })
//     )
// });

// //Fetch event for the service worker
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//         .then(cacheResponse => {
//             return cacheResponse || fetch(event.request)
//         })
//     )
// })

