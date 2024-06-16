// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// @route   POST api/orders
// @desc    Place an order
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('service', 'Service is required').not().isEmpty(),
      check('details', 'Details are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { service, details, comments } = req.body;

    try {
      const newOrder = new Order({
        user: req.user.id,
        service,
        details,
        comments,
      });

      const order = await newOrder.save();

      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/orders
// @desc    Get all orders of the logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('service');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
