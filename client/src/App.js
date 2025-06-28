import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:3000/sid/shorten", { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="error">{typeof error==='string ? error: error.message'}</p>}

      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
