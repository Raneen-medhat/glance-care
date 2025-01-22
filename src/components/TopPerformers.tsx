import React from "react";
import { useMovies } from "../context/MovieContext";
import { MovieCard } from "./MovieCard";

const TopPerformers: React.FC = () => {
  const { movies } = useMovies();

  // Get top 5 movies by rating
  const topMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Top Performers</h2>
      <div className="space-y-3">
        {topMovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
