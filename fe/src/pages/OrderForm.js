// src/pages/Dashboard/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [service, setService] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/orders', { service });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Service</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <button type="submit">Order</button>
    </form>
  );
};

export default OrderForm;
