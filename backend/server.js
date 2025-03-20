require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { connectToDatabase, getDatabase } = require('./lib/mongodb');
const { connectToRedis, redisClient } = require('./lib/redis');
const { startDataSync } = require('./services/data-sync');

// Routes
const authRoutes = require('./routes/auth');
const sensorRoutes = require('./routes/sensors');
const alertRoutes = require('./routes/alerts');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware setup first
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove the duplicate signup route from server.js
// and use the routes from the separate files
app.use('/api/auth', authRoutes);

// Only add these if the route files exist
if (sensorRoutes) app.use('/api/sensors', sensorRoutes);
if (alertRoutes) app.use('/api/alerts', alertRoutes);

// Basic auth routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup attempt:', { name, email });

  try {
    // Ensure database connection
    await connectToDatabase();
    const db = await getDatabase();
    
    if (!db) {
      console.error('Database connection failed');
      return res.status(500).json({
        success: false,
        message: 'Database connection error'
      });
    }

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const result = await db.collection('users').insertOne({
      name,
      email,
      password,
      createdAt: new Date()
    });

    if (!result.acknowledged) {
      throw new Error('Failed to insert user');
    }

    console.log('User registered successfully:', { name, email });

    res.json({
      success: true,
      message: 'Account created successfully'
    });
  } catch (error) {
    console.error('Signup error details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account',
      details: error.message
    });
  }
});

// Add this near the top of the file, after the imports
const PORT = process.env.PORT || 3001;

// Add this near the end of the file, before server.listen
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Update the server.listen section
server.listen(PORT, async () => {
  try {
    console.log('🚀 Server starting...');
    await connectToDatabase();
    console.log('📦 MongoDB connected');
    await connectToRedis();
    console.log('🔄 Redis connected');
    console.log(`⚡ Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log(`  POST http://localhost:${PORT}/api/auth/signup`);
    console.log(`  POST http://localhost:${PORT}/api/auth/login`);
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
});