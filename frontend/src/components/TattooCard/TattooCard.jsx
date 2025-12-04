import React from "react";
import "../TattooCard/TattooCard.css";

const TattooCard = ({ tattoo }) => {
  return (
    <div className="tattoo-card">
      {tattoo.image && (
        <img src={`http://localhost:3000${tattoo.image}`} alt={tattoo.name} />
      )}
      <h3>{tattoo.name}</h3>
      <button className="reserve-btn">RESERVA</button>
    </div>
  );
};
export default TattooCard;
