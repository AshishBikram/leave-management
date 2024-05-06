import { Injectable } from '@angular/core';
import * as MenuActions from '@state/actions/menu.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {MenuService} from "@services/menu/menu.service";

@Injectable()
export class MenusEffects {
  constructor(private actions$: Actions, private menu:MenuService) {}

  loadMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.loadMenu),
      map((action: any) => action.payload),
      mergeMap(() => {
        return this.menu.loadMenus().pipe(
          map(data => MenuActions.loadMenuSuccess({ data })),
          catchError(error => of(MenuActions.loadMenuFailure({ error })))
        );
      })
    )
  );
}
