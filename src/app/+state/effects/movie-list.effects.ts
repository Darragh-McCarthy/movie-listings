import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { TheMovieDatabaseService } from "../../services/the-movie-database/the-movie-database.service";
import {
  MovieListFiltersActionTypes,
  MovieDataLoaded
} from "../actions/movie-list.actions";
import { forkJoin } from "rxjs";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class MovieListEffects {
  constructor(
    private actions$: Actions,
    private movieService: TheMovieDatabaseService
  ) {}

  @Effect()
  initialise$ = this.actions$
    .ofType(MovieListFiltersActionTypes.Initialise)
    .pipe(
      mergeMap(e =>
        forkJoin(
          this.movieService.getConfiguration(),
          this.movieService.getGenres(),
          this.movieService.getMoviesInTheatres()
        )
      ),
      map(data => {
        return new MovieDataLoaded({
          configuration: data[0],
          genres: data[1],
          movies: data[2]
        });
      })
    );
}
