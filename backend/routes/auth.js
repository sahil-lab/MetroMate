const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Config = require('../models/Config');
const logger = require('../logger');

const router = express.Router();

// Function to fetch JWT secret from the database
const fetchJWTSecret = async () => {
    const config = await Config.findOne({ key: 'jwtSecret' });
    if (config) {
      return config.value;
    } else {
      throw new Error('JWT secret not found');
    }
  };
// Register User
router.post('/register', [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('phoneNumber').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phoneNumber } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            logger.error('User already exists');
            return res.status(400).json({ msg: 'User already exists' });
        }

        const jwtSecret = await fetchJWTSecret();

        user = new User({
            name,
            email,
            password,
            phoneNumber,
            jwtSecret, // Save the JWT secret in the user document
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            logger.info('User registered successfully', { user: user.id });
            res.json({ token });
        });
    } catch (err) {
        logger.error('Server error: ', err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            logger.error('Invalid credentials');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error('Invalid credentials');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

     

       const jwtSecret = await fetchJWTSecret();
const payload = {
  user: {
    id: user.id,
  },
};

jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
  if (err) throw err;
  logger.info('User authenticated successfully', { user: user.id });
  res.json({ token });
});
    } catch (err) {
        logger.error('Server error: ', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
