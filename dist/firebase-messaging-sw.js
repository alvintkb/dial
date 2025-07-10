// Firebase SDKs should only be imported once at the top
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCAwYbe9Co9y1g_3oG3bcjHX5VSaN44B8U",
    authDomain: "image-api-f55eb.firebaseapp.com",
    projectId: "image-api-f55eb",
    storageBucket: "image-api-f55eb.appspot.com",
    messagingSenderId: "981505208035",
    appId: "1:981505208035:web:e5b695b767a2d6d8529fd6",
    measurementId: "G-KKVCQV1YX0"
  });
}

const messaging = firebase.messaging();

// Add this check to prevent duplicate registrations
if (typeof messaging !== 'undefined') {
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);
    
    const notificationTitle = payload.notification?.title || 'New Message';
    const notificationOptions = {
      body: payload.notification?.body || '',
      icon: '/icons/icon-192x192.png',
      data: { url: payload.data?.url || '/' }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(windowClients => {
      const url = event.notification.data?.url || '/';
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});