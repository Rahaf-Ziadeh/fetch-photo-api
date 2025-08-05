import React from "react";
import "../styles/App.css";

function Card({ thumbnailUrl, alt, id, isSelected, onClick }) {
  return (
    <div
      className={`photo-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(id)}
    >
      <img src={thumbnailUrl} alt={alt} style={{ width: "100%" }} />
      <p className="photo-title">{alt}</p>
    </div>
  );
}
export default Card;
