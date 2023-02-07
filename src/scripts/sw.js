if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        // console.log('SW registered: ', registration);
      })
      .catch(() => {
        // console.log('SW registration failed: ', registrationError);
      });
  });
}
