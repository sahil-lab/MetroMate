import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Grid } from '@mui/material';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const retryFetchOrderDetails = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.map(order => (order._id === orderId ? res.data : order)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {order.service && order.service.name ? order.service.name : (
                    <span onClick={() => retryFetchOrderDetails(order._id)}>Unknown Service (Retry)</span>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Details: {order.details}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comments: {order.comments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(order.date).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Service Provider: {order.serviceProvider && order.serviceProvider.name ? order.serviceProvider.name : (
                    <span onClick={() => retryFetchOrderDetails(order._id)}>Unknown Provider (Retry)</span>
                  )}
                </Typography>
                {order.serviceProvider && order.serviceProvider.location && order.serviceProvider.location.coordinates && (
                  <Box mt={2}>
                    <div style={{ height: '200px', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                        defaultCenter={{
                          lat: order.serviceProvider.location.coordinates[1],
                          lng: order.serviceProvider.location.coordinates[0],
                        }}
                        defaultZoom={11}
                      >
                        <AnyReactComponent
                          lat={order.serviceProvider.location.coordinates[1]}
                          lng={order.serviceProvider.location.coordinates[0]}
                          text="Service Provider Location"
                        />
                      </GoogleMapReact>
                    </div>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyOrders;
