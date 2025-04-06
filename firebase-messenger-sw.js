importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize using your exact config
firebase.initializeApp({
  apiKey: "AIzaSyCAwYbe9Co9y1g_3oG3bcjHX5VSaN44B8U",
  projectId: "image-api-f55eb",
  messagingSenderId: "981505208035",
  appId: "1:981505208035:web:e5b695b767a2d6d8529fd6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/your-logo.png', // Add your logo
    data: { click_action: payload.fcmOptions.link }
  };

  return self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.click_action || '/')
  );
});