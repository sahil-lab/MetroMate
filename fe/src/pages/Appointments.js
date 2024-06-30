import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    service: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/appointments', newAppointment, config);
      setAppointments([...appointments, res.data]);
      toast.success('Appointment scheduled successfully!'); // Show success toast
      setNewAppointment({ service: '', date: '', notes: '' }); // Reset form
    } catch (err) {
      console.error(err);
      toast.error('Failed to schedule appointment. Please try again.'); // Show error toast
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      <form onSubmit={submitForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Service"
              name="service"
              value={newAppointment.service}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="datetime-local"
              value={newAppointment.date}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={newAppointment.notes}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Book Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        {appointments.map((appointment) => (
          <Card key={appointment._id} sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {appointment.service}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(appointment.date).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Notes: {appointment.notes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {appointment.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
