// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Ensure you have the Appointment model defined

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
