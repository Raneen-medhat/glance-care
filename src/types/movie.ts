export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  director: string;
  genre: string[];
  language: string;
  country: string;
  awards: {
    oscars: number;
    nominations: number;
  };
  boxOffice: number;
  actors: string[];
}
