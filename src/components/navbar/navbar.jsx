// Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import './navbar.css'; // Import your CSS file

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? "show" : ""}`}>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className="ul-div">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}
          >
            🏠Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/historial"
            className={`nav-link ${location.pathname === '/historial' ? 'active-link' : ''}`}
          >
            📖Historial
          </Link>
        </li>
        <li>
          <Link
            to="/grafico-productividad"
            className={`nav-link ${location.pathname === '/grafico-productividad' ? 'active-link' : ''}`}
          >
            📊 Tu Progreso
          </Link>
        </li>
      </div>
    </nav>
  );
}

export default Navbar;
