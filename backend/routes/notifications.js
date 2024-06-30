const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const admin = require('../config/firebase');
const logger = require('../logger');

// Endpoint to send notification
router.post('/send', auth, async (req, res) => {
  const { title, message, userId } = req.body;

  try {
    const notification = new Notification({
      user: userId,
      title,
      message,
    });

    await notification.save();

    const user = await User.findById(userId);
    if (!user.fcmToken) {
      throw new Error('User does not have an FCM token');
    }

    const messagePayload = {
      notification: {
        title,
        body: message,
      },
      token: user.fcmToken,
    };

    await admin.messaging().send(messagePayload);

    logger.info('Notification sent', { userId, title });
    res.json({ msg: 'Notification sent' });
  } catch (err) {
    logger.error('Error sending notification', err.message);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get user notifications
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (err) {
    logger.error('Error fetching notifications', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
