import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "../../services/the-movie-database/the-movie-database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"]
})
export class MovieComponent implements OnInit {
  @Input()
  movie: Movie;

  constructor(private router: Router) {}

  ngOnInit() {}
}
