import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState([]);

    const { name, email, password, phoneNumber } = formData;
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = JSON.stringify({ name, email, password, phoneNumber });
            const res = await axios.post('http://localhost:5000/api/admin/register-admin', body, config);
            console.log(res.data);
            navigate('/admin-dashboard');
        } catch (err) {
            console.error(err.response.data);
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Admin Register
            </Typography>
            {errors.length > 0 && (
                <div className="alert">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.msg}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </Box>
        </div>
    );
};

export default AdminRegister;
