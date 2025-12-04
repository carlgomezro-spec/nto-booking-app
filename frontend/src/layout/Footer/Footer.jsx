import React from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css"
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";


const Footer = () => {
   return (
   <nav className="footer-nav">
      <Link to="/home"><AiOutlineHome size={24} /></Link>
      <Link to="/search"><AiOutlineSearch size={24} /></Link>
      <Link to="/profile"><AiOutlineUser size={24} /></Link>
    </nav>
  );
}
 
export default Footer;
