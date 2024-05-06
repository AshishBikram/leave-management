import { createAction, props } from '@ngrx/store';
import {LeaveBalance} from "@model/leave-balance/leave-balance";

export const loadLeaveBalance = createAction(
  '[LeaveBalance] Load Leave Balance',
  props<{leaveBalance: {userId: number}}>()
);

export const loadLeaveBalanceSuccess = createAction(
  '[LeaveBalance] Load Leave Balance Success',
  props<{ data: LeaveBalance[] }>()
);

export const loadLeaveBalanceFailure = createAction(
  '[LeaveBalance] Load Leave Balance Failure',
  props<{ error: any }>()
);
