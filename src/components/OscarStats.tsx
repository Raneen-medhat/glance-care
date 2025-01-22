import React from "react";
import { useMovies } from "../context/MovieContext";

const OscarStats: React.FC = () => {
  const { movies } = useMovies();

  // Calculate Oscar statistics
  const totalOscars = movies.reduce(
    (sum, movie) => sum + movie.awards.oscars,
    0
  );
  const totalNominations = movies.reduce(
    (sum, movie) => sum + movie.awards.nominations,
    0
  );
  const moviesWithOscars = movies.filter((movie) => movie.awards.oscars > 0);
  const topOscarWinners = [...moviesWithOscars]
    .sort((a, b) => b.awards.oscars - a.awards.oscars)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <div className="text-2xl font-bold text-indigo-400">
            {totalOscars}
          </div>
          <div className="text-sm text-gray-400">Total Oscar Wins</div>
        </div>
        <div className="p-4 bg-gray-700/50 rounded-lg">
          <div className="text-2xl font-bold text-indigo-400">
            {totalNominations}
          </div>
          <div className="text-sm text-gray-400">Total Nominations</div>
        </div>
      </div>

      {/* Top Oscar Winners */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Top Oscar Winners
        </h3>
        <div className="space-y-3">
          {topOscarWinners.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-white">{movie.title}</h4>
                <p className="text-sm text-gray-400">{movie.year}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-indigo-400">🏆</span>
                <span className="text-gray-300 font-medium">
                  {movie.awards.oscars}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Win Rate */}
      <div className="p-4 bg-gray-700/50 rounded-lg">
        <div className="text-2xl font-bold text-indigo-400">
          {((moviesWithOscars.length / movies.length) * 100).toFixed(1)}%
        </div>
        <div className="text-sm text-gray-400">Movies with Oscar Wins</div>
      </div>
    </div>
  );
};

export default OscarStats;
