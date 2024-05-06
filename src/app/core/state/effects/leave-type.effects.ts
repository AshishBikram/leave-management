import { Injectable } from '@angular/core';
import * as LeaveTypeActions from '@state/actions/leave-type.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, catchError, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {LeaveTypeService} from "@services/leave-type/leave-type.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class LeaveTypeEffects {
  constructor(private actions$: Actions, private leaveTypeService:LeaveTypeService,private snackBar: MatSnackBar) {}

  loadLeaveType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypeActions.loadLeaveType),
      map((action: any) => action.payload),
      mergeMap(() => {
        return this.leaveTypeService.loadLeaveType().pipe(
          map(data => LeaveTypeActions.loadLeaveTypeSuccess({ data: data.sort((a,b) => a.id > b.id ? b.id : a.id  ) })),
          catchError(error => of(LeaveTypeActions.loadLeaveTypeFailure({ error })))
        );
      })
    )
  );

  createLeaveType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypeActions.createLeaveType),
      switchMap(({leaveType}) => {
        return this.leaveTypeService.createLeaveType(leaveType).pipe(
          map(data => {
            this.snackBar.open("Leave Type Created Successfully!");
            return LeaveTypeActions.createLeaveTypeSuccess({ data })
          }),
          catchError(error => of(LeaveTypeActions.createLeaveTypeFailure({ error })))
        );
      })
    )
  );

  deleteLeaveType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypeActions.deleteLeaveType),
      switchMap(({leaveType}) => {
        return this.leaveTypeService.deleteLeaveType(leaveType).pipe(
          map(data => {
            this.snackBar.open("Leave Type deleted Successfully!");
            return LeaveTypeActions.deleteLeaveTypeSuccess({ data: leaveType })
          }),
          catchError(error => of(LeaveTypeActions.deleteLeaveTypeFailure({ error })))
        );
      })
    )
  );

  updateLeaveType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveTypeActions.updateLeaveType),
      switchMap(({leaveType}) => {
        return this.leaveTypeService.updateLeaveType(leaveType).pipe(
          map(data => {
            this.snackBar.open("Leave Type updated Successfully!");
            return LeaveTypeActions.updateLeaveTypeSuccess({ data: leaveType })
          }),
          catchError(error => of(LeaveTypeActions.deleteLeaveTypeFailure({ error })))
        );
      })
    )
  );
}
