import { useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // URL del backend tomada de VITE_API_URL
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      
      // data = { token, user: { role, name, ... } }
      const user = data.user;

      if (!user || !user.role) {
        console.error("No se encontró user.role en la respuesta del backend");
        alert("Error inesperado en el servidor");
        return;
      }

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <section className="login-section">
      <div className="login-header">
        <Link to="/"><TbArrowBackUp color="black" size={24} /></Link>
        <h1>Log in</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="inputs"> 
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* Botón Google usando VITE_API_URL */}
        <button
          type="button"
          onClick={() => window.location.href = `${API_URL}/auth/google`}
        >
          Iniciar sesión con Google
        </button>
        
        <button className="login-btn" type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
};

export default Login;
