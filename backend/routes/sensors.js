const express = require('express');
const router = express.Router();

// Temporary storage for sensor data (replace with database later)
const sensorData = new Map();

router.post('/data', async (req, res) => {
  try {
    const { sensorId, type, value, timestamp } = req.body;
    console.log('Received sensor data:', { sensorId, type, value, timestamp });

    // Store sensor reading
    if (!sensorData.has(sensorId)) {
      sensorData.set(sensorId, []);
    }
    sensorData.get(sensorId).push({ type, value, timestamp });

    res.json({
      success: true,
      message: 'Sensor data received'
    });
  } catch (error) {
    console.error('Sensor data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process sensor data'
    });
  }
});

router.get('/data/:sensorId', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const readings = sensorData.get(sensorId) || [];

    res.json({
      success: true,
      data: readings
    });
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sensor data'
    });
  }
});

module.exports = router;