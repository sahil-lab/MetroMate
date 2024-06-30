// src/utils/auth.js
import axios from 'axios';
export const setAuthToken = token => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

export const getAuthToken = () => {
    return localStorage.getItem('token');
};
export const removeAuthToken = () => {
    localStorage.removeItem('token');
};