import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, Button, FormControlLabel, Typography, Box } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isServiceProvider: false,
    });
    const [errors, setErrors] = useState([]);

    const { name, email, password, isServiceProvider } = formData;
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
            const body = JSON.stringify({ name, email, password, isServiceProvider });
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
            setAuthToken(res.data.token);
            console.log(res.data);
            navigate('/dashboard'); // Redirect to dashboard or any protected route
        } catch (err) {
            console.error(err.response.data);
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                Register
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
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isServiceProvider"
                            checked={isServiceProvider}
                            onChange={() => setFormData({ ...formData, isServiceProvider: !isServiceProvider })}
                        />
                    }
                    label="Are you a service provider?"
                    className="checkbox-container"
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </Box>
        </div>
    );
};

export default Register;
