// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAxtxzsmEWjFI8chXRL4AeexqklyDyVuwM",
  authDomain: "metromated-b8823.firebaseapp.com",
  projectId: "metromated-b8823",
  storageBucket: "metromated-b8823.appspot.com",
  messagingSenderId: "298514576377",
  appId: "1:298514576377:web:8ae884b5ad2666a4de8328",
  measurementId: "G-XLG5CET28D"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
