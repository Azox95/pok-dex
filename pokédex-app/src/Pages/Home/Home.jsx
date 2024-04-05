import React from 'react';
import './Home.css'; 

function Home() {

  const handleButtonClick = () => {
    const button = document.getElementById('pokedex-button'); // Récupérer le bouton par son ID
    const href = button.getAttribute('data-href'); // Récupérel'URL stockée dans l'attribut data-hrefr 
    window.location.href = href; // Naviguer vers l'URL
  };

  return (
    <div className="home-container">
      <div className="container">
      <h1 className="welcome-text-deux">Bienvenue sur le pokédex📲</h1>  
      <h1 className="welcome-text">Cliquer sur le boutons pour accéder au pokédex.</h1>          
      <div className="center-container">
      <button id="pokedex-button" className="btn" data-href="/pokédex" onClick={handleButtonClick}>Pokédex</button>         
      </div>
    </div>
  </div>
  );
}

export default Home;