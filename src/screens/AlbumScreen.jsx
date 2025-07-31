import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../services/PhotoFetch";
import Card from "../components/card";
import Loader from "../components/Loader";

function AlbumScreen() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);

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

  const handleSelect = (id) => {
  setSelected((prevSelected) => {
    const alreadySelected = prevSelected.includes(id);

    if (alreadySelected) {
      return prevSelected.filter((item) => item !== id);
    } else {
      return [...prevSelected, id];
    }
  });
};

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <h2 className="photo-heading">
        Fetched {photos.length} photos | Selected: {selected.length}
      </h2>
      <div className="photos-grid">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            id={photo.id}
            thumbnailUrl={photo.thumbnailUrl}
            alt={photo.title}
            isSelected={selected.includes(photo.id)}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumScreen;
