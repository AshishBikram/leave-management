import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserReducer from "@state/reducers/user.reducers"

export const getUserState = createFeatureSelector<fromUserReducer.State>('users');

export const loading = createSelector(
  getUserState,
  (state: fromUserReducer.State) => state.loading
);

export const getUsers = createSelector(
  getUserState,
  (state: fromUserReducer.State) => state.users
);
