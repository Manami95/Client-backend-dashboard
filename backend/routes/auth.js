const express = require('express');
const router = express.Router();
const { getDatabase } = require('../lib/mongodb');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Creating account for:', email);

    const db = await getDatabase();
    
    // Check if user already exists in MongoDB
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Store user in MongoDB
    const result = await db.collection('users').insertOne({
      name,
      email,
      password,
      createdAt: new Date()
    });

    console.log('User registered:', { name, email });

    res.json({
      success: true,
      message: 'Account created successfully',
      user: { name, email }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const db = await getDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    if (user.password !== password) {
      console.log('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      });
    }

    console.log('Login successful for:', email);
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Make sure to export the router
module.exports = router;