import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading photos...</p>;
  if (error) return <p>Error: {error}</p>;

  function Card({ thumbnailUrl, alt, id }) {
    return (
      <div className="photo-card" key={id}>
        <img src={thumbnailUrl} alt={alt} style={{ width: "100%" }} />
        <p className="photo-title">{alt}</p>
      </div>
    );
  }
  return (
    <div className="app-container">
      <h2 className="photo-heading">Fetched {photos.length} photos</h2>

      <div className="photos-grid">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            thumbnail={photo.thumbnailUrl}
            alt={photo.title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
