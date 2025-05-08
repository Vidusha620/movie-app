
import './App.css';
import MovieCard from './Components/MovieCard';
import MovieDetails from './Components/MovieDetails';
import SearchBar from './Components/SearchBar';

function App() {
  return (
    <div className="App">
      <MovieCard/>
      <MovieDetails/>
      <SearchBar/>
    </div>
  );
}

export default App;
