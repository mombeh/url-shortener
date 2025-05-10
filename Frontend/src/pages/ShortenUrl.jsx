import React, { useState } from 'react';

function ShortenUrl() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ longUrl })
      });
      

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error shortening URL');
      }

      setShortUrl(data.shortUrl);
      setError(null); // Clear error if successful
    } catch (err) {
      setError(err.message);
      setShortUrl(''); // Clear the short URL if there's an error
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div>
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter the long URL"
          required
        />
        <button type="submit">Shorten URL</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <div>
          <p>Your shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default ShortenUrl;
