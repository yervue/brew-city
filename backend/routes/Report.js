const express = require('express');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Video = require('../models/Video');

const router = express.Router();

  
router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('customerId', 'name email') // Populate customer details
        .populate('videoIds', 'title'); // Populate video details
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report data', error });
    }
  });


module.exports = router;
