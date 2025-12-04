import React from "react";
import "../TattooCard/TattooCard.css";

const TattooCard = ({ tattoo }) => {
  return (
    <div className="tattoo-card">
      <div className="tattoo-image-wrapper">
        {tattoo.image && (
          <img
            src={`http://localhost:3000${tattoo.image}`}
            alt={tattoo.name}
            className="tattoo-image"
          />
        )}
      </div>
      <div className="tattoo-list">
        <h3>{tattoo.name}</h3>
        <button className="reserve-btn">RESERVA</button>
      </div>
    </div>
  );
};

export default TattooCard;
