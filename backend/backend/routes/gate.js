const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');

router.get('/access/:token', async (req, res) => {
  const { token } = req.params;

  db.query('SELECT * FROM bookings WHERE access_token = ?', [token], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).send('❌ Invalid or expired link');
    }

    // 🧠 Send trigger to NodeMCU
    try {
      // Pass slot number to NodeMCU if available
      const slot = result[0].slot;
      await axios.get(`http://192.168.208.4/open?slot=${slot}`);
      res.send('✅ Gate is opening. Drive in!');
    } catch (e) {
      console.error('Error triggering NodeMCU:', e);
      res.status(500).send('Error triggering the gate.');
    }
  });
});

// Open gate for a slot (trigger NodeMCU)
router.get('/open', async (req, res) => {
  const { slot } = req.query;
  if (!slot) return res.status(400).send('Slot is required');

  // TODO: Replace with your NodeMCU's actual IP address
  const nodeMcuUrl = `http://192.168.1.100/open?slot=${slot}`;

  try {
    // Send HTTP request to NodeMCU
    await axios.get(nodeMcuUrl);
    res.send('✅ Gate is opening. Drive in!');
  } catch (e) {
    console.error('Error triggering NodeMCU:', e);
    res.status(500).send('Error triggering the gate.');
  }
});

module.exports = router;
