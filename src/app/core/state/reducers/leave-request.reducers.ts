import {createReducer, on} from "@ngrx/store";
import * as LeaveRequestActions from "@state/actions/leave-request.actions";
import {LeaveRequestResponse} from "@model/leave-request/leave-request";

export const leaveRequestFeatureKey = 'leaveRequest';

export interface State {
  leaveRequest: LeaveRequestResponse[],
  loading: boolean,
  error: any,
}

export const initialState: State = {
  leaveRequest: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(LeaveRequestActions.loadLeaveRequest, (state) => ({...state, loading: false, error: null})),
  on(LeaveRequestActions.loadLeaveRequestSuccess, (state, {data}) => ({
    ...state,
    leaveRequest: data,
    loading: true,
    error: null
  })),
  on(LeaveRequestActions.loadLeaveRequestFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveRequestActions.createLeaveRequest, (state) => ({...state, loading: false, error: null})),
  on(LeaveRequestActions.createLeaveRequestSuccess, (state, {data}) => ({
    ...state,
    leaveRequest: [data, ...state.leaveRequest],
    loading: true,
    error: null
  })),
  on(LeaveRequestActions.createLeaveRequestFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveRequestActions.updateLeaveRequest, (state) => ({...state, loading: false, error: null})),
  on(LeaveRequestActions.updateLeaveRequestSuccess, (state, {data}) => ({
    ...state,
    leaveRequest: state.leaveRequest.map((b) => b.id === data.id ? data : b),
    loading: true,
    error: null
  })),
  on(LeaveRequestActions.updateLeaveRequestFailure, (state, {error}) => ({...state, loading: false, error})),
  on(LeaveRequestActions.deleteLeaveRequest, (state) => ({...state, loading: false, error: null})),
  on(LeaveRequestActions.deleteLeaveRequestSuccess, (state, {data}) => ({
    ...state,
    leaveRequest: state.leaveRequest.filter((b) => b.id !== data.id),
    loading: true,
    error: null
  })),
  on(LeaveRequestActions.createLeaveRequestFailure, (state, {error}) => ({...state, loading: false, error}))
);
