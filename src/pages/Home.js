import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

export default function Home() {
  const navigate = useNavigate();
  const [result, setResult] = useState('');

  const handleSearch = (text) => {
    setResult(`Showing parking near: ${text}`);
  };

  return (
    <div className="page center">
      <h1>🅿️ ParkItNow</h1>
      <SearchBox onSearch={handleSearch} />
      <p>{result}</p>

      <button className="btn" onClick={() => navigate('/book')}>Book Slot</button>
      <button className="btn gray" onClick={() => navigate('/confirm')}>View Booking</button>
    </div>
  );
}
