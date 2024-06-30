// src/pages/Dashboard.js
import React from 'react';
import { Container, Typography, Box, Tabs, Tab, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MyServices from './MyServices';
import MyOrders from './MyOrders';
import Appointments from './Appointments';
import Reviews from './Reviews';
import PlaceOrder from './PlaceOrder';
import Notifications from '../components/Notifications'; // Import the Notifications component
import FloatingChatbotIcon from '../components/FloatingChatbotIcon'; // Ensure this path is correct

const Dashboard = () => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    sx={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        minWidth: '60px', // Reduced minWidth
                        width: '80px', // Set explicit width
                        lineHeight: 1.2,
                        height: '30px',
                    }} // Adjust font size, padding, and height
                >
                    Logout
                </Button>
            </Box>
            <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
                <Tab label="My Services" />
                <Tab label="My Orders" />
                <Tab label="Appointments" />
                <Tab label="Reviews" />
                <Tab label="Place Orders" />
                <Tab label="Notifications" /> {/* Add Notifications tab */}
            </Tabs>
            <Box mt={2}>
                {value === 0 && <MyServices />}
                {value === 1 && <MyOrders />}
                {value === 2 && <Appointments />}
                {value === 3 && <Reviews />}
                {value === 4 && <PlaceOrder />}
                {value === 5 && <Notifications />} {/* Render Notifications component */}
            </Box>
            <FloatingChatbotIcon />
        </Container>
    );
};

export default Dashboard;
