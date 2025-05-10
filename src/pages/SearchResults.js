import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import '../App.css';

const SearchResults = () => {
  const { 
    searchResults: movies, 
    loading, 
    hasMore, 
    searchMovies, 
    loadMoreSearchResults,
    searchQuery
  } = useMovieContext();
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  
  // No need for observer with Load More button

  // Fetch search results when query changes
  useEffect(() => {
    if (query && query !== searchQuery) {
      searchMovies(query, 1);
    }
  }, [query, searchQuery, searchMovies]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      
      {loading && movies.length === 0 ? (
        <div className="loading">Searching for movies...</div>
      ) : movies.length === 0 && !loading ? (
        <div className="no-results">
          <p>No movies found matching "{query}"</p>
          <Link to="/" className="browse-movies-btn">Browse Popular Movies</Link>
        </div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie, index) => (
                <div 
                  key={`${movie.id}-${index}`} 
                  className="movie-card"
                >
                  <Link to={`/movie/${movie.id}`}>
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
                      {movie.release_date && (
                        <p>{new Date(movie.release_date).getFullYear()}</p>
                      )}
                      <div className="movie-rating">
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
            ))}
          </div>
          
          {movies.length > 0 && (
            <div className="load-more-container">
              {hasMore ? (
                <button 
                  className="load-more-btn" 
                  onClick={loadMoreSearchResults}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Results'}
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

export default SearchResults;
