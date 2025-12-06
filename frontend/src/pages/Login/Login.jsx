import { useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { login } from "../../services/userService"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas o error de servidor");
    }
  };

  return <section className="login-section">
     <Link to="/"><TbArrowBackUp color="black" size={24} /></Link>
    <h1>Login</h1>
    <form className="login-form" onSubmit={handleSubmit}>
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
      <button className="login-btn" type="submit">Iniciar sesión</button>
    </form>
    </section>;
};

export default Login;
