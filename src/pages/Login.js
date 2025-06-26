import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // visible letters
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data.success) {
        localStorage.setItem('userEmail', res.data.email);
        navigate('/'); // redirect to Home or Profile
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="page center" style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>🔐 Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        style={{ marginBottom: '1rem' }}
      />

      <input
        type="text"  // visible text for password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        style={{ marginBottom: '1rem' }}
      />

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <button onClick={handleLogin} className="btn">
        Login
      </button>
    </div>
  );
}
