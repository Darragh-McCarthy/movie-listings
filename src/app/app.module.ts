import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieComponent } from "./movie-list/movie/movie.component";
import { FiltersComponent } from "./movie-list/filters/filters.component";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./+state/reducers/app.reducer";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { MovieListEffects } from "./+state/effects/movie-list.effects";

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieComponent,
    FiltersComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: "router"
    }),
    EffectsModule.forRoot([MovieListEffects]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
