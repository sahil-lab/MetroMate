// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure you have the Order model defined

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
