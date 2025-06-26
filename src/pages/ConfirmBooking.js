import React from 'react';

export default function ConfirmBooking() {
  const booking = JSON.parse(localStorage.getItem('booking'));

  if (!booking) return <h2 style={{ padding: '2rem' }}>No booking found.</h2>;

  return (
    <div className="page center">
      <h2>✅ Booking Confirmed!</h2>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Slot Number:</strong> {booking.slot}</p>
      <p><strong>Time:</strong> {booking.time}</p>
    </div>
  );
}
