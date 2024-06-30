import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleMapReact from 'google-map-react';

const PlaceOrder = () => {
  const [order, setOrder] = useState({
    service: '',
    quantity: '',
    comments: '',
    details: '', // Add details field
  });

  const [services, setServices] = useState([]);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/orders', order);
      toast.success('Order placed successfully!');
      setOrder({ service: '', quantity: '', comments: '', details: '' }); // Reset form
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Place Order
      </Typography>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Service"
              name="service"
              value={order.service}
              onChange={handleInputChange}
              SelectProps={{
                native: true,
              }}
              fullWidth
              margin="normal"
              required
            >
              <option value=""></option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={order.quantity}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comments"
              name="comments"
              value={order.comments}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details"
              name="details"
              value={order.details}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
      <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsApiKey }}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        >
          {/* Place your markers here */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default PlaceOrder;
