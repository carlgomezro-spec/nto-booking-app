import React from "react";
import { useNavigate } from "react-router-dom";
import "../TattooCard/TattooCard.css";

const TattooCard = ({ tattoo }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/booking/${tattoo.id_tattoo}`);
  };

  // usar VITE_API_URL 
  const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const imageSrc = tattoo?.image
    ? tattoo.image.startsWith("http")
      ? tattoo.image
      : `${API_BASE}${tattoo.image}`
    : "";

  return (
    <article className="tattoo-card">
      <div className="tattoo-image-wrapper">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={tattoo.name}
            className="tattoo-image"
          />
        )}
      </div>
      <div className="tattoo-list">
        <h3>{tattoo.name}</h3>
        <button className="reserve-btn" onClick={handleReserve}>RESERVA</button>
      </div>
    </article>
  );
};

export default TattooCard;