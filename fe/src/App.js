import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';
import Chatbot from './components/Chatbot';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin';
import theme from './theme';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyOrders from './pages/MyOrders';
import Reviews from './pages/Reviews';
import Appointments from './pages/Appointments';
import PlaceOrder from './pages/PlaceOrder';
import { getAuthToken } from './utils/auth';
import AdminRegister from './pages/AdminRegister';
import axios from 'axios';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  useEffect(() => {
    // Set the token for all axios requests
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    // Register service worker for Firebase messaging
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
        .then((registration) => {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch((err) => {
          console.log('Service worker registration failed, error:', err);
        });
    }
  }, []);

  const PrivateRoute = ({ element: Element, isAdminRoute = false }) => {
    const token = getAuthToken();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (token) {
      if (isAdminRoute && !isAdmin) {
        return <Navigate to="/dashboard" />;
      }
      return <Element />;
    }
    return <Navigate to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ bgcolor: 'background.paper', boxShadow: 1, borderRadius: 1, p: 2, minHeight: '400px' }}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
              <Route path="/myorders" element={<PrivateRoute element={MyOrders} />} />
              <Route path="/reviews" element={<PrivateRoute element={Reviews} />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} isAdminRoute={true} />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-register" element={<AdminRegister />} />
              <Route path="/appointments" element={<PrivateRoute element={Appointments} />} />
              <Route path="/placeorder" element={<PrivateRoute element={PlaceOrder} />} />
            </Routes>
          </Box>
        </Container>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
