import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, Grid, MenuItem } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [newReview, setNewReview] = useState({
    service: '',
    rating: '',
    comments: '',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/reviews', newReview, config);
      setReviews([...reviews, res.data]);
      setNewReview({ service: '', rating: '', comments: '' }); // Reset form
      toast.success('Review added successfully!'); // Show success toast
    } catch (err) {
      console.error(err);
      toast.error('Failed to add review. Please try again.'); // Show error toast
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Service"
              name="service"
              value={newReview.service}
              onChange={handleInputChange}
              fullWidth
              required
            >
              <MenuItem value="">
                <em>Select a service</em>
              </MenuItem>
              {services.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Rating"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comments"
              name="comments"
              value={newReview.comments}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Review
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        {reviews.map((review) => (
          <Card key={review._id} sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {review.service.name} {/* Assuming service name is populated */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {review.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comments: {review.comments}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;