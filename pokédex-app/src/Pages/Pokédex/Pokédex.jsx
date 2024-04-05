import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Pokédex.css';

function Pokédex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMuted, setIsMuted] = useState(false); // État pour suivre si le son est activé ou désactivé    
  const history = useLocation();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon data');
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching details for ${pokemonName}:`, error);
    }
  };

  const fetchPokemonCry = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon cry');
      }
      const data = await response.json();
      return data.cries; // Assurez-vous que 'cries' est la bonne propriété contenant le lien vers le fichier audio
    } catch (error) {
      console.error(`Error fetching cry for ${pokemonName}:`, error);
    }
  };

  const handleReloadPokédex = () => {
    window.location.reload(); // Recharge la page
  };

  useEffect(() => {
    const filterPokemon = async () => {
      const filteredPokemon = await Promise.all(pokemonList.map(pokemon => fetchPokemonDetails(pokemon.name)));
      setSearchResults(filteredPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    filterPokemon();
  }, [searchTerm, pokemonList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePokemonClick = async (pokemon) => {
    history.push('/pokemon-details', { pokemon: pokemon });
    const cry = await fetchPokemonCry(pokemon.name);
    if (cry) {
      const crySound = new Audio(cry);
      crySound.play();
    }
};

  const toggleFavorite = (pokemonName) => {
    setPokemonList(prevList =>
      prevList.map(pokemon =>
        pokemon.name === pokemonName ? { ...pokemon, favorite: !pokemon.favorite } : pokemon
      )
    );
  };

  // Fonction pour activer ou désactiver le son
  const toggleMute = () => {
    setIsMuted(prevState => !prevState);
  };

  return (
    <div>
      <div className="audio-control-container">
        <button onClick={toggleMute}>{isMuted ? 'Unmute 🔊' : 'Mute 🔇'}</button>
        <audio controls autoPlay className="audio-control" muted={isMuted}>
          <source src="./src/assets/Musique/Générique français de la saison 1 de Pokemon.mp3" type="audio/mpeg" />
          Votre navigateur ne supporte pas l'élément audio.
        </audio>
      </div>
      <h1 className="pokedex-title" onClick={handleReloadPokédex} style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 auto', textAlign: 'center' }}>Pokédex </h1>
      <input type="text" placeholder="Rechercher un Pokémon...🔎" value={searchTerm} onChange={handleSearchChange} className="search-input" />
      <div className="pokemon-container">
        {searchResults.map((pokemon, index) => (
          <div key={index} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <button className="favorite-icon" onClick={() => toggleFavorite(pokemon.name)}>
              {pokemon.favorite ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokédex;