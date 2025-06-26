const express = require('express');
const router = express.Router();
const db = require('../db');

// Login Route
router.post('/login', (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password' });
  }

  // Trim inputs
  email = email.trim();
  password = password.trim();

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('SQL error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      if (results.length > 0) {
        return res.json({ success: true, email });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  );
});

module.exports = router;
