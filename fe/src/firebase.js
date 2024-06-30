// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAxtxzsmEWjFI8chXRL4AeexqklyDyVuwM",
  authDomain: "metromated-b8823.firebaseapp.com",
  projectId: "metromated-b8823",
  storageBucket: "metromated-b8823.appspot.com",
  messagingSenderId: "298514576377",
  appId: "1:298514576377:web:8ae884b5ad2666a4de8328",
  measurementId: "G-XLG5CET28D",
  vapidKey: "BBkzDHg4G2mzAuXrkTqA0Lz7_QD9kz-45jlxHlumjWNHkHF6-zVp8ps8ichUOetkN05m6vXaNIgj5ZVVptmWj3Y"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BBkzDHg4G2mzAuXrkTqA0Lz7_QD9kz-45jlxHlumjWNHkHF6-zVp8ps8ichUOetkN05m6vXaNIgj5ZVVptmWj3Y" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other necessary operations with the token
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
