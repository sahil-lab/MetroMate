const mongoose = require('mongoose');
const config = require('config');
const Service = require('./models/Service');

const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const services = [
  { name: 'Service 1', description: 'Description of service 1', price: 100 },
  { name: 'Service 2', description: 'Description of service 2', price: 200 },
  { name: 'Service 3', description: 'Description of service 3', price: 300 },
];

const seedDB = async () => {
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('Services Added');
  mongoose.connection.close();
};

seedDB();
