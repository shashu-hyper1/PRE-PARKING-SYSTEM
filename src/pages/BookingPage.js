import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const totalSlots = 6;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for backend clear to finish before fetching slots
    axios.delete('http://localhost:5000/api/booking/clear')
      .then(() => {
        axios.get('http://localhost:5000/api/booking/booked')
          .then(res => {
            setBookedSlots(res.data.bookedSlots);
          })
          .catch(err => {
            console.error('Error fetching booked slots:', err);
          });
      })
      .catch(err => {
        console.error('Failed to clear bookings:', err);
      });
  }, []);

  const handleBook = async () => {
    if (!selectedSlot || !email) {
      alert('Please select a slot and enter your email.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/booking', {
        email,
        slot: selectedSlot,
      });

      alert(res.data.message);
      setSelectedSlot(null);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('booking', JSON.stringify({
        slot: selectedSlot,
        email,
        time: new Date().toLocaleString()
      }));

      navigate('/confirm');
    } catch (err) {
      alert('Error booking slot');
      console.error(err);
    }
  };

  return (
    <div className="page center">
      <h2>🅿️ Book Your Parking Slot</h2>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
        {[...Array(totalSlots)].map((_, i) => {
          const slotNum = i + 1;
          const isBooked = bookedSlots.includes(slotNum);

          return (
            <button
              key={slotNum}
              onClick={() => !isBooked && setSelectedSlot(slotNum)}
              disabled={isBooked}
              style={{
                padding: '1rem',
                backgroundColor: selectedSlot === slotNum ? '#f44336' : isBooked ? '#aaa' : '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: isBooked ? 'not-allowed' : 'pointer'
              }}
            >
              {isBooked ? `Booked` : `Slot ${slotNum}`}
            </button>
          );
        })}
      </div>

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '300px' }}
      />

      <br />
      <button className="btn" onClick={handleBook}>Confirm Booking</button>
    </div>
  );
}
