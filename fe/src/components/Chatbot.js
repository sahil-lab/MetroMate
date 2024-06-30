import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      const res = await axios.post('http://localhost:5000/api/dialogflow', { message: input }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      const botMessage = { text: res.data.response, sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat with Us
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg.text} secondary={msg.sender === 'user' ? 'You' : 'Bot'} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          label="Type your message..."
          value={input}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Chatbot;
