const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this path is correct
const auth = require('../middleware/authMiddleware');

// Save FCM token
router.post('/fcm-token', auth, async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.fcmToken = token;
    await user.save();
    res.json({ msg: 'FCM token saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update FCM token
router.post('/update-fcm-token', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.fcmToken = req.body.fcmToken;
    await user.save();
    res.json({ msg: 'FCM token updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
