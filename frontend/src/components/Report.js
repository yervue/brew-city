import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import './css/booking.css';

const Report = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/reports');
      setBookings(response.data);
    } catch (error) {
      toast.error('Error fetching booking report!');
      console.error(error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title for the report
    doc.setFontSize(18);
    doc.text('Booking Report', 20, 20);

    // Table Headers
    doc.setFontSize(12);
    doc.text('Customer', 20, 40);
    doc.text('Videos', 80, 40);
    doc.text('Return Date', 180, 40);

    let yPosition = 50;

    // Loop through bookings and add to the table
    bookings.forEach((booking) => {
      const customerName = booking.customerId?.name || 'Unknown Customer';
      const videoTitles = booking.videoIds.map((video) => video.title).join(', ') || 'No videos selected';
      const returnDate = new Date(booking.returnDate).toLocaleDateString() || 'No return date';

      doc.text(customerName, 20, yPosition);
      doc.text(videoTitles, 80, yPosition);
      doc.text(returnDate, 180, yPosition);

      yPosition += 10; // Move to the next row
    });

    // Save the generated PDF
    doc.save('Booking_Report.pdf');
  };

  return (
    <div className="booking-report-container">
      <h1 style={{ textAlign: 'center' }}>Booking Report</h1>
      <button onClick={generatePDF} style={{ marginBottom: '20px' }}>Generate PDF Report</button>
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
                  <td>{booking.customerId?.name || 'Unknown Customer'}</td>
                  <td>
                    {booking.videoIds?.length > 0
                      ? booking.videoIds.map((video) => video.title).join(', ')
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

export default Report;
