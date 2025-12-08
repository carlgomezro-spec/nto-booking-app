import React, { useState, useEffect } from "react";
import { getProfile, updateUser, logout } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // Cargar perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormData({ name: data.name, email: data.email, password: "" });
      } catch (err) {
        console.error(err);
        setError(err.message || "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Guardar cambios
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // No enviar password vacío
      const dataToUpdate = { ...formData };
      if (!dataToUpdate.password) delete dataToUpdate.password;

      const updatedUser = await updateUser(user.id_user, dataToUpdate);
      setUser(updatedUser);
      setFormData({ ...formData, password: "" }); // limpiar el campo password
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el perfil: " + (err.message || "Desconocido"));
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <section className="profile-container">
     
      <h1>Perfil</h1>
       <div className="profile-avatar">
        <img
          src="/assets/nto.logo.profile.jpg"
          alt="Avatar de usuario"
        />
      </div>
      <div className="profile-field">
        <label>
          Nombre:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
      </div>

      <div className="profile-field">
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
      </div>

      <div className="profile-field">
        <label>
          Nueva contraseña:
          <input
            type="password"
            placeholder="Introduce nueva contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
      </div>

      <div className="profile-actions">
        <button className="save-changes-btn"onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>
    </section>
  );
};

export default Profile;
