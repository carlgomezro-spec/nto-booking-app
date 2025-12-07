import React, { useEffect, useState } from "react";
import { getUsers, getBookings } from "../../services/adminService";
import Dashboard from "../../components/Dashboard/Dashboard";
import BookingsPage from "../../components/BookingPage/BookingPage";
import "../../pages/Admin/Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const bookingsData = await getBookings();
        setUsers(usersData);
        setBookings(bookingsData);
      } catch (err) {
        console.error(err);
        alert("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando admin...</p>;

  return (
    <section className="admin-section">
      <h1>Admin Dashboard</h1>

      {/* Cards de dashboard */}
      <Dashboard bookings={bookings} />

      {/* Tabla de usuarios */}
      <div className="admin-table">
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id_user}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de bookings */}
      <BookingsPage bookings={bookings} />
    </section>
  );
};

export default Admin;
