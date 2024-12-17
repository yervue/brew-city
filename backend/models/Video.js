const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  copies: { type: Number, required: true },
  image: { type: String, default: '' },
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Add rating with min and max validation
  rentalPrice: { type: Number, required: true }, // Add this field

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
