require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./lib/mongodb');

const app = express();
const port = process.env.PORT || 3001;

// Enhanced CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Updated to match frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to databases
connectToDatabase();

// Auth routes
app.use('/auth', require('./routes/auth'));

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});