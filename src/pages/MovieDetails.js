import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import '../App.css';

const MovieDetails = () => {
  const { id } = useParams();
  const { 
    movieDetails: movie, 
    loading, 
    favorites, 
    fetchMovieDetails, 
    toggleFavorite, 
    isFavorite 
  } = useMovieContext();

  useEffect(() => {
    // Fetch movie details when id changes
    fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    toggleFavorite(movie);
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="movie-details-container">
      <div className="movie-backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="movie-poster-container">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="movie-details-poster"
          />
        </div>
        
        <div className="movie-info-container">
          <h1>{movie.title} <span className="release-year">({new Date(movie.release_date).getFullYear()})</span></h1>
          
          <div className="movie-meta">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="runtime">{movie.runtime} min</span>
            <button 
              className={`favorite-btn ${isMovieFavorite ? 'is-favorite' : ''}`}
              onClick={handleToggleFavorite}
            >
              {isMovieFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <div className="genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          
          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          {movie.tagline && (
            <div className="tagline">
              <em>"{movie.tagline}"</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;