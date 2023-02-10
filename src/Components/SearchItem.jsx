import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

const SearchItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [showData, setShowData] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearchInputChanges = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchMovies = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=3bf0f9c5&s=${searchTerm}`
    );
    setMovies(response.data.Search);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);

  const sortMovies = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedMovies =
    movies &&
    [...movies].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Year - b.Year;
      }
      return b.Year - a.Year;
    });

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setShowData(true);
  };

  return (
    <>
      <div className="content">
        <form>
          <input
            className="input"
            type="text"
            placeholder="Search your favourite"
            value={searchTerm}
            onChange={handleSearchInputChanges}
          />
          <button className="search" type="button" onClick={fetchMovies}>
            Search
          </button>
        </form>
        <button className="sort" type="button" onClick={sortMovies}>
          Sort by release year (
          {sortOrder === "asc" ? "ascending" : "descending"})
        </button>
        <ul>
          {sortedMovies
            ? sortedMovies.map((movie) => (
                <li key={movie.imdbID}>
                  <img
                    src={movie.Poster}
                    alt={`Poster for ${movie.Title}`}
                    onClick={() => handleClick(movie)}
                  />
                </li>
              ))
            : null}
        </ul>
        {showData && selectedMovie && (
          <div className="info">
            <h2>{selectedMovie.Title}</h2>
            <p>Released in {selectedMovie.Year}</p>
            <p>Rating: {selectedMovie.Rated}</p>
            <p>Director: {selectedMovie.Director}</p>
            <p>Actors: {selectedMovie.Actors}</p>
            <p>Genre: {selectedMovie.Genre}</p>
            <p>Plot: {selectedMovie.Plot}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchItem;
