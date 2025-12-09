import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { updateBooking, deleteBooking, getBookings } from "../../services/adminService";
import "./BookingPage.css"; 

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]); // inicializamos como array
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data); // ahora sí es un array
      } catch (err) {
        console.error(err);
        alert("Error al cargar reservas");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Evitar .filter sobre undefined
  const filteredBookings = bookings.filter((b) =>
    b.user_name.toLowerCase().includes(search.toLowerCase()) ||
    b.tattoo_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (id_booking, field, value) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id_booking === id_booking ? { ...b, [field]: value } : b
      )
    );
  };

  const handleUpdate = async (b) => {
    try {
      await updateBooking(b.id_booking, {
        date_booking: b.date_booking,
        hour_booking: b.hour_booking,
      });
      alert("Booking actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar booking");
    }
  };

  const handleDelete = async (id_booking) => {
    if (!window.confirm("¿Eliminar esta booking?")) return;
    try {
      await deleteBooking(id_booking);
      setBookings((prev) => prev.filter((b) => b.id_booking !== id_booking));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar booking");
    }
  };

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div className="bookings-container">
      <h2>Gestionar Reservas</h2>
      {/* Dashboard solo en bookings */}
      <Dashboard bookings={bookings} />

      <input
        type="text"
        placeholder="Buscar por usuario o tattoo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Tattoo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b.id_booking}>
              <td data-label="Usuario">{b.user_name}</td>
              <td data-label="Tattoo">{b.tattoo_name}</td>
              <td data-label="Fecha">
                <input
                  type="date"
                  value={b.date_booking.split("T")[0]}
                  onChange={(e) =>
                    handleChange(b.id_booking, "date_booking", e.target.value)
                  }
                />
              </td>
              <td data-label="Hora">
                <input
                  type="time"
                  value={b.hour_booking}
                  onChange={(e) =>
                    handleChange(b.id_booking, "hour_booking", e.target.value)
                  }
                />
              </td>
              <td data-label="Acciones" className="actions-cell">
                <button className="save-btn" onClick={() => handleUpdate(b)}>
                  Guardar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(b.id_booking)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;
