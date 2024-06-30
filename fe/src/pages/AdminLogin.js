// src/pages/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);

    const { email, password } = formData;
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
            const body = JSON.stringify({ email, password });
            const res = await axios.post('http://localhost:5000/api/admin/login-admin', body, config);
            localStorage.setItem('token', res.data.token);
            navigate('/admin-dashboard');
        } catch (err) {
            console.error(err.response.data);
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Admin Login
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
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </Box>
        </div>
    );
};

export default AdminLogin;