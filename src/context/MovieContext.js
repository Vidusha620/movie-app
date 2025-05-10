import React, { createContext, useState, useEffect, useReducer, useCallback } from 'react';

// Create the context
export const MovieContext = createContext();

// Define action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_POPULAR_MOVIES: 'SET_POPULAR_MOVIES',
  APPEND_POPULAR_MOVIES: 'APPEND_POPULAR_MOVIES',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  APPEND_SEARCH_RESULTS: 'APPEND_SEARCH_RESULTS',
  SET_MOVIE_DETAILS: 'SET_MOVIE_DETAILS',
  SET_FAVORITES: 'SET_FAVORITES',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  SET_ERROR: 'SET_ERROR',
  RESET_ERROR: 'RESET_ERROR',
  SET_HAS_MORE: 'SET_HAS_MORE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
};

// Initial state
const initialState = {
  popularMovies: [],
  searchResults: [],
  movieDetails: null,
  favorites: [],
  loading: false,
  error: null,
  hasMore: true,
  searchQuery: '',
  popularPage: 1,
  searchPage: 1,
};

// Reducer function
const movieReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_POPULAR_MOVIES:
      return { 
        ...state, 
        popularMovies: action.payload,
        loading: false 
      };
    
    case ACTIONS.APPEND_POPULAR_MOVIES:
      return { 
        ...state, 
        popularMovies: [...state.popularMovies, ...action.payload],
        loading: false 
      };
    
    case ACTIONS.SET_SEARCH_RESULTS:
      return { 
        ...state, 
        searchResults: action.payload,
        loading: false 
      };
    
    case ACTIONS.APPEND_SEARCH_RESULTS:
      return { 
        ...state, 
        searchResults: [...state.searchResults, ...action.payload],
        loading: false 
      };
    
    case ACTIONS.SET_MOVIE_DETAILS:
      return { 
        ...state, 
        movieDetails: action.payload,
        loading: false 
      };
    
    case ACTIONS.SET_FAVORITES:
      return { ...state, favorites: action.payload };
    
    case ACTIONS.ADD_TO_FAVORITES:
      return { 
        ...state, 
        favorites: [...state.favorites, action.payload] 
      };
    
    case ACTIONS.REMOVE_FROM_FAVORITES:
      return { 
        ...state, 
        favorites: state.favorites.filter(movie => movie.id !== action.payload) 
      };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.RESET_ERROR:
      return { ...state, error: null };
    
    case ACTIONS.SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { 
        ...state, 
        searchQuery: action.payload,
        searchResults: [],
        searchPage: 1,
        hasMore: true
      };
      
    default:
      return state;
  }
};

// Provider component
export const MovieProvider = ({ children }) => {
  // Initialize state with values from localStorage if available
  const initialStateWithStorage = {
    ...initialState,
    searchQuery: localStorage.getItem('lastSearchQuery') || '',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  };
  
  const [state, dispatch] = useReducer(movieReducer, initialStateWithStorage);
  
  // API key - in a real app, this should be in an environment variable
  const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c'; // This is a public TMDB API key for demo purposes
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);
  
  // Save last search query to localStorage whenever it changes
  useEffect(() => {
    if (state.searchQuery) {
      localStorage.setItem('lastSearchQuery', state.searchQuery);
    }
  }, [state.searchQuery]);
  
  // Fetch popular movies
  const fetchPopularMovies = useCallback(async (page = 1) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }
      
      const data = await response.json();
      
      if (page === 1) {
        dispatch({ type: ACTIONS.SET_POPULAR_MOVIES, payload: data.results });
      } else {
        dispatch({ type: ACTIONS.APPEND_POPULAR_MOVIES, payload: data.results });
      }
      
      dispatch({ 
        type: ACTIONS.SET_HAS_MORE, 
        payload: data.page < data.total_pages 
      });
      
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [apiKey]);
  
  // Load more popular movies
  const loadMorePopularMovies = useCallback(() => {
    const nextPage = state.popularPage + 1;
    fetchPopularMovies(nextPage);
    // Update the page in state
    state.popularPage = nextPage;
  }, [fetchPopularMovies, state.popularPage]);
  
  // Search movies
  const searchMovies = useCallback(async (query, page = 1) => {
    if (!query.trim()) return;
    
    if (page === 1) {
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
      // Last search query is saved to localStorage via the useEffect hook
    }
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      
      const data = await response.json();
      
      if (page === 1) {
        dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: data.results });
      } else {
        dispatch({ type: ACTIONS.APPEND_SEARCH_RESULTS, payload: data.results });
      }
      
      dispatch({ 
        type: ACTIONS.SET_HAS_MORE, 
        payload: data.page < data.total_pages 
      });
      
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [apiKey]);
  
  // Load more search results
  const loadMoreSearchResults = useCallback(() => {
    const nextPage = state.searchPage + 1;
    searchMovies(state.searchQuery, nextPage);
    // Update the page in state
    state.searchPage = nextPage;
  }, [searchMovies, state.searchQuery, state.searchPage]);
  
  // Fetch movie details
  const fetchMovieDetails = useCallback(async (movieId) => {
    if (!movieId) return;
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      
      const data = await response.json();
      dispatch({ type: ACTIONS.SET_MOVIE_DETAILS, payload: data });
      
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [apiKey]);
  
  // Toggle favorite status
  const toggleFavorite = useCallback((movie) => {
    const isFavorite = state.favorites.some(fav => fav.id === movie.id);
    
    if (isFavorite) {
      dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: movie.id });
    } else {
      // Add only necessary data to favorites
      const favoriteMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      };
      
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: favoriteMovie });
    }
  }, [state.favorites]);
  
  // Check if a movie is in favorites
  const isFavorite = useCallback((movieId) => {
    return state.favorites.some(movie => movie.id === movieId);
  }, [state.favorites]);
  
  // Clear error
  const clearError = () => {
    dispatch({ type: ACTIONS.RESET_ERROR });
  };
  
  return (
    <MovieContext.Provider
      value={{
        ...state,
        fetchPopularMovies,
        loadMorePopularMovies,
        searchMovies,
        loadMoreSearchResults,
        fetchMovieDetails,
        toggleFavorite,
        isFavorite,
        clearError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for using the movie context
export const useMovieContext = () => {
  const context = React.useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
