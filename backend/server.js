require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./src/config/db');

// Connect to Database
// We mock connection here so we don't crash before .env is populated with real DB string
// In a real scenario you would call connectDB() directly
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb://127.0.0.1:27017/elite_engineers_placeholder') {
    connectDB();
} else {
    console.log('Using placeholder MongoDB URI, please configure .env');
}


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
