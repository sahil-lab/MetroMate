// backend/services/googleMapsService.js

const { Client } = require('@googlemaps/google-maps-services-js');
const config = require('config');

const client = new Client({});

const geocodeAddress = async (address) => {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

module.exports = { geocodeAddress };
