
import './App.css';
import{ BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
