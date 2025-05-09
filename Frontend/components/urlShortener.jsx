import React, { useState } from 'react';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
  
    try {
      const res = await fetch("http://localhost:3000/api/shorten", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token here if required
        },
        body: JSON.stringify({ longUrl, expiresAt })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Long URL:
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Expiry Date (optional):
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </label>
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UrlShortener;
