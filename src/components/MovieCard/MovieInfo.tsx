import React from "react";
import { Movie } from "../../types/movie";

interface MovieInfoProps {
  movie: Movie;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => (
  <div className="flex-1 min-w-0">
    <h3 className="text-white font-medium truncate">{movie.title}</h3>
    <div className="text-sm text-gray-400 mt-1">
      {movie.year} • {movie.director}
    </div>
  </div>
);
