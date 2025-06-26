import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // reuse same styles

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const validateEmail = (value) =>
    /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const validatePassword = (value) =>
    /^[A-Za-z]+$/.test(value); // only letters

  const handleSignup = async () => {
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Invalid email format.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMsg('Password must contain only letters.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });

      if (res.data.success) {
        alert('✅ Registration successful! Please login.');
        navigate('/login');
      } else {
        setErrorMsg(res.data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Signup error. Email may already exist.');
    }
  };

  return (
    <div className="login-container">
      <h2>📝 Sign Up</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />

      <input
        type="password"
        placeholder="Password (letters only)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      <button className="btn" onClick={handleSignup}>
        Create Account
      </button>
      <p style={{ marginTop: '1rem' }}>
  Already have an account? <a href="/login">Login</a>
</p>

    </div>
  );
}
