// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">LiteApp</div>
      <ul className="navbar-links">
        {rol !== "externo" && (
          <li>
            <Link to="/users">Usuario</Link>
          </li>
        )}
        {rol && (
          <li>
            <Link to="/empresas">Empresas</Link>
          </li>
        )}
        {rol === "admin" && (
          <li>
            <Link to="/productos">Productos</Link>
          </li>
        )}
        {rol && (
          <li>
            <Link to="/inventario">Inventario</Link>
          </li>
        )}
        {rol && (
          <li>
            <Link to="/ia-descripcion">IA</Link>
          </li>
        )}
      </ul>

      {rol && (
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};

export default Navbar;
