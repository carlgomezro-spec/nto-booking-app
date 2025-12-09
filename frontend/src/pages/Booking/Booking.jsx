import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../Booking/Booking.css";
import DatePicker from "react-datepicker";
import GoogleCalendarButton from "../../components/GoogleCalendarButton/GoogleCalendarButton.jsx";

const Booking = () => {
  const { id } = useParams(); // id del tatuaje
  const navigate = useNavigate();

  const [tattoo, setTattoo] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [googleLink, setGoogleLink] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const token = localStorage.getItem("token");

  // -------------------------
  // Obtener tatuaje
  // -------------------------
  useEffect(() => {
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

  // -------------------------
  // Obtener reservas de este tatuaje
  // -------------------------
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!token) {
        console.warn("No hay token, no se pueden cargar reservas");
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/bookings/tattoo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Reservas de este tatuaje:", res.data);

        // Convertir cada reserva a Date
        const slots = res.data.map((b) => {
          const date = new Date(b.date_booking);
          if (b.hour_booking) {
            const [hours, minutes, seconds] = b.hour_booking.split(":");
            date.setHours(hours, minutes, seconds);
          }
          return date;
        });

        console.log("Slots procesados:", slots);
        setBookedSlots(slots);
      } catch (err) {
        console.error("Error al cargar horas reservadas", err);
      }
    };

    fetchBookedSlots();
  }, [id, API_BASE, token]);

  // -----------------------------
  // Generar enlace Google Calendar con dirección
  // -----------------------------
  const getGoogleCalendarLink = () => {
    if (!selectedDateTime || !tattoo?.name) return "";

    const start = selectedDateTime;
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1h

    const formatDate = (d) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const startStr = formatDate(start);
    const endStr = formatDate(end);

    const title = encodeURIComponent(`Tatuaje: ${tattoo.name}`);
    const details = encodeURIComponent("Reserva en Neto Studio");
    const location = encodeURIComponent("Avenida Rafael Alberti, 32, Madrid"); // dirección del estudio

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startStr}%2F${endStr}`;
  };

  // -----------------------------
  // Confirmar reserva
  // -----------------------------
  const handleConfirmBooking = async () => {
    if (!token) return alert("Debes estar logueado para reservar");
    if (!selectedDateTime) return alert("Selecciona fecha y hora");

    const dateTimeISO = selectedDateTime.toISOString();
    const hour_booking = dateTimeISO.slice(11, 19);

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Reserva completada!");
      setBookingConfirmed(true);
      setGoogleLink(getGoogleCalendarLink());
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
      <p className="booking-note">
        <strong>RECUERDA:</strong> Es obligatorio el pago de <strong>38€</strong>{" "}
        como depósito para reservar cita. Te enviaremos un enlace para el pago.
      </p>

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

        <label>Selecciona fecha y hora:</label>
        <DatePicker
          selected={selectedDateTime}
          onChange={(date) => setSelectedDateTime(date)}
          showTimeSelect
          timeIntervals={30}
          minDate={new Date()}
          dateFormat="Pp"
          className="datepicker-input"
          placeholderText="Elige día y hora"
          filterTime={(time) =>
            !bookedSlots.some(
              (slot) =>
                slot.getFullYear() === time.getFullYear() &&
                slot.getMonth() === time.getMonth() &&
                slot.getDate() === time.getDate() &&
                slot.getHours() === time.getHours() &&
                slot.getMinutes() === time.getMinutes()
            )
          }
          timeClassName={(time) =>
            bookedSlots.some(
              (slot) =>
                slot.getFullYear() === time.getFullYear() &&
                slot.getMonth() === time.getMonth() &&
                slot.getDate() === time.getDate() &&
                slot.getHours() === time.getHours() &&
                slot.getMinutes() === time.getMinutes()
            )
              ? "time-slot-booked"
              : undefined
          }
        />

        <button className="confirm-booking-btn" onClick={handleConfirmBooking}>
          Confirmar reserva
        </button>

        {bookingConfirmed && <GoogleCalendarButton link={googleLink} />}
      </div>
    </section>
  );
};

export default Booking;
