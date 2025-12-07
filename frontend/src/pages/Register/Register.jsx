import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/userService";
import "../Register/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate("/login"); // Redirige al login después de registrarse
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };
  return <section className="register-section">
  <div className="register-header">
    <Link to="/"><TbArrowBackUp color="black" size={24} /></Link>
    <h1>Register</h1>
  </div>
  <form className="register-form" onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Nombre"
      value={form.name}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Contraseña"
      value={form.password}
      onChange={handleChange}
      required
    />
    {error && <p style={{ color: "red" }}>{error}</p>}
    <button className="register-btn" type="submit">Registrarse</button>
  </form>
</section>

};

export default Register;
