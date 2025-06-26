import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Pages
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import ConfirmBooking from './pages/ConfirmBooking';
import BookingHistory from './pages/BookingHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';

// Global CSS import (optional)
import './App.css';

function App() {
  // Clear stale booking on reload (for fresh state every time)
  useEffect(() => {
    localStorage.removeItem('booking');
    // Clear all bookings in backend on every page load
    axios.delete('http://localhost:5000/api/booking/clear')
      .then(() => console.log('All bookings cleared on page load'))
      .catch((err) => console.error('Failed to clear bookings:', err));
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/confirm" element={<ConfirmBooking />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
