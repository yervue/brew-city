import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/videos.css';
import PayPalButton from '../components/PayPalButton';  // Import the PayPal Button component
import Navbar from '../components/Navbar';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [booking, setBooking] = useState({ customerId: '', returnDate: '' });
  const [customers, setCustomers] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');  // Define the searchTerm state

  useEffect(() => {
    fetchVideos();
    fetchCustomers();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    } catch (error) {
      toast.error('Error fetching videos!');
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Error fetching customers!');
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());  // Update the search term on input change
  };

  const openBookingModal = (video) => {
    setSelectedVideo(video);
    setShowBookingModal(true);
    setBookingSuccess(false); // Reset booking success state
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedVideo(null);
    setBooking({ customerId: '', returnDate: '' });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        customerId: booking.customerId,
        videoIds: [selectedVideo._id],
        returnDate: booking.returnDate,
      };
      await axios.post('http://localhost:5000/api/bookings/create', bookingData);
      toast.success('Booking created successfully!');
      setBookingSuccess(true); // Mark booking as successful
    } catch (error) {
      toast.error('Error creating booking!');
    }
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/payments/generate-receipt',
        {
          paymentId: paymentDetails.id,
          payerInfo: paymentDetails.payer,
          amount: selectedVideo.rentalPrice,
          videoTitle: selectedVideo.title,
        }
      );
      toast.success('Payment successful! Receipt generated.');
    } catch (error) {
      toast.error('Error generating receipt!');
    }
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchTerm)  // Filter videos by the search term
  );

  return (
    <div>
      <Navbar/>
      <h1 style={{textAlign:"center", color:"white"}}>Videos</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos by name..."
          value={searchTerm}
          onChange={handleSearchChange}  // Handle the search input change
        />
      </div>

      <div className="video-list">
        {filteredVideos.map((video) => (
          <div key={video._id} className="video-card">
            <h2>{video.title}</h2>
            <p>Rental Price: ${video.rentalPrice}</p>

            <button onClick={() => openBookingModal(video)}>Book</button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Book Video: {selectedVideo.title}</h2>
            <form onSubmit={handleBookingSubmit}>
              <div>
                <label style={{color:"gray"}}>Customer:</label>
                <select
                  name="customerId"
                  value={booking.customerId}
                  onChange={handleBookingChange}
                  required
                >
                  <option value="">Select a customer </option>
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{color:"gray"}}>Return Date:</label>
                <input
                  type="date"
                  name="returnDate"
                  value={booking.returnDate}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Book</button>
                <button type="button" onClick={closeBookingModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PayPal Button */}
      {bookingSuccess && selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Proceed with Payment</h2>
            <PayPalButton
              totalAmount={selectedVideo.rentalPrice}
              onPaymentSuccess={handlePaymentSuccess}
            />
            <button onClick={closeBookingModal}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default VideoPage;
