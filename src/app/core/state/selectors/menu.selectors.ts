import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenuReducer from "@state/reducers/menu.reducers"

export const getMenuState = createFeatureSelector<fromMenuReducer.State>('menus');

export const loading = createSelector(
  getMenuState,
  (state: fromMenuReducer.State) => state.loading
);

export const getMenus = createSelector(
  getMenuState,
  (state: fromMenuReducer.State) => state.menus
);
