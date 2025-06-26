import React, { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [text, setText] = useState('');

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search for supermarket..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <button
        onClick={() => onSearch(text)}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        Search
      </button>
    </div>
  );
}
