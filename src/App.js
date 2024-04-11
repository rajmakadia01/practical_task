import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';

const API_KEY = '30d834d7';
const API_URL = 'https://www.omdbapi.com/';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    fetch(`${API_URL}?s=${searchTerm}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [searchTerm]);

  useEffect(() => {
    fetch(`${API_URL}?i=tt3896198&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setSelectedMovie(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMovieClick = (imdbID) => {
    fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => setSelectedMovie(data))
      .catch(error => console.error('Error fetching movie details:', error));
  };

  const handleAddToFavorites = (movie) => {
    setFavorites(prevFavorites => [...prevFavorites, movie]);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div className='Search'>
      <SearchBar value={searchTerm} onChange={handleSearchChange}/>
      </div>
      <div className="search-results">
        {searchResults.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>
      {selectedMovie && (
        <div className="movie-details">
          <MovieDetails movie={selectedMovie} />
          <button onClick={() => handleAddToFavorites(selectedMovie)} className='button'>
            Add to Favorites
          </button>
        </div>
      )}
      <div className="favorites">
        <h2>Favorites</h2>
        {favorites.map(favorite => (
          <MovieCard
            key={favorite.imdbID}
            movie={favorite}
            onClick={() => handleMovieClick(favorite.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
