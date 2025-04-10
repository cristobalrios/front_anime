import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '../graphql/queries/getAnimeList';

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_ANIME_LIST);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Animes</h1>
      <ul>
        {data.animes.map((anime: any) => (
          <li key={anime.id}>
            <h3>{anime.title}</h3>
            <p>{anime.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
