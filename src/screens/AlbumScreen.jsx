import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../services/PhotoFetch";
import Card from "../components/card";

function AlbumScreen() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await fetchPhotos();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  if (loading) return <p>Loading photos...</p>;
  if (error) return <p>Error: {error}</p>;

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

export default AlbumScreen;
