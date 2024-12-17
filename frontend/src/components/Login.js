import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', res.data.token); // Save token in localStorage
      toast.success('Login successful! Redirecting to dashboard...', {
        position: "top-right", // Toast position
      });
      setTimeout(() => navigate('/dashboard'), 3000); // Navigate after 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid username or password', {
        position: "top-right", // Toast position
      });
    }
  };

  return (
    <div>
      <h2 style={{color:"white", textAlign:"center"}}>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <ToastContainer /> 
      </div>
  );
};

export default Login;
