import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Booking/Booking.css";

const Booking = () => {
  const { id } = useParams(); // id del tatuaje
  const navigate = useNavigate();

  const [tattoo, setTattoo] = useState(null);
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [time, setTime] = useState(""); // HH:MM
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // usar VITE_API_URL
  const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // Obtener token desde localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!/^\d+$/.test(id)) {
      setError("ID inválido para el tatuaje");
      setLoading(false);
      return;
    }

    const fetchTattoo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/tattoos/${id}`);
        setTattoo(res.data);
        setLoading(false);
      } catch {
        setError("No se pudo cargar el tatuaje");
        setLoading(false);
      }
    };

    fetchTattoo();
  }, [id, API_BASE]);

  const handleConfirmBooking = async () => {
    if (!token) return alert("Debes estar logueado para reservar");
    if (!date || !time) return alert("Selecciona fecha y hora");

    // Combinar fecha y hora en timestamp ISO
    const dateTimeISO = new Date(`${date}T${time}:00`).toISOString();
    const hour_booking = `${time}:00`;

    console.log({ id_tattoo: tattoo.id_tattoo, date_booking: dateTimeISO, hour_booking });

    try {
      await axios.post(
        `${API_BASE}/bookings`,
        {
          id_tattoo: tattoo.id_tattoo,
          date_booking: dateTimeISO,
          hour_booking,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- token enviado correctamente
          },
        }
      );

      alert("Reserva completada!");
      navigate("/home");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert("No se pudo crear la reserva");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="booking-page">
      <h1>Reserva tu tatuaje</h1>
      <p><strong>RECUERDA: </strong>Es obligatorio el pago de <strong>38€ </strong>como depósito para reservar cita para tattoo. Sin depósito, no podemos dar cita. Cuando hables con nosotros te enviaremos un enlace para el pago del depósito.</p>

      <div className="booking-image-wrapper">
        <img
          src={
            tattoo?.image
              ? tattoo.image.startsWith("http")
                ? tattoo.image
                : `${API_BASE}${tattoo.image}`
              : ""
          }
          alt={tattoo.name}
          className="booking-image"
        />
      </div>

      <div className="booking-info">
        <h2>{tattoo.name}</h2>
        <p>{tattoo.description}</p>

        <label>Selecciona fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Selecciona hora:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
          Confirmar reserva
        </button>
      </div>
    </section>
  );
};

export default Booking;
