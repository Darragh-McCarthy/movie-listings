import { Action } from "@ngrx/store";
import {
  Genre,
  ApiDataConfiguration,
  ApiDataGenres,
  ApiDataMoviesNowPlayingInTheatres
} from "../../services/the-movie-database/the-movie-database.service";

export enum MovieListFiltersActionTypes {
  ToggleGenre = "Toggle genre",
  SetMinimumRating = "Set minumum rating",
  Initialise = "Initialise",
  MovieDataLoaded = "MovieDataLoaded"
}

export class ToggleGenre implements Action {
  readonly type = MovieListFiltersActionTypes.ToggleGenre;
  constructor(public payload: Genre) {}
}

export class SetMinimumRating implements Action {
  readonly type = MovieListFiltersActionTypes.SetMinimumRating;
  constructor(public payload: number) {}
}

export class Initialise implements Action {
  readonly type = MovieListFiltersActionTypes.Initialise;
  constructor() {}
}

export class MovieDataLoaded implements Action {
  readonly type = MovieListFiltersActionTypes.MovieDataLoaded;
  constructor(
    public payload: {
      configuration: ApiDataConfiguration;
      genres: ApiDataGenres;
      movies: ApiDataMoviesNowPlayingInTheatres;
    }
  ) {}
}

export type MovieListFiltersActionsUnion = ToggleGenre | SetMinimumRating;
