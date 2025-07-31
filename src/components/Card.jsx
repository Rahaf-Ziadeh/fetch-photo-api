import React from "react";
import "../App.css";

function Card({ thumbnailUrl, alt, id }) {
  return (
    <div className="photo-card" key={id}>
      <img src={thumbnailUrl} alt={alt} style={{ width: "100%" }} />
      <p className="photo-title">{alt}</p>
    </div>
  );
}
export default Card;
