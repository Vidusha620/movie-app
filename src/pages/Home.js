import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { Form, Row, Col, Button } from 'react-bootstrap';
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

  // Filter states
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Genre options - hardcoded common movie genres
  const genres = [
    { id: '', name: 'All Genres' },
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '10402', name: 'Music' },
    { id: '9648', name: 'Mystery' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Science Fiction' },
    { id: '53', name: 'Thriller' }
  ];
  
  // Year options - last 20 years
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [{ value: '', label: 'All Years' }];
    for (let year = currentYear; year >= currentYear - 20; year--) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }
    return yearOptions;
  }, []);
  
  // Rating options
  const ratings = [
    { value: '', label: 'All Ratings' },
    { value: '9', label: '9+ ⭐' },
    { value: '8', label: '8+ ⭐' },
    { value: '7', label: '7+ ⭐' },
    { value: '6', label: '6+ ⭐' },
    { value: '5', label: '5+ ⭐' }
  ];

  // Fetch movies when component mounts
  useEffect(() => {
    fetchPopularMovies(1);
  }, [fetchPopularMovies]);
  
  // Apply filters to movies
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Genre filter
      if (genreFilter && movie.genre_ids && !movie.genre_ids.includes(parseInt(genreFilter))) {
        return false;
      }
      
      // Year filter
      if (yearFilter && movie.release_date) {
        const movieYear = new Date(movie.release_date).getFullYear().toString();
        if (movieYear !== yearFilter) {
          return false;
        }
      }
      
      // Rating filter
      if (ratingFilter && movie.vote_average) {
        if (movie.vote_average < parseInt(ratingFilter)) {
          return false;
        }
      }
      
      return true;
    });
  }, [movies, genreFilter, yearFilter, ratingFilter]);
  
  // Reset all filters
  const resetFilters = () => {
    setGenreFilter('');
    setYearFilter('');
    setRatingFilter('');
  };
  
  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="home-container">
      <div className="header-actions">
        <h1>Popular Movies</h1>
        <Button 
          variant="outline-primary" 
          className="filter-toggle-btn"
          onClick={toggleFilters}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {showFilters && (
        <div className="filters-container">
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Select 
                  value={genreFilter} 
                  onChange={(e) => setGenreFilter(e.target.value)}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Select 
                  value={yearFilter} 
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  {years.map(year => (
                    <option key={year.value} value={year.value}>{year.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Select 
                  value={ratingFilter} 
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>{rating.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mb-4">
            <Button 
              variant="secondary" 
              onClick={resetFilters}
              className="me-2"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Show loading or movie grid */}
      {loading && movies.length === 0 ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          {filteredMovies.length === 0 ? (
            <div className="no-results">No movies match your filters. Try adjusting your criteria.</div>
          ) : (
            <div className="results-count">Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}</div>
          )}
          
          <div className="movie-grid">
            {filteredMovies.map((movie, index) => (
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
          {filteredMovies.length > 0 && movies.length > 0 && (
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