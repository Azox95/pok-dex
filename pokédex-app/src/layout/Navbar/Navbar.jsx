import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLogin = () => {
    // Mettez en œuvre la logique de connexion ici
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mettez en œuvre la logique de déconnexion ici
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/" >
          <img src="./src/assets/Images/pokeball-png-45330.png" alt="Logo" width="70" height="70" className="d-inline-block align-top" />                  
        </Link>
        <Link to="/login" className="btn-login">
          Se connecter
        </Link>
        {isLoggedIn && (
          <button onClick={handleLogout} className="btn-logout">
            Se déconnecter
          </button>
        )}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">À propos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
