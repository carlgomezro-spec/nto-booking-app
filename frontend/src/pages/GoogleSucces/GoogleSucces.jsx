import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Guardamos token en localStorage
      localStorage.setItem("token", token);

      // Redirigimos al home
      window.location.href = "/home";

    } else {
      // Si no hay token, vamos a login
      navigate("/login");
    }
  }, [navigate]);

  return <p>Iniciando sesión con Google...</p>;
}
