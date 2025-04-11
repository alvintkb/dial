// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCAwYbe9Co9y1g_3oG3bcjHX5VSaN44B8U",
  authDomain: "image-api-f55eb.firebaseapp.com",
  projectId: "image-api-f55eb",
  storageBucket: "image-api-f55eb.firebasestorage.app",
  messagingSenderId: "981505208035",
  appId: "1:981505208035:web:e5b695b767a2d6d8529fd6",
  measurementId: "G-KKVCQV1YX0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message Payload:', payload);
  const notification = payload.notification || {};
  const title = notification.title || 'Default Title';
  const options = {
    body: notification.body || 'Default Body',
    icon: '/dial/your-logo.jpg',
    data: { link: notification.link || '/' }
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = event.notification.data.link || '/';
  event.waitUntil(clients.openWindow(link));
});