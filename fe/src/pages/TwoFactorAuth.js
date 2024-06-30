// src/pages/TwoFactorAuth.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';

const TwoFactorAuth = () => {
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');

  const generateSecret = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/generate-secret');
    setSecret(res.data.secret);
    setQrCode(res.data.qrCode);
  };

  const verifyToken = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/verify-token', { token, secret });
    if (res.data.verified) {
      // Token is verified
    } else {
      // Token is incorrect
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Two Factor Authentication</Typography>
      <Button onClick={generateSecret}>Generate Secret</Button>
      {qrCode && (
        <Card>
          <CardContent>
            <img src={qrCode} alt="QR Code" />
          </CardContent>
        </Card>
      )}
      <TextField
        fullWidth
        label="Enter 6-digit code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <Button onClick={verifyToken}>Verify Code</Button>
    </Box>
  );
};

export default TwoFactorAuth;
