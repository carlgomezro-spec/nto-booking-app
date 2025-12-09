import React, { useState, useEffect } from "react";
import "./UserTable.css";

const UserTable = ({ users, onUpdate, onDelete }) => {
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleChange = (id_user, field, value) => {
    setLocalUsers((prev) =>
      prev.map((u) => (u.id_user === id_user ? { ...u, [field]: value } : u))
    );
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.map((user) => (
            <tr key={user.id_user}>
              <td data-label="Nombre">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleChange(user.id_user, "name", e.target.value)}
                />
              </td>
              <td data-label="Email">
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleChange(user.id_user, "email", e.target.value)}
                />
              </td>
              <td data-label="Acciones">
                <button
                  className="save-btn"
                  onClick={() => onUpdate(user.id_user, { name: user.name, email: user.email })}
                >
                  Guardar
                </button>
                <button className="delete-btn" onClick={() => onDelete(user.id_user)}>
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

export default UserTable;
