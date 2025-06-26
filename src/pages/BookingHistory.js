import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/booking/history/${email}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error('Error loading history:', err));
  }, [email]);

  return (
    <div className="page center">
      <h2>📜 Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: 'auto' }}>
          {bookings.map((b, i) => (
            <li key={i}>
              <strong>Slot:</strong> {b.slot} | <strong>Time:</strong> {b.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
