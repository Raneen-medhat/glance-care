# Movie Analytics Dashboard

A comprehensive React-based analytics dashboard for movie data visualization and insights.

## Features

- 🎬 Movie Search & Details

  - Advanced search functionality with real-time filtering
  - Genre-based filtering
  - Detailed movie information display
  - Interactive movie cards with expandable details

- 📊 Analytics & Visualizations

  - Oscar awards statistics and trends
  - Box office performance tracking
  - Rating-based rankings
  - Interactive charts and graphs using Recharts

- 🏆 Awards Tracking

  - Oscar wins and nominations visualization
  - Success rate analysis
  - Top Oscar winners showcase
  - Year-wise awards distribution

- 💫 UI/UX Features
  - Modern, responsive design
  - Dark theme with gradient accents
  - Interactive components with hover effects
  - Smooth transitions and animations

## Tech Stack

- React 18 with TypeScript
- TailwindCSS for styling
- Context API for state management
- Recharts for data visualization
- Jest & React Testing Library

## Project Structure

```
src/
├── components/
│   ├── MovieCard/           # Movie card and related components
│   ├── MovieSearch/         # Search functionality
│   ├── OscarStatistics/     # Oscar stats visualization
│   └── Header/              # App header with stats
├── context/                 # React Context for state management
├── data/                    # Movie data and types
├── types/                   # TypeScript interfaces
└── tests/                   # Component tests
```

## Key Components

### MovieSearch

Advanced search component with filtering capabilities:

```typescript
test("filters movies based on search input", () => {
  render(
    <MovieProvider initialMovies={mockMovies}>
      <MovieSearch />
    </MovieProvider>
  );
  const searchInput = screen.getByPlaceholderText("Search movies...");
  fireEvent.change(searchInput, { target: { value: "Shawshank" } });
  expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
});
```

### MovieCard

Displays movie information with interactive features:

```typescript
test("renders movie information correctly", () => {
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
  render(<MovieCard movie={mockMovie} rank={1} />);
  expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
});
```

### OscarStatistics

Visualizes Oscar-related statistics with interactive charts:

- Year-wise Oscar distribution
- Win/nomination ratios
- Success rate analysis
- Top performers tracking

## State Management

The application uses React Context API for state management:

- Movie data and filtering
- Search and genre selection
- Selected movie tracking
- Statistics calculations

## Getting Started

1. Clone and install:

```bash
git clone https://github.com/Raneen-medhat/glance-care.git
cd glance-care
npm install
```

2. Start development server:

```bash
npm start
```

3. Run tests:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details
