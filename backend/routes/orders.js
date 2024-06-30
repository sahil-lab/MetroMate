const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');

// Helper function to fetch service and service provider details
const fetchServiceDetails = async (order) => {
  const service = await Service.findById(order.service).populate('serviceProvider');
  if (service) {
    order.service = service;
    order.serviceProvider = service.serviceProvider;
  }
  return order;
};

// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post('/', auth, async (req, res) => {
  console.log('Request Body:', req.body);

  const { service, quantity, comments, details } = req.body;

  try {
    if (!service || !quantity || !details) {
      return res.status(400).json({ msg: 'Service, quantity, and details are required' });
    }

    const serviceObj = await Service.findById(service).populate('serviceProvider');
    if (!serviceObj) {
      return res.status(400).json({ msg: 'Invalid service' });
    }

    const serviceProvider = serviceObj.serviceProvider;

    const newOrder = new Order({
      service,
      serviceProvider,
      quantity,
      comments,
      details,
      user: req.user.id,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders
// @desc    Get all orders of the logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let orders = await Order.find({ user: req.user.id }).populate('service').populate('serviceProvider');

    // Refetch service and service provider details if they are missing
    orders = await Promise.all(
      orders.map(async (order) => {
        if (!order.service || !order.service.name || !order.serviceProvider || !order.serviceProvider.name) {
          order = await fetchServiceDetails(order);
        }
        return order;
      })
    );

    res.json(orders);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id).populate('service').populate('serviceProvider');

    if (!order.service || !order.service.name || !order.serviceProvider || !order.serviceProvider.name) {
      order = await fetchServiceDetails(order);
    }

    res.json(order);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
