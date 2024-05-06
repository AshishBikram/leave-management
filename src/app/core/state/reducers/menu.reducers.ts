import { createReducer, on } from '@ngrx/store';
import {Menu} from "@model/menu/menu";
import * as MenuActions from '@core/state/actions/menu.actions';


export interface State {
  menus: Menu[],
  loading : boolean,
  error: any,
}

export const initialState: State = {
  menus: [],
  loading : false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(MenuActions.loadMenu, (state) => ({...state,loading: false, error:null})),
  on(MenuActions.loadMenuSuccess, (state, { data }) => ({
    ...state,
    menus:data,
    loading: true,
    error: null
  })),
  on(MenuActions.loadMenuFailure, (state,{error}) => ({...state,loading: false, error}))
);
