# MovieListings

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.
Node v9.6.1
NPM 6.4.0

## Development server

Run `ng serve` for a dev server. `http://localhost:4200/`

## Running unit tests

Run `ng test` to execute unit tests via [Karma](https://karma-runner.github.io).

## Tasks

Display a list of movies, each showing their title, genres and poster image. The movies should be ordered by popularity (most popular first - popularity property).
https://developers.themoviedb.org/3/movies/get-now-playing
The API is paginated and appears to return movies ordered by popularity, so I didn't modify the order

Movies should be filterable by multiple genres, the user should have the ability to toggle movies depending on all of its assigned genres. For example if 'Action' and 'Drama' genres are selected listed movies must have both 'Action' and 'Drama' genres.

Movies should also be filterable by their rating (vote_average property). i.e If rating was set to 5, you would expect to see all movies with a rating of 5 or higher.

The input API's should only be called once.
