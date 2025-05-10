import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import '../App.css';

const Favorites = () => {
  const { favorites, toggleFavorite } = useMovieContext();

  const removeFromFavorites = (movie) => {
    toggleFavorite(movie);
  };

  return (
    <div className="favorites-container">
      <h1>My Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any movies to your favorites yet.</p>
          <Link to="/" className="browse-movies-btn">Browse Movies</Link>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map(movie => (
            <div key={movie.id} className="movie-card favorite-card">
              <button 
                className="remove-favorite-btn" 
                onClick={() => removeFromFavorites(movie.id)}
              >
                ✕
              </button>
              
              <Link to={`/movie/${movie.id}`}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{new Date(movie.release_date).getFullYear()}</p>
                  <div className="movie-rating">
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;