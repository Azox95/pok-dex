import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Navbar from './layout/Navbar/Navbar';
import Footer from './layout/Footer/Footer';
import LoadingSpinner from './utiles/LoadingSpinner/LoadingSpinner'; 
import LoginPage from './Pages/LoginPage/LoginPage';
import Pokédex from './Pages/Pokédex/Pokédex';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import FavoritePokemonPage from './Pages/FavoritePokemonPage/FavoritePokemonPage';



function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulation de chargement pour 2 secondes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 2 secondes de chargement simulé
    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage du composant
  }, [location.pathname]);

  const isPokeballPage = location.pathname === '/chargement';

  return (
    <div>
      {isLoading && <LoadingSpinner />} 
      {!isPokeballPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokédex" element={<Pokédex />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/favorite-pokemon-pokedex" element={<FavoritePokemonPage />} />
      </Routes>
      {!isPokeballPage && <Footer />}
    </div>
  );
}

export default App;