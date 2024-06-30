const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../logger');
const router = express.Router();

// Helper function to generate JWT secret
const generateJWTSecret = () => {
    return require('crypto').randomBytes(64).toString('hex');
};

// Admin Register
router.post(
    '/register-admin',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation errors: ', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, phoneNumber } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                logger.error('Admin already exists');
                return res.status(400).json({ msg: 'Admin already exists' });
            }

            const jwtSecret = generateJWTSecret();

            user = new User({
                name,
                email,
                password,
                phoneNumber,
                isAdmin: true,
                jwtSecret,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                jwtSecret,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    logger.info('Admin registered successfully', { user: user.id });
                    res.json({ token });
                }
            );
        } catch (err) {
            logger.error('Server error: ', err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Admin Login
router.post(
    '/login-admin',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error('Validation errors: ', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user || !user.isAdmin) {
                logger.error('Invalid credentials');
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                logger.error('Invalid credentials');
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                user.jwtSecret,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    logger.info('Admin logged in successfully', { user: user.id });
                    res.json({ token });
                }
            );
        } catch (err) {
            logger.error('Server error: ', err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
