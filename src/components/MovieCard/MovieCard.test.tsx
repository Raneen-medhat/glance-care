import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieCard } from "./MovieCard";

describe("MovieCard", () => {
  const mockMovie = {
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
  };

  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} rank={1} />);

    // Check for title
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();

    // Check for rank
    expect(screen.getByText("#1")).toBeInTheDocument();

    // Check for rating
    expect(screen.getByText("9.3")).toBeInTheDocument();
  });
});
