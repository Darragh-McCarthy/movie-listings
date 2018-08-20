import { Component, OnInit } from "@angular/core";
import {
  TheMovieDatabaseService,
  Movie,
  Genre,
  ApiDataMoviesNowPlayingInTheatres,
  ApiDataGenres
} from "../services/the-movie-database/the-movie-database.service";
import { Router } from "@angular/router";
import { State } from "../+state/reducers/app.reducer";
import { Store } from "@ngrx/store";
import {
  MovieListFiltersActionTypes,
  Initialise
} from "../+state/actions/movie-list.actions";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  movies: Array<Movie>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.subscribe(e => {
      if (e.movieList.movieApi) {
        this.movies = e.movieList.selectedMovies;
      }
    });
    this.store.dispatch(new Initialise());
  }
}
