import React, { createContext, useContext, useState, useMemo } from "react";
import { Movie } from "../types/movie";

interface MovieContextType {
  movies: Movie[];
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  filteredMovies: Movie[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  uniqueGenres: string[];
  stats: {
    totalMovies: number;
    uniqueGenres: number;
    averageRating: number;
    totalOscars: number;
  };
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({
  children,
  initialMovies,
}: {
  children: React.ReactNode;
  initialMovies: Movie[];
}) {
  const [movies] = useState<Movie[]>(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Memoized calculations
  const stats = useMemo(
    () => ({
      totalMovies: movies.length,
      uniqueGenres: new Set(movies.flatMap((m) => m.genre)).size,
      averageRating: +(
        movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
      ).toFixed(1),
      totalOscars: movies.reduce((sum, movie) => sum + movie.awards.oscars, 0),
    }),
    [movies]
  );

  const uniqueGenres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genre))).sort(),
    [movies]
  );

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre =
        !selectedGenre || movie.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  const value = {
    movies,
    selectedMovie,
    setSelectedMovie,
    filteredMovies,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    uniqueGenres,
    stats,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
}
