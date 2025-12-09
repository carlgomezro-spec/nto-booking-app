import React, { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../../services/adminService";
import UserTable from "../../components/UserTable/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async (id_user, updatedData) => {
    try {
      await updateUser(id_user, updatedData);
      setUsers((prev) =>
        prev.map((u) => (u.id_user === id_user ? { ...u, ...updatedData } : u))
      );
      alert("Usuario actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
    }
  };

  const handleDelete = async (id_user) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await deleteUser(id_user);
      setUsers((prev) => prev.filter((u) => u.id_user !== id_user));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <section className="admin-section">
      <h2>Gestionar Usuarios</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <UserTable
        users={filteredUsers}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default UsersPage;
