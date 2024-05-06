import { createAction, props } from '@ngrx/store';
import {UserSignUpResponse} from "@model/user/user";

export const loadUser = createAction(
  '[User] Load User',
  props<{ user: Partial<UserSignUpResponse> }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ data: UserSignUpResponse[] }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
