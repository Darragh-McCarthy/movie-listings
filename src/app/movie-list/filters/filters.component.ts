import { Component, OnInit, Input, ViewChildren } from "@angular/core";
import {
  Genre,
  ApiDataGenres
} from "../../services/the-movie-database/the-movie-database.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "../../+state/reducers/app.reducer";
import { take, min } from "rxjs/operators";
import {
  SetMinimumRating,
  ToggleGenre
} from "../../+state/actions/movie-list.actions";

import { FormControl } from "@angular/forms";
@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  movieListState: State;

  private params: {
    genres: string;
    rating: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.subscribe(e => {
      this.movieListState = e;
    });
    this.activatedRoute.params.subscribe(
      (e: { genres: string; rating: string }) => {
        this.params = e;
      }
    );
  }

  toggle(genre: Genre) {
    let genreNamesUpdated;
    if (this.params.genres) {
      const genreIdsInUrl = this.params.genres
        .split(",")
        .map(e => parseInt(e, 10));

      if (genreIdsInUrl.find(e => e === genre.id)) {
        genreNamesUpdated = genreIdsInUrl.filter(e => e !== genre.id);
      } else {
        genreNamesUpdated = [...genreIdsInUrl, genre.id];
      }
    } else {
      genreNamesUpdated = [genre.id];
    }
    this.navigate({ genres: genreNamesUpdated.join(",") });
  }

  toggleRating(rating) {
    if (this.params.rating === rating.label) {
      this.navigate({ rating: undefined });
    } else {
      this.navigate({ rating: rating.label });
    }
  }

  private navigate(updates: { genres?; rating? }) {
    const params = Object.assign({}, this.params, updates);
    if (!params.genres) {
      delete params.genres;
    }
    if (!params.rating) {
      delete params.rating;
    }
    this.router.navigate([params]);
  }
}
