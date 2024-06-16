# MetroMate

MetroMate is a comprehensive service marketplace application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application provides features for users to manage services, orders, appointments, and reviews.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Register and login functionality with JWT-based authentication.
- **Service Management:** Users can view and manage services.
- **Order Management:** Users can place and view orders.
- **Appointment Management:** Users can book and manage appointments.
- **Review Management:** Users can add and view reviews for services.

## Technologies

- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sahil-lab/MetroMate.git
   cd MetroMate
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `default.json` file in `backend/config` with the following content:
   ```json
   {
     "mongoURI": "your_mongodb_uri",
     "jwtSecret": "your_jwt_secret"
   }
   ```

4. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

5. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

## Usage

### Authentication

#### Register
- Endpoint: `POST /api/auth/register`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "isServiceProvider": true
  }
  ```

#### Login
- Endpoint: `POST /api/auth/login`
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Reviews

#### Get All Reviews
- Endpoint: `GET /api/reviews`
- Description: Retrieves all reviews.

#### Add a Review
- Endpoint: `POST /api/reviews`
- Headers: `{ "x-auth-token": "your_jwt_token" }`
- Request Body:
  ```json
  {
    "service": "service_id",
    "rating": 5,
    "comments": "Excellent service!"
  }
  ```

## API Endpoints

### Users
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user and get a token.
- `GET /api/auth/me`: Get the authenticated user's details.

### Services
- Add service endpoints here...

### Orders
- Add order endpoints here...

### Appointments
- Add appointment endpoints here...

### Reviews
- `GET /api/reviews`: Get all reviews.
- `POST /api/reviews`: Add a new review.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Next Steps

1. **Service Management:**
   - Add endpoints for creating, updating, deleting, and retrieving services.
   - Implement corresponding frontend components for service management.

2. **Order Management:**
   - Add endpoints for creating, updating, deleting, and retrieving orders.
   - Implement corresponding frontend components for order management.

3. **Appointment Management:**
   - Add endpoints for creating, updating, deleting, and retrieving appointments.
   - Implement corresponding frontend components for appointment management.

4. **Enhancements:**
   - Add more detailed validation and error handling.
   - Improve the user interface and experience.

5. **Deployment:**
   - Prepare the application for deployment on a hosting platform like Heroku, AWS, or Vercel.
   - Set up environment variables for production.

Feel free to adjust the content based on your project's specifics and requirements. Let me know if you need further customization or additional sections!

# MetroMate
MetroMate is a revolutionary local commerce and services marketplace app that connects consumers with nearby businesses and service providers, offering convenience and accessibility like never before.

