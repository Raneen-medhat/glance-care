import React from "react";
import { useMovies } from "../context/MovieContext";

const MovieDetailsCard: React.FC = () => {
  const { movies, selectedMovie, setSelectedMovie } = useMovies();

  // Format currency in millions/billions
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      {/* Movie Selector */}
      <div className="relative">
        <select
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none"
          value={selectedMovie?.id || ""}
          onChange={(e) => {
            const movie = movies.find(
              (m) => m.id.toString() === e.target.value
            );
            setSelectedMovie(movie || null);
          }}
        >
          <option value="">Select a movie</option>
          {movies
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title} ({movie.year})
              </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Movie Details */}
      {selectedMovie ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedMovie.title}
                </h2>
                <p className="text-gray-400 mt-1">
                  {selectedMovie.year} • {selectedMovie.language}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                  <span className="text-indigo-300 font-medium">
                    ⭐ {selectedMovie.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedMovie.genre.map((genre: string) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Director */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Director
              </h3>
              <p className="text-white">{selectedMovie.director}</p>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Awards</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-700/50">
                  <div className="text-2xl font-bold text-indigo-400">
                    {selectedMovie.awards.oscars}
                  </div>
                  <div className="text-sm text-gray-400">Oscar Wins</div>
                </div>
                <div className="p-4 rounded-lg bg-gray-700/50">
                  <div className="text-2xl font-bold text-indigo-400">
                    {selectedMovie.awards.nominations}
                  </div>
                  <div className="text-sm text-gray-400">Oscar Nominations</div>
                </div>
              </div>
            </div>

            {/* Box Office */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Box Office
              </h3>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <div className="text-2xl font-bold text-emerald-400">
                  {formatCurrency(selectedMovie.boxOffice)}
                </div>
                <div className="text-sm text-gray-400">Worldwide Earnings</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="text-4xl mb-3">🎬</div>
          <div className="text-gray-400">Select a movie to view details</div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsCard;
