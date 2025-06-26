const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const { sendBookingEmail } = require('../utils/mailer');

// 📦 Book a slot
router.post('/', (req, res) => {
  const { email, slot } = req.body;
  const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const token = crypto.randomBytes(20).toString('hex');

  // Insert booking with access token
  db.query(
    'INSERT INTO bookings (user_email, slot, time, access_token) VALUES (?, ?, ?, ?)',
    [email, slot, time, token],
    (err) => {
      if (err) return res.status(500).send(err);

      // 📬 Email link with access token
      const accessLink = `http://localhost:5000/api/gate/access/${token}`;
      sendBookingEmail(email, slot, time, accessLink)
        .then(() => {
          res.json({ success: true, message: 'Slot booked and email sent!' });
        })
        .catch((emailErr) => {
          console.error(emailErr);
          res.json({ success: true, message: 'Slot booked, but email failed to send.' });
        });
    }
  );
});

// ✅ View booked slots (for frontend to disable)
router.get('/booked', (req, res) => {
  db.query('SELECT slot FROM bookings', (err, result) => {
    if (err) return res.status(500).send(err);
    const bookedSlots = result.map((row) => row.slot);
    res.json({ bookedSlots });
  });
});

// 🔁 Booking history
router.get('/history/:email', (req, res) => {
  const email = req.params.email;
  db.query(
    'SELECT slot, time FROM bookings WHERE user_email = ? ORDER BY time DESC',
    [email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// 🧹 Clear all bookings — new route
router.delete('/clear', (req, res) => {
  db.query('DELETE FROM bookings', (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to clear bookings' });
    res.json({ success: true, message: 'All bookings cleared!' });
  });
});

module.exports = router;
