/* eslint-disable no-restricted-globals */
import * as WorkboxWindow from 'workbox-window';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { cleanupOutdatedCaches } from 'workbox-precaching';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    // console.log('Service Worker not supported in the browser');
    return;
  }

  const wb = new WorkboxWindow.Workbox('./service-worker.js');

  wb.addEventListener('activated', () => {
    // Get the current page URL + all resources the page loaded.
    const urlsToCache = [
      window.location.href,
      ...performance.getEntriesByType('resource').map((r) => r.name),
    ];
    // Send that list of URLs to your router in the service worker.
    wb.messageSW({
      type: 'CACHE_URLS',
      payload: { urlsToCache },
    });

    // register route to cache strategies only network first for review and detail path
    registerRoute(
      ({ url }) =>
        url.pathname.startsWith('/review/') ||
        url.pathname.startsWith('/detail/'),
      new NetworkFirst(),
    );
  });

  try {
    await wb.register();
    cleanupOutdatedCaches();

    // console.log('Service worker registered');
  } catch (error) {
    // console.log('Failed to register service worker', error);
  }
};

export default swRegister;
