const { MongoClient } = require('mongodb');

let client = null;

async function connectToDatabase() {
  try {
    if (!client) {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/water-quality';
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      await client.connect();
      console.log('Connected to MongoDB successfully');
    }
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

function getDatabase() {
  if (!client || !client.topology || !client.topology.isConnected()) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return client.db();
}

module.exports = {
  connectToDatabase,
  getDatabase
};