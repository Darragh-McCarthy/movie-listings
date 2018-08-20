import {
  MovieListFiltersActionsUnion,
  MovieListFiltersActionTypes
} from "../actions/movie-list.actions";
import {
  Genre,
  ApiDataConfiguration,
  ApiDataGenres,
  ApiDataMoviesNowPlayingInTheatres,
  Movie
} from "../../services/the-movie-database/the-movie-database.service";
import { select } from "@ngrx/store";

export interface State {
  filters: {
    genres: Array<{ selected: boolean; genre: Genre }>;
    ratings: Array<{ selected: boolean; label: string }>;
  };
  movieApi: {
    configuration: ApiDataConfiguration;
    genres: ApiDataGenres;
    movies: ApiDataMoviesNowPlayingInTheatres;
  };
  selectedMovies: Array<Movie>;
}

export const initialState: State = {
  filters: {
    genres: [],
    ratings: [
      { label: "0", selected: true },
      { label: "1", selected: false },
      { label: "2", selected: false },
      { label: "3", selected: false },
      { label: "4", selected: false },
      { label: "5", selected: false },
      { label: "6", selected: false },
      { label: "7", selected: false },
      { label: "8", selected: false },
      { label: "9", selected: false },
      { label: "10", selected: false }
    ]
  },
  movieApi: {
    configuration: undefined,
    genres: undefined,
    movies: undefined
  },
  selectedMovies: []
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case "ROUTER_NAVIGATION":
      if (action.payload.event.state.url.startsWith("/movies")) {
        const params = action.payload.event.state.root.children[0].params;
        const ratings = state.filters.ratings.map(e => {
          return Object.assign({}, e, { selected: e.label === params.rating });
        });
        const selectedRating = ratings.reduce((min, e) => {
          if (e.selected) {
            return e.label;
          }
          return min;
        }, "0");
        const filters = {
          ratings,
          genres: state.filters.genres.map(e => {
            return Object.assign({}, e, {
              selected: (params.genres || "").includes(e.genre.id)
            });
          })
        };
        const updatedState = {
          ...state,
          filters,
          selectedMovies:
            state.movieApi && state.movieApi.configuration
              ? getSelectedMovies(
                  state.movieApi.movies,
                  state.movieApi.genres,
                  state.movieApi.configuration.images.base_url,
                  filters.genres.filter(e => e.selected),
                  parseInt(selectedRating, 10)
                )
              : []
        };

        return updatedState;
      }
      return state;

    case MovieListFiltersActionTypes.MovieDataLoaded:
      return {
        ...state,
        movieApi: action.payload,
        filters: Object.assign({}, state.filters, {
          genres: action.payload.genres.genres.map(e => ({
            selected: false,
            genre: Object.assign({}, e)
          }))
        }),
        selectedMovies: getSelectedMovies(
          action.payload.movies,
          action.payload.genres,
          action.payload.configuration.images.base_url
        )
      };
    default: {
      return state;
    }
  }
}

function getSelectedMovies(
  movies: ApiDataMoviesNowPlayingInTheatres,
  genreData: ApiDataGenres,
  base_url: string,
  selectedGenres = [],
  minRating = 0
) {
  return movies.results
    .map(e => {
      const genres = e.genre_ids.map(genreId =>
        genreData.genres.find(eachGenre => eachGenre.id === genreId)
      );
      const bannerUrl = base_url + "w92" + e.poster_path;
      return new Movie(e.title, bannerUrl, genres, e.vote_average);
    })
    .filter(eachMovie => {
      if (eachMovie.vote_average < minRating) {
        return false;
      }
      return (
        !selectedGenres.length ||
        selectedGenres.every(eachSelectedGenre =>
          eachMovie.genres.find(
            eachGenre => eachGenre.id === eachSelectedGenre.genre.id
          )
        )
      );
    });
}
