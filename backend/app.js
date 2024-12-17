const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/auth');
// const authenticate = require('./middleware/auth');
const customerRoutes = require('./routes/Customer')
require('dotenv').config();  // Load environment variables
const videosRouter = require('./routes/Videos');  // Import the videos router
const bookingsRouter = require('./routes/Booking');  // Import the videos router

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests
app.use(bodyParser.json());
// Serve static files from the uploads directory

const connectDB = async () => {
  try {
    // Make sure MONGO_URI is being correctly passed from process.env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// routes
app.use('/api/videos', videosRouter);  // All routes starting with /api/videos will be handled by the videos router
app.use('/api/users', userRoutes);
// app.use('/');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/customers', customerRoutes);
// app.use('/');
app.use('/api/bookings', bookingsRouter);
// app.use('/api/reports', reportRouter);

// Ensure the app listens to the specified port
const PORT = process.env.PORT || 5000;  // Default to 5000 if no PORT is specified
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});