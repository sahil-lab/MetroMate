const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('appointment', AppointmentSchema);
