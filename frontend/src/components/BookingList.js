import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jsPDF AutoTable plugin
import './css/booking.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Error fetching bookings!');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Booking History', 14, 10);

    // Prepare table rows
    const tableRows = bookings.map((booking) => [
      booking.customer?.name || 'Unknown Customer',
      booking.videos?.length > 0
        ? booking.videos.map((video) => video.title).join(', ')
        : 'No videos selected',
      booking.returnDate
        ? new Date(booking.returnDate).toLocaleDateString()
        : 'No return date',
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [['Customer', 'Videos', 'Return Date']],
      body: tableRows,
    });

    doc.save('BookingHistory.pdf');
  };

  return (
    <div className="booking-container">
      <h1 style={{ textAlign: 'center' }}>Booking History</h1>
      <button onClick={generatePDF} className="generate-pdf-button">
        Generate PDF Report 
      </button>
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Videos</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.customer?.name || 'Unknown Customer'}</td>
                  <td>
                    {booking.videos?.length > 0
                      ? booking.videos.map((video) => video.title).join(', ')
                      : 'No videos selected'}
                  </td>
                  <td>
                    {booking.returnDate
                      ? new Date(booking.returnDate).toLocaleDateString()
                      : 'No return date'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No bookings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
      <ToastContainer />
    </div>
  );
};

export default BookingList;
