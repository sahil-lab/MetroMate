const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../logger');

// Middleware to check if the user is authenticated and is an admin
module.exports = async function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Decode the token to get the user ID
        const decoded = jwt.decode(token);
        req.user = decoded.user;

        // Retrieve the user from the database
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        // Verify the token using the user's unique JWT secret
        jwt.verify(token, user.jwtSecret, (err, decoded) => {
            if (err) {
                logger.error('Token verification error: ', err.message);
                return res.status(401).json({ msg: 'Token is not valid' });
            }

            req.user = decoded.user;
            next();
        });
    } catch (err) {
        logger.error('Token verification error: ', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
