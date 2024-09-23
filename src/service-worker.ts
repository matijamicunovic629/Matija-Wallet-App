/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { MORALIS_API_URL } from './constants';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }),
);

self.skipWaiting();
clientsClaim();

// Register a route for Moralis API calls
registerRoute(
  ({ url }) => url.href.startsWith(MORALIS_API_URL),
  new NetworkFirst({
    cacheName: 'moralis-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Maximum number of entries to keep in the cache
        maxAgeSeconds: 24 * 60 * 60, // Cache duration (e.g., 1 day)
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only if response status is 0 (opaque) or 200 (OK)
      }),
    ],
  }),
);
