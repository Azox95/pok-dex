import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FavoritePokemonPage({ favoritePokemon, setFavoritePokemon }) {
  // Fonction pour supprimer un Pokémon favori
  const removeFavoritePokemon = (pokemonName) => {
    setFavoritePokemon((prevFavorites) => prevFavorites.filter((pokemon) => pokemon.name !== pokemonName));
  };

  return (
    <div>
      <h2>Favorite Pokémon</h2>
      <div className="favorite-pokemon-container">
        {favoritePokemon.map((pokemon) => (
          <div key={pokemon.name} className="favorite-pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            {/* Bouton pour supprimer le Pokémon favori */}
            <button onClick={() => removeFavoritePokemon(pokemon.name)}>Remove</button>
          </div>
        ))}
      </div>
      <p>
        <Link to="/pokedex">Retour au Pokédex</Link>
      </p>
    </div>
  );
}

export default FavoritePokemonPage;
