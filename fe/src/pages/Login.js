import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
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
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
            setAuthToken(res.data.token); // Store token in localStorage
            localStorage.setItem('isAdmin', res.data.isAdmin); // Store the admin flag
            if (res.data.isAdmin) {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                navigate('/dashboard'); // Redirect to user dashboard
            }
        } catch (err) {
            console.error(err.response.data);
            setErrors([err.response.data]);
        }
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {errors.length > 0 && (
                <div className="alert">
                    {errors.map((error, index) => (
                        <div key={index}>{error.msg}</div>
                    ))}
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

export default Login;
