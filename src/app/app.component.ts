import { Component, OnInit } from "@angular/core";
import { TheMovieDatabaseService } from "./services/the-movie-database/the-movie-database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "movie-listings";

  constructor(
    private theMovieDatabaseService: TheMovieDatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.theMovieDatabaseService.getConfiguration().subscribe(e => {
    //   console.log(e);
    // });
    // this.theMovieDatabaseService.getGenres().subscribe(e => {
    //   console.log(e);
    // });
    // this.theMovieDatabaseService.getMoviesInTheatres().subscribe(e => {
    //   console.log(e);
    // });
  }
}
