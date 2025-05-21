import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Baseurl = import.meta.env.VITE_BASE_URL || "http://localhost:4000"

export default function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShortUrl("");

    try {
      const response = await fetch(`${Baseurl}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          response.status === 401 &&
          data.message?.toLowerCase().includes("token expired")
        ) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error(data.message || "Failed to shorten URL");
      }

      // Assuming your backend returns `shortCode` in the response
      setShortUrl(`${Baseurl}/redirect/${data.shortCode}`);
      setLongUrl("");
    } catch (err) {
      setErrorMessage(err.message || "Failed to shorten URL");
    }
  };

  return (
    <div className="contain">
      <h2>Dashboard</h2>

      <form onSubmit={handleShorten} className="labels">
        <input
          type="url"
          placeholder="Paste a long URL"
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            setErrorMessage("");
          }}
          required
        />
        <button type="submit" className="btn">Shorten URL</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {shortUrl && (
        <div className="short-url">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
