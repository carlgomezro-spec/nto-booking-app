import React from "react";
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

const Login = () => {
  return <section>
     <Link to="/"><TbArrowBackUp color="black" size={24} /></Link>
    <h1>Login</h1>
    </section>;
};

export default Login;
