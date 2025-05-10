import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import '../App.css';

// Main home page component displaying popular movies
const Home = () => {
  // Get movie data and functions from context
  const { 
    popularMovies: movies, 
    loading, 
    hasMore, 
    fetchPopularMovies, 
    loadMorePopularMovies 
  } = useMovieContext();

  // Fetch movies when component mounts
  useEffect(() => {
    fetchPopularMovies(1);
  }, [fetchPopularMovies]);

  return (
    <div className="home-container">
      <h1>Popular Movies</h1>
      
      {/* Show loading or movie grid */}
      {loading && movies.length === 0 ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie, index) => (
                <div 
                  key={`${movie.id}-${index}`} 
                  className="movie-card"
                >
                  <Link to={`/movie/${movie.id}`}>
                    {/* Show poster image or fallback */}
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="movie-poster"
                      />
                    ) : (
                      <div className="no-poster">
                        <span>{movie.title}</span>
                      </div>
                    )}
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
          
          {/* Load more button section */}
          {movies.length > 0 && (
            <div className="load-more-container">
              {hasMore ? (
                <button 
                  className="load-more-btn" 
                  onClick={loadMorePopularMovies}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Movies'}
                </button>
              ) : (
                <div className="no-more-results">No more results</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;