const express = require('express');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Video = require('../models/Video');

const router = express.Router();

// // Create Booking
// router.post('/create', async (req, res) => {
//   try {
//     const { customerId, videoIds, returnDate } = req.body;
//     const booking = new Booking({
//       customer: customerId,
//       videos: videoIds,
//       returnDate,
//     });

//     await booking.save();
//     res.status(201).json({ message: 'Booking created successfully', booking });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/create', async (req, res) => {
    try {
      const { customerId, videoIds, returnDate } = req.body;
  
      // Validate required fields
      if (!customerId || !videoIds || videoIds.length === 0 || !returnDate) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Create and save the booking
      const booking = new Booking({
        customer: customerId,
        videos: videoIds,
        returnDate,
      });
  
      await booking.save();
      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
router.get('/reports', async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('customerId', 'name email') // Populate customer details
        .populate('videoIds', 'title'); // Populate video details
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report data', error });
    }
  });
// Fetch Bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer')
      .populate('videos');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
