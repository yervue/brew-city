const mongoose = require('mongoose');
const Video = require('./Video');
const Customer = require('./Customer');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
