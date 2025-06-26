require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes'); // fixed filename
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Clear bookings on server start
db.query('DELETE FROM bookings', (err) => {
  if (err) {
    console.error('Error clearing bookings on server start:', err);
  } else {
    console.log('✅ All bookings cleared on server start');
  }
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

app.get('/', (req, res) => {
  res.send('🚀 ParkItNow backend is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
