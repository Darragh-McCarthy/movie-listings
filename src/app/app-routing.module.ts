import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "movies",
    pathMatch: "full"
  },
  {
    path: "movies",
    component: MovieListComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "disabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
