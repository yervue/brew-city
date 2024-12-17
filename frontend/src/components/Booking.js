import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './css/booking.css';

const Booking = () => {
  const [customers, setCustomers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [booking, setBooking] = useState({
    customerId: '',
    videoIds: [],
    returnDate: '',
  });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchCustomers();
    fetchVideos();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Error fetching customers!');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    } catch (error) {
      toast.error('Error fetching videos!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoSelection = (videoId) => {
    setBooking((prev) => ({
      ...prev,
      videoIds: prev.videoIds.includes(videoId)
        ? prev.videoIds.filter((id) => id !== videoId)
        : [...prev.videoIds, videoId],
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post('http://localhost:5000/api/bookings/create', booking);
  //     toast.success('Booking created successfully!');
  //     setBooking({ customerId: '', videoIds: [], returnDate: '' });
  //     navigate('/bookings'); // Redirect to bookings page
  //   } catch (error) {
  //     toast.error('Error creating booking!');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      customerId: booking.customerId, // Matches backend route
      videoIds: booking.videoIds, // Matches backend route
      returnDate: booking.returnDate, // Matches backend route
    };
  
    try {
      await axios.post('http://localhost:5000/api/bookings/create', payload);
      toast.success('Booking created successfully!');
      setBooking({ customerId: '', videoIds: [], returnDate: '' });
      navigate('/bookings'); // Redirect to bookings page
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
      toast.error('Error creating booking!');
    }
  };
  

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: 'gray' }}>Customer:</label>
          <select
            name="customerId"
            value={booking.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ color: 'gray' }}>Videos:</label>
          <div>
            {videos.map((v) => (
              <label style={{ color: 'gray' }} key={v._id}>
                <input
                  type="checkbox"
                  checked={booking.videoIds.includes(v._id)}
                  onChange={() => handleVideoSelection(v._id)}
                />
                {v.title}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label style={{ color: 'gray' }}>Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={booking.returnDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Booking</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Booking;
