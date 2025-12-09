import api from "../apiClient";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

// Opcional: funciones para borrar o actualizar
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

export const updateBooking = async (id_booking, updatedBooking) => {
  return await api.put(`/bookings/${id_booking}`, updatedBooking);
};