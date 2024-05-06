import { createAction, props } from '@ngrx/store';
import {LeaveType} from "@model/leave-type/leave-type";

export const loadLeaveType = createAction(
  '[LeaveType] Load Leave Type'
);

export const loadLeaveTypeSuccess = createAction(
  '[LeaveType] Load Leave Type Success',
  props<{ data: LeaveType[] }>()
);

export const loadLeaveTypeFailure = createAction(
  '[LeaveType] Load Leave Type Failure',
  props<{ error: any }>()
);

export const createLeaveType = createAction(
  '[LeaveType] Create Leave Type',
  props<{ leaveType: Partial<LeaveType> }>()
);

export const createLeaveTypeSuccess = createAction(
  '[LeaveType] Create Leave Type Success',
  props<{ data: LeaveType }>()
);

export const createLeaveTypeFailure = createAction(
  '[LeaveType] Create Leave Type Failure',
  props<{ error: any }>()
);

export const updateLeaveType = createAction(
  '[LeaveType] Update Leave Type',
  props<{ leaveType: LeaveType }>()
);

export const updateLeaveTypeSuccess = createAction(
  '[LeaveType] Update Leave Type Success',
  props<{ data: LeaveType }>()
);

export const updateLeaveTypeFailure = createAction(
  '[LeaveType] Update Leave Type Failure',
  props<{ error: any }>()
);

export const deleteLeaveType = createAction(
  '[LeaveType] Delete Leave Type',
  props<{ leaveType: LeaveType }>()
);

export const deleteLeaveTypeSuccess = createAction(
  '[LeaveType] Delete Leave Type Success',
  props<{ data: LeaveType }>()
);

export const deleteLeaveTypeFailure = createAction(
  '[LeaveType] Delete Leave Type Failure',
  props<{ error: any }>()
);
