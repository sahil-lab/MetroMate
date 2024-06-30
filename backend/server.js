// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS

require('dotenv').config(); 
const app = express();


// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Use CORS middleware
// Init Middleware
app.use(express.json());
// Define Routes
app.use('/api/users', require('./routes/users')); // Ensure this path is correct
app.use('/api/auth', require('./routes/auth')); // Ensure this path is correct
app.use('/api/services', require('./routes/services')); // Ensure this path is correct
app.use('/api/orders', require('./routes/orders')); // Ensure this path is correct
app.use('/api/appointments', require('./routes/appointments')); // Ensure this path is correct
app.use('/api/reviews', require('./routes/reviews')); // Add this line
app.use('/api/dialogflow', require('./routes/dialogflowRoute')); 
app.use('/api/admin', require('./routes/admin')); // Add this line
app.use('/api/admin', require('./routes/adminAuth')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
