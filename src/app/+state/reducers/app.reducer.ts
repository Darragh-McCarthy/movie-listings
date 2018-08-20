import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

import * as fromRouter from "@ngrx/router-store";
import * as fromMovieList from "./movie-list.reducer";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../../environments/environment";
import {
  ApiDataGenres,
  ApiDataConfiguration,
  ApiDataMoviesNowPlayingInTheatres
} from "../../services/the-movie-database/the-movie-database.service";

export interface State {
  router: fromRouter.RouterReducerState;
  movieList: fromMovieList.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  movieList: fromMovieList.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // console.log("state", state);
    // console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
