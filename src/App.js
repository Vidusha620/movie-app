
import './App.css';
import{ BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import MovieDetails from './pages/MovieDetails.js';
import Favorites from './pages/Favorites.js';
import SearchResults from './pages/SearchResults.js';
import NavBar from './Components/NavBar.js';
import Header from './Components/Header.js';
import { ThemeProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="App">
            <NavBar/>
            <Header/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
