import React, { useState } from 'react';
import Chatbot from './Chatbot'; // Ensure the path is correct
import { Fab, Dialog, DialogContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const FloatingChatbotIcon = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab 
        color="primary" 
        aria-label="chatbot" 
        onClick={handleClickOpen} 
        style={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <ChatIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Chatbot />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbotIcon;
