import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LeaveAllocationService} from "@services/leave-allocation/leave-allocation.service";
import * as LeaveBalanceActions from "@state/actions/leave-balance.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {LeaveRequestService} from "@services/leave-request/leave-request.service";
import {calculateBalance} from "@core/utils/calculate-balance";

@Injectable()
export class LeaveAllocationBalanceEffects {
  constructor(private actions$: Actions, private leaveAllocationService: LeaveAllocationService,private leaveRequestService: LeaveRequestService) {

  }

  loadLeaveBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaveBalanceActions.loadLeaveBalance),
      switchMap(({leaveBalance}) => this.leaveAllocationService.loadLeaveAllocation({userId: leaveBalance.userId })),
      switchMap(data => {
        return this.leaveRequestService.loadLeaveRequest({userId: data[0].userId}).pipe(
          map(leaveRequestResponse => {
            return LeaveBalanceActions.loadLeaveBalanceSuccess({ data: calculateBalance(leaveRequestResponse,data) })
          }),
          catchError(error => of(LeaveBalanceActions.loadLeaveBalanceFailure({ error })))
        );
      })
    )
  );
}
