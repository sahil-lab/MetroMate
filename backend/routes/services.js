// backend/routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Ensure this path is correct


// @route   GET api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


// Create a new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const service = await newService.save();
    res.json(service);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
