import React from "react";
import { useNavigate } from "react-router-dom";
import "../TattooCard/TattooCard.css";

const TattooCard = ({ tattoo }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/booking/${tattoo.id_tattoo}`);
  };

  // Base URL de la API desde VITE
  const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // Normalizar el nombre de la imagen para evitar duplicar /uploads
  const cleanImage = tattoo.image?.replace(/^\/?uploads\/?/, "");

  const imageSrc = cleanImage
    ? `${API_BASE}/uploads/${cleanImage}`
    : tattoo.image?.startsWith("http")
      ? tattoo.image
      : ""; // fallback vacío si no hay imagen

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
        <button className="reserve-btn" onClick={handleReserve}>
          RESERVA
        </button>
      </div>
    </article>
  );
};

export default TattooCard;
