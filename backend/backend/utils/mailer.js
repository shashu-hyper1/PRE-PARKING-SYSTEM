require('dotenv').config(); // Load .env variables

const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP with OAuth2 or App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address
    pass: process.env.EMAIL_PASS,  // Your Gmail App Password (NOT your regular password)
  },
});

// Function to send booking confirmation email
function sendBookingEmail(toEmail, slot, time, accessToken) {
  // Backend access link (works from anywhere)
  const backendLink = `http://localhost:5000/api/gate/access/${accessToken}`;
  // Direct NodeMCU link (only works on same Wi-Fi)
  const espLink = `http://192.168.3.4/open?slot=2`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'ParkItNow Booking Confirmation 🚗',
    html: `<p>Hello!</p>
      <p>Your parking slot <b>${slot}</b> has been successfully booked at ${time}.</p>
      <p><b>To open the gate (works from anywhere):</b><br>
      <a href="${backendLink}">${backendLink}</a></p>
      <p><b>To open the gate (must be on same Wi-Fi):</b><br>
      <a href="${espLink}">${espLink}</a></p>
      <p>Thank you for using ParkItNow!<br>- The ParkItNow Team</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendBookingEmail };
