'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "ba8cbb3749fe49b4655609bc984b3d0f",
"version.json": "7a469692bc7a96ed770fef153e172ea6",
"index.html": "586d020252189d112467d8895a168d85",
"/": "586d020252189d112467d8895a168d85",
"main.dart.js": "01745cc99d82f1f2ca39328d2529a515",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "583eed078da4ce9c97a1c3897c584e2a",
"assets/AssetManifest.json": "7077b390c9dc95a03f219c03418e18d2",
"assets/NOTICES": "0ae26912da0ec03311fab2229af0845e",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "c94ea3bc26ad37cc5c422fa15f42afaf",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e754e2b7558b29c42e61936955f9f33b",
"assets/fonts/MaterialIcons-Regular.otf": "f235dc9658b1b24b564d154f645d626b",
"assets/assets/%25EC%2595%2585%25EB%25AE%25A4-Give%2520Love/%25EC%2595%2585%25EB%25AE%25A4%2520-%2520Give%2520Love.mp3": "c7267b4a97cb9eb7b7d0156a9471ed5c",
"assets/assets/%25EC%2595%2585%25EB%25AE%25A4-Give%2520Love/%25EC%2595%2585%25EB%25AE%25A4%2520-%2520Give%2520Love.json": "bef29a5527739b0043ac122a61cdc526",
"assets/assets/%25EC%2595%2585%25EB%25AE%25A4-Give%2520Love/%25EC%2595%2585%25EB%25AE%25A4%2520-%2520Give%2520Love.txt": "fcbb511e69fe82f1b4e6a3d6e0bdaa18",
"assets/assets/Green%2520Day-Basket%2520Case/Green%2520Day_Basket%2520Case.json": "e6a50280e573e14513f189ef894d2fca",
"assets/assets/Green%2520Day-Basket%2520Case/Green%2520Day_Basket%2520Case.txt": "dc6dd7abd4e8c113dbc1588902653dd5",
"assets/assets/Green%2520Day-Basket%2520Case/Green%2520Day_Basket%2520Case.mp3": "b6b042e685f09a46deac9d9fdb136695",
"assets/assets/%25E1%2584%258B%25E1%2585%25B3%25E1%2586%25B7%25E1%2584%258B%25E1%2585%25A1%25E1%2586%25A8%25E1%2584%258F%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B3-%25E1%2584%258B%25E1%2585%25B2%25E1%2584%2590%25E1%2585%25B2%25E1%2584%2587%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25BC%25E1%2584%258F%25E1%2585%25B3.rtf": "2dd8a0929389a0dad0a31cee795f5e9d",
"assets/assets/Jamiroquai-Virtual%2520Insanity/Jamiroquai%2520-%2520Virtual%2520Insanity.json": "720564ac2cc6c615b0d30b43620f4123",
"assets/assets/Jamiroquai-Virtual%2520Insanity/Jamiroquai%2520-%2520Virtual%2520Insanity.txt": "7eb5ded76cb3c05aa078e78a06b6395c",
"assets/assets/Jamiroquai-Virtual%2520Insanity/Jamiroquai%2520-%2520Virtual%2520Insanity.mp3": "b9cff23943ba2e9fa129b15e2f847e53",
"assets/assets/Green%2520Day-21%2520Guns/Green%2520Day%2520-%252021%2520Guns.json": "ee1463e4f9373d552cb70cd88af7245a",
"assets/assets/Green%2520Day-21%2520Guns/Green%2520Day%2520-%252021%2520Guns.txt": "8ea1cdd7fdb1d179e07126c1c58c5d5d",
"assets/assets/Green%2520Day-21%2520Guns/Green%2520Day%2520-%252021%2520Guns.mp3": "930eeb97412479c38c143ae206e80259",
"assets/assets/extract_timesignature.py": "f465c52355604698917227754c9bc903",
"assets/assets/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0-%25EA%25B0%2590%25EC%2582%25AC/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0%2520-%2520%25EA%25B0%2590%25EC%2582%25AC.mp3": "b605739fbee92f037d69e608ace3e3f4",
"assets/assets/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0-%25EA%25B0%2590%25EC%2582%25AC/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0%2520-%2520%25EA%25B0%2590%25EC%2582%25AC.txt": "1fde65dc39ccbfa10def9fab84837b0f",
"assets/assets/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0-%25EA%25B0%2590%25EC%2582%25AC/%25EA%25B9%2580%25EB%258F%2599%25EB%25A5%25A0%2520-%2520%25EA%25B0%2590%25EC%2582%25AC.json": "feb5c1c2e66877b6afdeb27a400e42cd",
"assets/assets/%25EB%25B9%2584%25EB%25B9%2584-%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1/%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1.txt": "fb140d9d21796008924b9619664885cd",
"assets/assets/%25EB%25B9%2584%25EB%25B9%2584-%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1/%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1.mp3": "366f5a438f1095a4ebfaae2a4d5fa5c9",
"assets/assets/%25EB%25B9%2584%25EB%25B9%2584-%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1/%25EB%25B0%25A4%25EC%2596%2591%25EA%25B0%25B1.json": "f4d162498075fa539bf385d5a2be6717",
"assets/assets/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8-%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%2520%25EB%258B%25AC/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8_%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%25EB%258B%25AC.txt": "0f432a996a4d29bd3fa0e03cdb10ff37",
"assets/assets/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8-%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%2520%25EB%258B%25AC/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8_%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%25EB%258B%25AC.wav": "3853ac690e32f9e1db3c77ee92b827ef",
"assets/assets/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8-%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%2520%25EB%258B%25AC/%25EA%25B9%2580%25EA%25B1%25B4%25EB%25AA%25A8_%25EC%2584%259C%25EC%259A%25B8%25EC%259D%2598%25EB%258B%25AC.json": "aec19855ef5f282598e5bbe5f375d0dd",
"assets/assets/Woodz-Drowning/Drowning.mp3": "e082390f930cecdb0fe28fb823a2f3fb",
"assets/assets/Woodz-Drowning/Drowning.json": "d253bd8e1bff61d6bc43d09c30896691",
"assets/assets/Woodz-Drowning/Drowning.txt": "a2316dfe4b220ab9fdc92b8ee7fc4db6",
"assets/assets/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594-TikTakTok/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594_TikTakTok.json": "5c3bb80518aa52dfb2501b0710b6b83f",
"assets/assets/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594-TikTakTok/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594_TikTakTok.txt": "3981bb2ced05870c12bed4cc19d15df6",
"assets/assets/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594-TikTakTok/%25EC%258B%25A4%25EB%25A6%25AC%25EC%25B9%25B4%25EA%25B2%2594_TikTakTok.mp3": "2b092e78a5548fc3f6cd9729e41f7a20",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
