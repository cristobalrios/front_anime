import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '../graphql/queries/getAnimeList';
import HomeStyles from '../styles/homeStyles';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: { search: searchTerm },
    skip: !shouldFetch
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setShouldFetch(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={HomeStyles.container}>
      <h1 style={HomeStyles.title}>Lista de Animes</h1>
      
      <div style={HomeStyles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShouldFetch(false);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Buscar anime por título..."
          style={HomeStyles.input}
        />
        <button 
          onClick={handleSearch}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            ...HomeStyles.button,
            ...(isHovered ? HomeStyles.buttonHover : {})
          }}
        >
          Buscar
        </button>
      </div>

      {loading && <p style={HomeStyles.loadingText}>Cargando animes...</p>}
      {error && <p style={HomeStyles.errorText}>Error: {error.message}</p>}

      {data && data.animes ? (
        <ul style={HomeStyles.animeList}>
          {data.animes.map((anime: any) => (
            <li 
              key={anime.id} 
              style={HomeStyles.animeCard}
            >
              <h3 style={HomeStyles.animeTitle}>{anime.title}</h3>
              <p style={HomeStyles.animeDescription}>
                {anime.description || 'Descripción no disponible'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && !shouldFetch && (
          <p style={HomeStyles.promptText}>
            Ingresa un término de búsqueda y haz clic en "Buscar" para encontrar animes
          </p>
        )
      )}
    </div>
  );
};

export default HomeScreen;
