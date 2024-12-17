import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers/create', formData);
      toast.success('Customer created successfully!');
      navigate('/customers'); // Redirect after successful creation
    } catch (err) {
      const errorMessage = err.response?.data || 'Something went wrong';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center', color:"gray" }}>Create Customer</h1>

        <div>
          <label style={{color:"gray"}}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>Street:</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>City:</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>State:</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>Zip Code:</label>
          <input
            type="text"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{color:"gray"}}>Country:</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
