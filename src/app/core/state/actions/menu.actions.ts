import { createAction, props } from '@ngrx/store';
import {Menu} from "@model/menu/menu";

export const loadMenu = createAction(
  '[Menu] Load Menu'
);

export const loadMenuSuccess = createAction(
  '[Menu] Load Menu Success',
  props<{ data: Menu[] }>()
);

export const loadMenuFailure = createAction(
  '[Menu] Load Menu Failure',
  props<{ error: any }>()
);
