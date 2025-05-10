import React, { useEffect, useState } from 'react';

function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/myUrls', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch URLs');
      }
      if (!Array.isArray(data)){
        throw new Error('Invalid response format')
      }
      setUrls(data);
    })
    .catch((err) => {
      setError(err.message);
    });
    
  }, []);
  

  return (
    <div>
      <h2>My Shortened URLs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            Original: <a href={url.original_url} target="_blank" rel="noreferrer">{url.original_url}</a> <br />
            Short: <a href={`http://localhost:3000/${url.short_url}`} target="_blank" rel="noreferrer">{`http://localhost:3000/${url.short_url}`}</a> <br />
            Hits: {url.hits} | Created: {new Date(url.created_at).toLocaleString()}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyUrls;
