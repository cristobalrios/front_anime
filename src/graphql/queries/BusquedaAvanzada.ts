import { gql } from '@apollo/client';

export const ADVANCED_SEARCH = gql`
  query BusquedaAvanzada(
    $nombre: String
    $tipo: String
    $estado: String
    $min_score: Float
    $genero: String
  ) {
    busquedaAvanzada(
      nombre: $nombre
      tipo: $tipo
      estado: $estado
      min_score: $min_score
      genero: $genero
    ) {
      malId
      title
      synopsis
      genres
      episodes
      type
      imageUrl
      rating
      score
      rank
      status
      airing
      trailerUrl
      aired {
        fromDate
        toDate
        stringDate
      }
    }
  }
`;