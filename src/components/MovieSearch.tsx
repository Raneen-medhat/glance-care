import React from "react";
import { useMovies } from "../context/MovieContext";

const MovieSearch: React.FC = () => {
  const {
    filteredMovies,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    uniqueGenres,
    selectedMovie,
    setSelectedMovie,
  } = useMovies();

  // Format currency in millions/billions
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="space-y-4 pb-6 border-b border-gray-700/50">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-11"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Genre Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <button
            onClick={() => setSelectedGenre("")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedGenre === ""
                ? "bg-indigo-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All Genres
          </button>
          {uniqueGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="space-y-3">
              {/* Movie Card */}
              <div
                onClick={() =>
                  setSelectedMovie(
                    selectedMovie?.id === movie.id ? null : movie
                  )
                }
                className={`p-4 rounded-lg cursor-pointer transition-all border ${
                  selectedMovie?.id === movie.id
                    ? "bg-indigo-500/20 border-indigo-500/30"
                    : "bg-gray-700/50 border-transparent hover:border-gray-600 hover:bg-gray-700/70"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-white text-lg truncate">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white font-medium">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                      <span className="px-2 py-1 bg-gray-800 rounded-md">
                        {movie.year}
                      </span>
                      <span>•</span>
                      <span>{movie.language}</span>
                      <span>•</span>
                      <span className="text-gray-300">{movie.director}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {movie.genre.map((g: string) => (
                        <span
                          key={g}
                          className="px-2 py-1 bg-gray-800/50 rounded-md text-sm text-gray-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-indigo-400">🏆</span>
                      <span className="text-gray-300">
                        {movie.awards.oscars}
                      </span>
                    </div>
                    <div className="text-sm text-emerald-400">
                      {formatCurrency(movie.boxOffice)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details (Expanded) */}
              {selectedMovie?.id === movie.id && (
                <div className="ml-4 pl-4 border-l-2 border-indigo-500/30 animate-fadeIn">
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-4">
                    {/* Awards Section */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">
                          Academy Awards
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xl font-bold text-indigo-400">
                              {movie.awards.oscars}
                            </div>
                            <div className="text-sm text-gray-400">Wins</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-indigo-400">
                              {movie.awards.nominations}
                            </div>
                            <div className="text-sm text-gray-400">
                              Nominations
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">
                          Box Office
                        </div>
                        <div className="text-xl font-bold text-emerald-400">
                          {formatCurrency(movie.boxOffice)}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Revenue
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">
                          Director
                        </div>
                        <div className="text-white">{movie.director}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">
                          Language
                        </div>
                        <div className="text-white">{movie.language}</div>
                      </div>
                    </div>

                    {/* Genres */}
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Genres</div>
                      <div className="flex flex-wrap gap-2">
                        {movie.genre.map((g: string) => (
                          <span
                            key={g}
                            className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎬</div>
            <div className="text-gray-400">No movies found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
