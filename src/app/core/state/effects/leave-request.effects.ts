import { Injectable } from '@angular/core';
import * as LeaveRequestActions from '@state/actions/leave-request.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {map, catchError, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {LeaveRequestService} from "@services/leave-request/leave-request.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class LeaveRequestEffects {
  constructor(private actions$: Actions, private leaveRequestService:LeaveRequestService,private snackBar: MatSnackBar) {}

  loadLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveRequestActions.loadLeaveRequest),
      mergeMap(({leaveRequest}) => {
        return this.leaveRequestService.loadLeaveRequest({...leaveRequest}).pipe(
          map(data => LeaveRequestActions.loadLeaveRequestSuccess({ data: data.sort((a,b) => a.id > b.id ? b.id : a.id  ) })),
          catchError(error => of(LeaveRequestActions.loadLeaveRequestFailure({ error })))
        );
      })
    )
  );

  createLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveRequestActions.createLeaveRequest),
      switchMap(payload => this.leaveRequestService.createLeaveRequest(payload.leaveRequest)),
      switchMap(data => {
        return this.leaveRequestService.getLeaveRequest(data.id).pipe(
          map(data => {
            this.snackBar.open("Leave Request deleted Successfully!");
            return LeaveRequestActions.createLeaveRequestSuccess({ data: data })
          }),
          catchError(error => of(LeaveRequestActions.deleteLeaveRequestFailure({ error })))
        );
      })
    )
  );

  deleteLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveRequestActions.deleteLeaveRequest),
      switchMap(({leaveRequest}) => {
        return this.leaveRequestService.deleteLeaveRequest(leaveRequest).pipe(
          map(data => {
            this.snackBar.open("Leave Request deleted Successfully!");
            return LeaveRequestActions.deleteLeaveRequestSuccess({ data: leaveRequest })
          }),
          catchError(error => of(LeaveRequestActions.deleteLeaveRequestFailure({ error })))
        );
      })
    )
  );

  updateLeaveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveRequestActions.updateLeaveRequest),
      switchMap(payload => this.leaveRequestService.updateLeaveRequest(payload.leaveRequest)),
      switchMap(data => {
        return this.leaveRequestService.getLeaveRequest(data.id).pipe(
          map(data => {
            this.snackBar.open("Leave Request updated Successfully!");
            return LeaveRequestActions.updateLeaveRequestSuccess({ data: data })
          }),
          catchError(error => of(LeaveRequestActions.updateLeaveRequestFailure({ error })))
        );
      })
    )
  );
}
