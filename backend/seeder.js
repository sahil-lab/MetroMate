const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const User = require('./models/User');

// Load environment variables from the .env file in the root directory
dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const services = [
  {
    name: 'Plumbing',
    description: 'Plumbing services',
    price: 50,
    serviceProvider: '60d2b0c9a1b2c4108c8b4567', // Example service provider ID
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716], // Example coordinates (Bangalore)
    },
  },
  {
    name: 'Electrical',
    description: 'Electrical services',
    price: 75,
    serviceProvider: '60d2b0c9a1b2c4108c8b4568', // Example service provider ID
    location: {
      type: 'Point',
      coordinates: [77.1025, 28.7041], // Example coordinates (Delhi)
    },
  },
];

const users = [
  {
    _id: '60d2b0c9a1b2c4108c8b4567',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // Remember to hash passwords in a real application
    isServiceProvider: true,
  },
  {
    _id: '60d2b0c9a1b2c4108c8b4568',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123', // Remember to hash passwords in a real application
    isServiceProvider: true,
  },
];

const importData = async () => {
  try {
    await Service.deleteMany();
    await User.deleteMany();
    await User.insertMany(users);
    await Service.insertMany(services);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-import') {
  importData();
}
