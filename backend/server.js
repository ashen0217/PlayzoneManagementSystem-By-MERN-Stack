const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

//dbpassword was previously hardcoded here

const app = express();
const cors = require('cors');

//middleware 
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload size limit for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//app.use(morgan('dev')); // Log HTTP request
app.use("/Users",require("./Routes/userRoute"));
app.use("/Resources",require("./Routes/resRoute"));
app.use("/Events",require("./Routes/eventRoute"));
app.use("/api/Payments",require("./Routes/payRoute"));
app.use("/Complaints",require("./Routes/complaintFedRoutes"));

// Add API routes with lowercase for frontend compatibility
app.use("/api/bookings", require("./Routes/booking"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
const DB_URL = process.env.MONGODB_URI;
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('DB connect error', error);
  });

const startServer = (port) => {
  // Ensure port is a number
  port = parseInt(port, 10);
  
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);

