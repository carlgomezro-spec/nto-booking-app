import React, { useState, useEffect } from "react";
import { getProfile } from "../../services/userService"; // Ajusta la ruta según tu proyecto
import "./Profile.css";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // actualizar localStorage
      } catch (err) {
        console.error(err);
        setError(err.message || "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <section>
      <h1>Perfil</h1>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </section>
  );
};

export default Profile;
