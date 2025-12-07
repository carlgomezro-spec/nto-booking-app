import React, { useState } from "react";
import "../../pages/Admin/Admin.css";

const EditBookingModal = ({ booking, onClose, onSave }) => {
  const [date_booking, setDate] = useState(booking.date_booking.slice(0, 10));
  const [hour_booking, setHour] = useState(booking.hour_booking);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...booking, date_booking, hour_booking });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Editar Reserva</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Fecha:
            <input type="date" value={date_booking} onChange={e => setDate(e.target.value)} />
          </label>
          <label>
            Hora:
            <input type="time" value={hour_booking} onChange={e => setHour(e.target.value)} />
          </label>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
