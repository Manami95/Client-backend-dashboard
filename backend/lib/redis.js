const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: retries => {
      if (retries > 10) {
        console.log('Redis connection failed, continuing without Redis');
        return false;
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

async function connectToRedis() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
    return true;
  } catch (error) {
    console.warn('Redis connection error:', error.message);
    console.log('Continuing without Redis connection');
    return false;
  }
}

module.exports = {
  connectToRedis,
  redisClient
};