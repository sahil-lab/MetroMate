const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../logger');
const crypto = require('crypto');
const adminAuth = require('../middleware/adminAuthMiddleware'); // Import the adminAuth middleware

// Generate a unique JWT secret
const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Admin registration route
router.post('/register-admin', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
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
                if (err) {
                    logger.error('JWT sign error: ', err.message);
                    throw err;
                }
                logger.info('Admin registered successfully', { user: user.id });
                res.json({ token });
            }
        );
    } catch (err) {
        logger.error('Server error: ', err.message);
        res.status(500).send('Server error');
    }
});
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update user details
router.put('/users/:id', [
    adminAuth,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a user
router.delete('/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.remove();
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Change user role
router.put('/users/:id/role', [
    adminAuth,
    check('role', 'Role is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { role } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.isAdmin = role === 'admin';
        user.isServiceProvider = role === 'service_provider';

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
