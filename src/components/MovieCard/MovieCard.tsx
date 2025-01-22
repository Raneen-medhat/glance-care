import React from "react";
import { Movie } from "../../types/movie";
import { RankBadge } from "./RankBadge";
import { MovieInfo } from "./MovieInfo";
import { RatingBadge } from "./RatingBadge";

interface MovieCardProps {
  /** The movie data to display */
  movie: Movie;
  /** The ranking position of the movie */
  rank: number;
}

/**
 * MovieCard Component
 *
 * Displays a movie's information in a card format, including:
 * - Rank badge showing the movie's position
 * - Movie details (title, year, director)
 * - Rating display with star icon
 *
 * @param {MovieCardProps} props - Component props
 */
export const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
      role="article"
      aria-label={`Movie: ${movie.title}`}
    >
      <RankBadge rank={rank} />
      <MovieInfo movie={movie} />
      <RatingBadge rating={movie.rating} />
    </div>
  );
};
