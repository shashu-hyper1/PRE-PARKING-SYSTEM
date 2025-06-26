import React from 'react';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const user = localStorage.getItem('userEmail');
  const booking = JSON.parse(localStorage.getItem('booking'));

  return (
    <div className="page center">
      <h2>👤 Profile</h2>
      <p><strong>Email:</strong> {user}</p>

      {booking ? (
        <>
          <h3>📋 Booking History</h3>
          <p><strong>Slot:</strong> {booking.slot}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <button
            className="btn red"
            onClick={() => {
              localStorage.removeItem('booking');
              window.location.reload();
            }}
          >
            🧼 Clear Booking
          </button>
        </>
      ) : (
        <p>No bookings yet.</p>
      )}

      <br />
      <button className="btn gray" onClick={() => {
        logout();
        navigate('/login');
      }}>Logout</button>
    </div>
  );
}
