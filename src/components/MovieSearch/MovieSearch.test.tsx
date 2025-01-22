import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieSearch } from "./MovieSearch";
import { MovieProvider } from "../../context/MovieContext";

const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    director: "Frank Darabont",
    genre: ["Drama"],
    language: "English",
    country: "USA",
    awards: { oscars: 0, nominations: 7 },
    boxOffice: 58800000,
    actors: ["Tim Robbins", "Morgan Freeman"],
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    language: "English",
    country: "USA",
    awards: { oscars: 3, nominations: 11 },
    boxOffice: 245066411,
    actors: ["Marlon Brando", "Al Pacino"],
  },
];

describe("MovieSearch", () => {
  it("handles search input and filters movies correctly", () => {
    render(
      <MovieProvider initialMovies={mockMovies}>
        <MovieSearch />
      </MovieProvider>
    );

    // Get the search input
    const searchInput = screen.getByPlaceholderText("Search movies...");

    // Test input handling
    fireEvent.change(searchInput, { target: { value: "Shawshank" } });
    expect(searchInput).toHaveValue("Shawshank");

    // Test filtering behavior
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.queryByText("The Godfather")).not.toBeInTheDocument();

    // Clear search and verify all movies are shown
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("The Godfather")).toBeInTheDocument();
  });
});
