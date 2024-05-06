import { createAction, props } from '@ngrx/store';
import {LeaveAllocation, LeaveAllocationResponse} from "@model/leave-allocation/leave-allocation";

export const loadLeaveAllocation = createAction(
  '[LeaveAllocation] Load Leave Allocation'
);

export const loadLeaveAllocationSuccess = createAction(
  '[LeaveAllocation] Load Leave Allocation Success',
  props<{ data: LeaveAllocationResponse[] }>()
);

export const loadLeaveAllocationFailure = createAction(
  '[LeaveAllocation] Load Leave Allocation Failure',
  props<{ error: any }>()
);

export const createLeaveAllocation = createAction(
  '[LeaveAllocation] Create Leave Allocation',
  props<{ leaveAllocation: Omit<LeaveAllocation, "id"> }>()
);

export const createLeaveAllocationSuccess = createAction(
  '[LeaveAllocation] Create Leave Allocation Success',
  props<{ data: LeaveAllocationResponse }>()
);

export const createLeaveAllocationFailure = createAction(
  '[LeaveAllocation] Create Leave Allocation Failure',
  props<{ error: any }>()
);

export const updateLeaveAllocation = createAction(
  '[LeaveAllocation] Update Leave Allocation',
  props<{ leaveAllocation: LeaveAllocation }>()
);

export const updateLeaveAllocationSuccess = createAction(
  '[LeaveAllocation] Update Leave Allocation Success',
  props<{ data: LeaveAllocationResponse }>()
);

export const updateLeaveAllocationFailure = createAction(
  '[LeaveAllocation] Update Leave Allocation Failure',
  props<{ error: any }>()
);

export const deleteLeaveAllocation = createAction(
  '[LeaveAllocation] Delete Leave Allocation',
  props<{ leaveAllocation: LeaveAllocation }>()
);

export const deleteLeaveAllocationSuccess = createAction(
  '[LeaveAllocation] Delete Leave Allocation Success',
  props<{ data: LeaveAllocation }>()
);

export const deleteLeaveAllocationFailure = createAction(
  '[LeaveAllocation] Delete Leave Allocation Failure',
  props<{ error: any }>()
);
