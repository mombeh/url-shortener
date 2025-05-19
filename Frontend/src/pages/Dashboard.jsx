import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect to login if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUrls();
    }
  }, [token]);

  const fetchUrls = async () => {
    try {
      const response = await fetch("http://localhost:3000/myUrls", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // if (!response.ok) {
      //   if (
      //     response.status === 401 &&
      //     data.message?.toLowerCase().includes("token expired")
      //   ) {
      //     localStorage.removeItem("token");
      //     navigate("/login");
      //     return;
      //   }
      //   throw new Error(data.message || "Failed to fetch URLs");
      // }

      setUrls(data.urls);
    } catch (err) {
      setErrorMessage(err.message || "Failed to fetch URLs");
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/shorten", {
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

      setLongUrl("");
      setSuccessMessage("URL shortened successfully!");
      fetchUrls(); // Refresh URL list
    } catch (err) {
      setErrorMessage(err.message || "Failed to shorten URL");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <form onSubmit={handleShorten} className="labels">
        <input
          type="url"
          placeholder="Paste a long URL"
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            setErrorMessage("");
            setSuccessMessage("");
          }}
          required
        />
        <button type="submit" className="btn">Shorten URL</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <h3>Your Shortened URLs</h3>
      {Array.isArray(urls) && urls.length === 0 ? (
        <p>No URLs yet.</p>
      ) : (
        <ul>
          {Array.isArray(urls) &&
            urls.map((url, index) => (
              <li key={index}>
                <p>
                  Original: <a href={url.longUrl} target="_blank" rel="noopener noreferrer">{url.longUrl}</a><br />
                  Short: <a href={`http://localhost:3000/redirect/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    http://localhost:3000/redirect/{url.shortCode}
                  </a><br />
                  Clicks: {url.clicks}
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
