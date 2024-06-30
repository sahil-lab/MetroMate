// src/components/Notifications.js

import React, { useEffect, useState } from 'react';
import { onMessageListener } from '../firebase';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    onMessageListener()
      .then(payload => {
        console.log('Message received: ', payload);
        setNotifications(prevNotifications => [
          ...prevNotifications,
          { title: payload.notification.title, body: payload.notification.body }
        ]);
      })
      .catch(err => console.log('failed: ', err));
  }, []);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            <h4>{notif.title}</h4>
            <p>{notif.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
