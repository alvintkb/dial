// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  // Your Firebase config
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message Payload:', payload); // Log the payload

  // Safely access properties with defaults
  const notification = payload.notification || {};
  const title = notification.title || 'Default Title';
  const options = {
    body: notification.body || 'Default Body',
    icon: '/icon.png',
    data: {
      link: notification.link || '/' // Fallback to root if link is missing
    }
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = event.notification.data.link || '/';
  event.waitUntil(clients.openWindow(link));
});