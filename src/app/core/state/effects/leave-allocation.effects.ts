import { Injectable } from '@angular/core';
import * as LeaveAllocationActions from '@state/actions/leave-allocation.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, catchError, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {LeaveAllocationService} from "@services/leave-allocation/leave-allocation.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class LeaveAllocationEffects {
  constructor(private actions$: Actions, private leaveAllocationService:LeaveAllocationService,private snackBar: MatSnackBar) {}

  loadLeaveAllocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveAllocationActions.loadLeaveAllocation),
      map((action: any) => action.payload),
      mergeMap(() => {
        return this.leaveAllocationService.loadLeaveAllocation({}).pipe(
          map(data => LeaveAllocationActions.loadLeaveAllocationSuccess({ data: data.sort((a,b) => a.id > b.id ? b.id : a.id  ) })),
          catchError(error => of(LeaveAllocationActions.loadLeaveAllocationFailure({ error })))
        );
      })
    )
  );

  createLeaveAllocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveAllocationActions.createLeaveAllocation),
      switchMap(payload => this.leaveAllocationService.createLeaveAllocation(payload.leaveAllocation)),
      switchMap(data => {
        return this.leaveAllocationService.getLeaveAllocation(data.id).pipe(
          map(data => {
            this.snackBar.open("Leave Allocation deleted Successfully!");
            return LeaveAllocationActions.createLeaveAllocationSuccess({ data: data })
          }),
          catchError(error => of(LeaveAllocationActions.deleteLeaveAllocationFailure({ error })))
        );
      })
    )
  );

  deleteLeaveAllocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveAllocationActions.deleteLeaveAllocation),
      switchMap(({leaveAllocation}) => {
        return this.leaveAllocationService.deleteLeaveAllocation(leaveAllocation).pipe(
          map(data => {
            this.snackBar.open("Leave Allocation deleted Successfully!");
            return LeaveAllocationActions.deleteLeaveAllocationSuccess({ data: leaveAllocation })
          }),
          catchError(error => of(LeaveAllocationActions.deleteLeaveAllocationFailure({ error })))
        );
      })
    )
  );

  updateLeaveAllocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveAllocationActions.updateLeaveAllocation),
      switchMap(payload => this.leaveAllocationService.updateLeaveAllocation(payload.leaveAllocation)),
      switchMap(data => {
        return this.leaveAllocationService.getLeaveAllocation(data.id).pipe(
          map(data => {
            this.snackBar.open("Leave Allocation updated Successfully!");
            return LeaveAllocationActions.updateLeaveAllocationSuccess({ data: data })
          }),
          catchError(error => of(LeaveAllocationActions.updateLeaveAllocationFailure({ error })))
        );
      })
    )
  );
}
