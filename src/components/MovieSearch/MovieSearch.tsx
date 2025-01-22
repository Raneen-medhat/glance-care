import React, { useState } from "react";
import { useMovies } from "../../context/MovieContext";

export const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies } = useMovies();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredMovies.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};
