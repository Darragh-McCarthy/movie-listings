import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { of, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NumberSymbol } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class TheMovieDatabaseService {
  private apiBase = environment.api.theMovieDatabase.v3.endpoint;
  private httpClientOptions = {
    params: {
      api_key: environment.api.theMovieDatabase.v3.key
    }
  };

  constructor(private httpClient: HttpClient) {}

  getMoviesInTheatres(): Observable<ApiDataMoviesNowPlayingInTheatres> {
    return this.get("/movie/now_playing");
  }

  getGenres(): Observable<ApiDataGenres> {
    return this.get("/genre/movie/list");
  }

  getConfiguration(): Observable<ApiDataConfiguration> {
    return this.get("/configuration");
  }

  private get(endpoint: string): any {
    const sessionStorageKey = "theMovieDatabase" + endpoint;
    const data = sessionStorage.getItem(sessionStorageKey);
    if (data) {
      return of(JSON.parse(data));
    }
    return this.httpClient
      .get(this.apiBase + endpoint, this.httpClientOptions)
      .pipe(
        tap(e => {
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(e));
        })
      );
  }
}

export interface ApiDataConfiguration {
  change_keys: Array<string>;
  images: {
    base_url: string; // "http://image.tmdb.org/t/p/"
    secure_base_url: string; // "https://image.tmdb.org/t/p/"
    backdrop_sizes: Array<string>;
    logo_sizes: Array<string>;
    poster_sizes: Array<string>;
    profile_sizes: Array<string>;
    still_sizes: Array<string>;
  };
}

export interface ApiDataGenres {
  genres: Array<Genre>;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ApiDataMoviesNowPlayingInTheatres {
  dates: { maximum: string; minimum: string };
  page: number;
  total_results: number;
  total_pages: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string; // "/ibKeXahq4JD63z6uWQphqoJLvNw.jpg"
    genre_ids: Array<number>;
    id: number;
    original_language: string; // "en"
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string; // "/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg"
    release_date: string; // "2018-08-09"
    title: string; // "The Meg"
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
}
export class Movie {
  constructor(
    public title: string,
    public posterUrl: string,
    public genres: Array<any>,
    public vote_average: number
  ) {}
}
