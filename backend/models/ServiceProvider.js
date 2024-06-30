// backend/models/ServiceProvider.js
const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere' // Create a geospatial index
  }
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
