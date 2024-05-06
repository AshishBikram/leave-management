import { createReducer, on } from '@ngrx/store';
import * as UserActions from '@core/state/actions/user.actions';
import {UserSignUpResponse} from "@model/user/user";


export interface State {
  users: UserSignUpResponse[],
  loading : boolean,
  error: any,
}

export const initialState: State = {
  users: [],
  loading : false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({...state,loading: false, error:null})),
  on(UserActions.loadUserSuccess, (state, { data }) => ({
    ...state,
    users:data,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserFailure, (state,{error}) => ({...state,loading: false, error}))
);
