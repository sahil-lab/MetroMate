// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Config = require('../models/Config');
const logger = require('../logger');

// Function to fetch JWT secret from the database
const fetchJWTSecret = async () => {
  const config = await Config.findOne({ key: 'jwtSecret' });
  if (config) {
    return config.value;
  } else {
    throw new Error('JWT secret not found');
  }
};

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = await fetchJWTSecret();
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    logger.error('Token is not valid');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
