import React, { useEffect, useState } from "react";

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Fetched {photos.length} photos</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              width: "150px",
              background: "#bdaaaaff",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "12px" }}>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
