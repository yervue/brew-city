
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', { username, password });
      localStorage.setItem('token', res.data.token); // Store token if provided
      toast.success('Registration successful! Redirecting to dashboard...', {
        position: "top-right", // Use string instead of toast.POSITION.TOP_RIGHT
      });
      setTimeout(() => navigate('/dashboard'), 3000); // Navigate after 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred', {
        position: "top-right", // Use string instead of toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div>
      <h2 style={{color:"white",textAlign:"center"}}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <ToastContainer /> 
    </div>
  );
};

export default Register;







