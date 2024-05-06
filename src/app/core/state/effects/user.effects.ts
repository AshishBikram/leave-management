import { Injectable } from '@angular/core';
import * as UserActions from '@state/actions/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, catchError, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {MenuService} from "@services/menu/menu.service";
import {UserService} from "@services/user/user.service";
import * as LeaveTypeActions from "@state/actions/leave-type.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService:UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({user}) => {
        return this.userService.getUserList(user).pipe(
          map(data => {
            return UserActions.loadUserSuccess({ data: data })
          }),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        );
      })
    )
  );
}
