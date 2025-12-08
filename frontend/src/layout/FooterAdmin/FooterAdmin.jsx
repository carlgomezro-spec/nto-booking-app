import React from "react";
import { Link } from "react-router-dom";
import "../FooterAdmin/FooterAdmin.css";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineBook } from "react-icons/ai";

const FooterAdmin = () => {
  return (
    <nav className="footer-nav">
      <Link to="/admin"><AiOutlineDashboard color="black" size={24} /></Link>
      <Link to="/admin/bookings"><AiOutlineBook color="black" size={24} /></Link>
      <Link to="/profile"><AiOutlineUser color="black" size={24} /></Link>
    </nav>
  );
}

export default FooterAdmin;
