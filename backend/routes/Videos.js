const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
  },
});

const upload = multer({ storage });

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/payments/generate-receipt', async (req, res) => {
  try {
    const { paymentId, payerInfo, amount, videoTitle } = req.body;

    // Perform any necessary validations here, e.g., checking paymentId with PayPal API

    // Generate a receipt or save payment details
    const receipt = {
      receiptId: `R-${Date.now()}`,
      paymentId,
      payerInfo,
      amount,
      videoTitle,
      date: new Date(),
    };

    // Respond with a success message or receipt
    res.status(200).json({ message: 'Payment processed successfully!', receipt });
  } catch (error) {
    console.error('Payment processing error:', error.message);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});




router.post('/create',  upload.single('image'), async (req, res) => {
  try {
    const { title, genre, copies, rating, rentalPrice } = req.body;

    const newVideo = new Video({
      title,
      genre,
      copies,
      rating,
      rentalPrice,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Store image path if file is uploaded
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add video', error: error.message });
  }
});

// GET a video by ID
router.get('/:id', async (req, res) => {
  try {
    const videoId = req.params.id; // Get video ID from URL parameters
    const video = await Video.findById(videoId); // Find the video by ID

    if (!video) {
      return res.status(404).json({ message: 'Video not found' }); // If no video found, return 404
    }

    res.json(video); // Send the found video as the response
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve video', error: error.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, genre, copies, rating,rentalPrice} = req.body;
    const updateData = { title, genre, copies, rating, rentalPrice };
    if (req.file) updateData.image = req.file.path;

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update video', error: error.message });
  }
});

// DELETE - Delete a video by ID
router.delete('/:id', async (req, res) => {
  try {
    const videoId = req.params.id;

    // Find and delete the video by ID
    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully', deletedVideo });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete video', error: error.message });
  }
});

module.exports = router;
