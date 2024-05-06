import { createAction, props } from '@ngrx/store';
import {LeaveRequest, LeaveRequestResponse} from "@model/leave-request/leave-request";

export const loadLeaveRequest = createAction(
  '[LeaveRequest] Load Leave Request',
  props<{leaveRequest:Partial<LeaveRequest>}>(),
);

export const loadLeaveRequestSuccess = createAction(
  '[LeaveRequest] Load Leave Request Success',
  props<{ data: LeaveRequestResponse[] }>()
);

export const loadLeaveRequestFailure = createAction(
  '[LeaveRequest] Load Leave Request Failure',
  props<{ error: any }>()
);

export const createLeaveRequest = createAction(
  '[LeaveRequest] Create Leave Request',
  props<{ leaveRequest: Omit<LeaveRequest, "id"> }>()
);

export const createLeaveRequestSuccess = createAction(
  '[LeaveRequest] Create Leave Request Success',
  props<{ data: LeaveRequestResponse }>()
);

export const createLeaveRequestFailure = createAction(
  '[LeaveRequest] Create Leave Request Failure',
  props<{ error: any }>()
);

export const updateLeaveRequest = createAction(
  '[LeaveRequest] Update Leave Request',
  props<{ leaveRequest: LeaveRequest }>()
);

export const updateLeaveRequestSuccess = createAction(
  '[LeaveRequest] Update Leave Request Success',
  props<{ data: LeaveRequestResponse }>()
);

export const updateLeaveRequestFailure = createAction(
  '[LeaveRequest] Update Leave Request Failure',
  props<{ error: any }>()
);

export const deleteLeaveRequest = createAction(
  '[LeaveRequest] Delete Leave Request',
  props<{ leaveRequest: LeaveRequest }>()
);

export const deleteLeaveRequestSuccess = createAction(
  '[LeaveRequest] Delete Leave Request Success',
  props<{ data: LeaveRequest }>()
);

export const deleteLeaveRequestFailure = createAction(
  '[LeaveRequest] Delete Leave Request Failure',
  props<{ error: any }>()
);
