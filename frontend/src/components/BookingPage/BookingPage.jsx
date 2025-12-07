import React, { useState, useEffect } from "react";
import { updateBooking, deleteBooking } from "../../services/adminService";
import "../../pages/Admin/Admin.css";

const BookingsPage = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setBookings(initialBookings);
  }, [initialBookings]);

  // Filtrar bookings según buscador
  const filteredBookings = bookings.filter(b =>
    b.user_name.toLowerCase().includes(search.toLowerCase()) ||
    b.tattoo_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (id_booking, field, value) => {
    setBookings(prev =>
      prev.map(b => b.id_booking === id_booking ? { ...b, [field]: value } : b)
    );
  };

  const handleUpdate = async (b) => {
    try {
      await updateBooking(b.id_booking, {
        date_booking: b.date_booking,
        hour_booking: b.hour_booking
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
      setBookings(prev => prev.filter(b => b.id_booking !== id_booking));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar booking");
    }
  };

  return (
    <div className="admin-table">
      <h2>Bookings</h2>

      <input
        type="text"
        placeholder="Buscar por usuario o tattoo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      <table>
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
          {filteredBookings.map(b => (
            <tr key={b.id_booking}>
              <td>{b.user_name}</td>
              <td>{b.tattoo_name}</td>
              <td>
                <input
                  type="date"
                  value={b.date_booking.split("T")[0]}
                  onChange={e => handleChange(b.id_booking, "date_booking", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={b.hour_booking}
                  onChange={e => handleChange(b.id_booking, "hour_booking", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(b)}>Guardar</button>
                <button onClick={() => handleDelete(b.id_booking)} style={{marginLeft:"5px", background:"red", color:"white"}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;
