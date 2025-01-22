import React from "react";
import { useMovies } from "../context/MovieContext";

// Logo component with title and subtitle
const Logo: React.FC = () => (
  <div>
    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
      Movie Analytics
    </h1>
    <p className="text-sm text-gray-400">Data-Driven Insights</p>
  </div>
);

// Stats display component
const StatsDisplay: React.FC<{
  totalMovies: number;
  uniqueGenres: number;
}> = ({ totalMovies, uniqueGenres }) => (
  <div className="hidden md:flex items-center space-x-6">
    <StatItem label="Total Movies" value={totalMovies} />
    <StatItem label="Genres" value={uniqueGenres} />
  </div>
);

// Individual stat item component
const StatItem: React.FC<{
  label: string;
  value: number;
}> = ({ label, value }) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-400">{label}:</span>
    <span className="text-sm font-medium text-gray-200">{value}</span>
  </div>
);

// Date display component
const DateDisplay: React.FC = () => (
  <div className="text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
    {new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </div>
);

// Main Header component
const Header: React.FC = () => {
  const { stats } = useMovies();

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <nav className="max-w-[2000px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Logo />
            <StatsDisplay
              totalMovies={stats.totalMovies}
              uniqueGenres={stats.uniqueGenres}
            />
          </div>
          <DateDisplay />
        </div>
      </nav>
    </header>
  );
};

export default Header;
