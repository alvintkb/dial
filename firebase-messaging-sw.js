// E:/vue/dialFunnel2/public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  // Safely extract notification data with fallbacks
  const notification = payload.notification || {};
  const title = notification.title || 'Notification';
  const options = {
    body: notification.body || 'You have a new message',
    icon: '/dial/favicon.ico', // Adjust based on your base path
    // Only include link if it exists (example; adjust as needed)
    ...(notification.link && { data: { url: notification.link } })
  };

  // Show the notification
  self.registration.showNotification(title, options);

  // Optional: Handle click to open a URL (if link exists)
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (options.data?.url) {
      event.waitUntil(clients.openWindow(options.data.url));
    }
  });
});