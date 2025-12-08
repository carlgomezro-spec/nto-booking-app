import React from "react";
import "../GoogleCalendarButton/GoogleCalendarButton.css";

const GoogleCalendarButton = ({ link }) => {
  if (!link) return null;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="google-calendar-btn"> Añadir al Calendar</a>
  );
};

export default GoogleCalendarButton;
