import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>Released: {movie.Released}</p>
      <p>Rating: {movie.imdbRating}</p>
      <p>{movie.Plot}</p>
    </div>
  );
};

export default MovieDetails;
